import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  Injector,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
  viewChildren,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_TOAST_CONTEXT, type ScToastContext } from './toast-context';
import {
  SC_TOAST_GAP,
  SC_TOAST_LAYOUT,
  SC_TOAST_PEEK,
  type ScToastLayout,
} from './toast-layout';
import type { ScToastData, ScToastPosition } from './toast.types';
import { ScToaster } from './toaster';

/** Where the stack sits; start and end follow the text's direction. */
const POSITION_ORDER: readonly ScToastPosition[] = [
  'top-start',
  'top-center',
  'top-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
];

const POSITIONS: Record<ScToastPosition, string> = {
  'top-start': 'top-0 start-0',
  'top-center': 'top-0 left-1/2 -translate-x-1/2',
  'top-end': 'top-0 end-0',
  'bottom-start': 'bottom-0 start-0',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
  'bottom-end': 'bottom-0 end-0',
};

/** A value that keeps its last one once the toast is gone (while it leaves). */
function lasting<T>(value: () => T | undefined, initial: T) {
  return linkedSignal<T | undefined, T>({
    source: value,
    computation: (next, previous) => next ?? previous?.value ?? initial,
  });
}

/**
 * The toasts, in an overlay the toaster creates: a column for each position
 * that has some, each toast written by your `scToastTemplate` (its root a
 * `scToast`). Stacked, the newest in front; spread out while hovered or
 * focused, their timers paused. One polite live region, so each new toast is
 * announced; your `hotkey` moves focus to it.
 */
