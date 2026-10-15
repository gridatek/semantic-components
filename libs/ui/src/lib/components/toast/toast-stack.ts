import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Injector,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_TOAST_CONTEXT } from './toast-context';
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
  'top-start': 'top-0 start-0 flex-col-reverse',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 flex-col-reverse',
  'top-end': 'top-0 end-0 flex-col-reverse',
  'bottom-start': 'bottom-0 start-0 flex-col',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col',
  'bottom-end': 'bottom-0 end-0 flex-col',
};

/**
 * The toasts, in an overlay the toaster creates: a column for each position
 * that has some, each toast written by your `scToastTemplate` (its root a
 * `scToast`). One polite live region, so each new toast is announced.
 */
@Component({
  selector: 'sc-toast-stack',
  imports: [NgTemplateOutlet],
  template: `
    @if (template(); as template) {
      @for (column of columns(); track column.position) {
        <div [class]="columnClass(column.position)">
          @for (toast of column.toasts; track toast.id) {
            <ng-container
              [ngTemplateOutlet]="template"
              [ngTemplateOutletContext]="{ $implicit: toast }"
              [ngTemplateOutletInjector]="injectors().get(toast.id)"
            />
          }
        </div>
      }
    }
  `,
  host: {
    'aria-live': 'polite',
    'aria-relevant': 'additions',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScToastStack {
  protected readonly toaster = inject(ScToaster);
  private readonly injector = inject(Injector);

  readonly classInput = input<string>('', { alias: 'class' });

  /** How a toast looks: your `scToastTemplate`. */
  protected readonly template = computed(() => this.toaster.ɵtemplate());

  /**
   * Each toast's context, for its parts: the toast, and dismissing it. A
   * toast keeps its injector while it is shown — a new one would render it
   * again.
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
          previous?.value.get(toast.id) ?? this.contextFor(toast),
        ]),
      ),
  });

  /** The positions that have toasts, each with its own. */
  protected readonly columns = computed(() => {
    const toasts = this.toaster.toasts();
    return POSITION_ORDER.map((position) => ({
      position,
      toasts: toasts.filter((toast) => toast.position === position),
    })).filter((column) => column.toasts.length);
  });

  protected readonly class = computed(() =>
    cn('pointer-events-none fixed inset-0 z-100', this.classInput()),
  );

  protected columnClass(position: ScToastPosition): string {
    return cn(
      'absolute flex max-h-screen w-full gap-2 p-4 md:max-w-[420px]',
      POSITIONS[position],
    );
  }

  private contextFor(toast: ScToastData): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: SC_TOAST_CONTEXT,
          useValue: { toast, dismiss: () => this.toaster.dismiss(toast.id) },
        },
      ],
    });
  }
}