@Component({
  selector: 'div[scToastStack]',
  imports: [NgTemplateOutlet],
  template: `
    @if (templateRef(); as templateRef) {
      @for (column of columns(); track column.position) {
        <div [class]="columnClass(column.position)">
          <div
            #list
            tabindex="-1"
            data-slot="toast-list"
            [attr.data-expanded]="column.expanded"
            [class]="listClass"
            [style.height.px]="column.height"
            (pointerenter)="sync(column.position, list, true, null)"
            (pointerleave)="sync(column.position, list, false, null)"
            (focusin)="sync(column.position, list, null, true)"
            (focusout)="
              sync(
                column.position,
                list,
                null,
                list.contains($any($event).relatedTarget)
              )
            "
            (keydown.escape)="returnFocus()"
          >
            @for (toast of column.toasts; track toast.id) {
              <ng-container
                [ngTemplateOutlet]="templateRef"
                [ngTemplateOutletContext]="{ $implicit: toast }"
                [ngTemplateOutletInjector]="injectors().get(toast.id)"
              />
            }
          </div>
        </div>
      }
    }
  `,
  host: {
    'aria-live': 'polite',
    'aria-relevant': 'additions',
    '[attr.role]': 'label() ? "region" : null',
    '[attr.aria-label]': 'label()',
    '[class]': 'class()',
    '(document:keydown)': 'onHotkey($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScToastStack {
  protected readonly toaster = inject(ScToaster);
  private readonly injector = inject(Injector);

  readonly classInput = input<string>('', { alias: 'class' });

  /** How a toast looks: your `scToastTemplate`. */
  protected readonly template = computed(() => this.toaster.ɵtemplate());
  protected readonly templateRef = computed(() => this.template()?.ɵtemplate);
  protected readonly label = computed(() => this.template()?.label());

  private readonly lists = viewChildren<ElementRef<HTMLElement>>('list');
  /** Where focus was before the hotkey moved it here. */
  private previousFocus: HTMLElement | null = null;

  /** Each toast's height, spread out. */
  private readonly heights = signal<ReadonlyMap<string, number>>(new Map());

  /**
   * Each toast's injector, for its parts: its context and its place in the
   * stack. A toast keeps its injector while it is shown — a new one would
   * render it again.
   */
  protected readonly injectors = linkedSignal<
    readonly ScToastData[],
    ReadonlyMap<string, Injector>
  >({
    source: () => this.toaster.toasts(),
    computation: (toasts, previous) =>
      new Map(
        toasts.map((toast) => [
          toast.id,
          previous?.value.get(toast.id) ?? this.injectorFor(toast),
        ]),
      ),
  });

  /** The positions that have toasts, each with its own (oldest first). */
  protected readonly columns = computed(() => {
    const toasts = this.toaster.toasts();
    const held = this.toaster.ɵheld();
    return POSITION_ORDER.map((position) => {
      const column = toasts.filter((toast) => toast.position === position);
      const expanded =
        this.toaster.ɵconfig.layout === 'list' || held.has(position);
      return {
        position,
        toasts: column,
        expanded,
        height: this.heightOf(column, expanded),
      };
    }).filter((column) => column.toasts.length);
  });

  protected readonly class = computed(() =>
    cn('pointer-events-none fixed inset-0 z-100', this.classInput()),
  );

  protected readonly listClass = cn(
    'pointer-events-auto relative w-full rounded-2xl outline-none transition-[height] duration-300',
    'focus-visible:ring-3 focus-visible:ring-ring/50',
  );

  protected columnClass(position: ScToastPosition): string {
    return cn('absolute flex w-full p-4 md:max-w-[420px]', POSITIONS[position]);
  }

  /** Hovered or focused, the column spreads out and its timers pause. */
  protected sync(
    position: ScToastPosition,
    list: HTMLElement,
    hovered: boolean | null,
    focused: boolean | null,
  ): void {
    const isHovered = hovered ?? list.matches(':hover');
    const isFocused = focused ?? list.contains(document.activeElement);
    if (isHovered || isFocused) {
      this.toaster.ɵhold(position);
    } else {
      this.toaster.ɵrelease(position);
    }
  }

  protected onHotkey(event: KeyboardEvent): void {
    const keys = this.toaster.ɵconfig.hotkey;
    const list = this.lists()[0]?.nativeElement;
    if (!keys.length || !list) return;

    const pressed = keys.every(
      (key) =>
        event.code === key ||
        (event as unknown as Record<string, unknown>)[key] === true,
    );
    if (!pressed) return;

    event.preventDefault();
    if (!list.contains(document.activeElement)) {
      this.previousFocus = document.activeElement as HTMLElement | null;
    }
    list.focus();
  }

  /** Escape: back to where the hotkey came from. */
  protected returnFocus(): void {
    const previous = this.previousFocus;
    this.previousFocus = null;
    if (previous?.isConnected) {
      previous.focus();
    } else {
      (document.activeElement as HTMLElement | null)?.blur();
    }
  }

  private heightOf(column: readonly ScToastData[], expanded: boolean): number {
    const heights = this.heights();
    const front = heights.get(column[column.length - 1]?.id) ?? 0;
    if (!expanded) {
      return (
        front +
        Math.min(column.length - 1, this.toaster.ɵconfig.visibleToasts - 1) *
          SC_TOAST_PEEK
      );
    }
    // Spread out: the ones shown, the newest.
    return column
      .slice(-this.toaster.ɵconfig.visibleToasts)
      .reduce(
        (sum, toast, i) =>
          sum + (heights.get(toast.id) ?? 0) + (i ? SC_TOAST_GAP : 0),
        0,
      );
  }

  private injectorFor(initial: ScToastData): Injector {
    const id = initial.id;
    const position = initial.position;
    const column = computed(() =>
      this.toaster.toasts().filter((toast) => toast.position === position),
    );
    /** Its place from the front: 0 for the newest. */
    const place = computed(() => {
      const list = column();
      const i = list.findIndex((toast) => toast.id === id);
      return i < 0 ? undefined : list.length - 1 - i;
    });

    const context: ScToastContext = {
      toast: lasting(
        () => this.toaster.toasts().find((toast) => toast.id === id),
        initial,
      ),
      dismiss: () => this.toaster.dismiss(id),
    };

    const layout: ScToastLayout = {
      index: lasting(place, 0),
      expanded: computed(
        () =>
          this.toaster.ɵconfig.layout === 'list' ||
          this.toaster.ɵheld().has(position),
      ),
      visible: this.toaster.ɵconfig.visibleToasts,
      offset: lasting(() => {
        const list = column();
        const i = list.findIndex((toast) => toast.id === id);
        if (i < 0) return undefined;
        const heights = this.heights();
        return list
          .slice(i + 1)
          .reduce(
            (sum, toast) => sum + (heights.get(toast.id) ?? 0) + SC_TOAST_GAP,
            0,
          );
      }, 0),
      frontHeight: lasting(() => {
        const list = column();
        const front = list[list.length - 1];
        return front ? this.heights().get(front.id) : undefined;
      }, 0),
      fromBottom: position.startsWith('bottom'),
      measure: (height) => {
        if (this.heights().get(id) === height) return;
        const shown = new Set(this.toaster.toasts().map((toast) => toast.id));
        this.heights.update(
          (heights) =>
            new Map([
              ...[...heights].filter(([key]) => shown.has(key)),
              [id, height],
            ]),
        );
      },
    };

    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: SC_TOAST_CONTEXT, useValue: context },
        { provide: SC_TOAST_LAYOUT, useValue: layout },
      ],
    });
  }
}
