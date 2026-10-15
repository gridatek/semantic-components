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
import { ScToast } from './toast';
import { SC_TOAST_CONTEXT } from './toast-context';
import type { ScToastData, ScToastPosition } from './toast.types';
import { ScToaster } from './toaster';

/** Where the stack sits; start and end follow the text's direction. */
const POSITIONS: Record<ScToastPosition, string> = {
  'top-left': 'top-0 start-0 flex-col-reverse',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 flex-col-reverse',
  'top-right': 'top-0 end-0 flex-col-reverse',
  'bottom-left': 'bottom-0 start-0 flex-col',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col',
  'bottom-right': 'bottom-0 end-0 flex-col',
};

/**
 * The toasts, in an overlay the toaster creates: each in its frame
 * (`scToast`), written by your `scToastTemplate`. One polite live region, so
 * each new toast is announced.
 */
@Component({
  selector: 'sc-toast-stack',
  imports: [NgTemplateOutlet, ScToast],
  template: `
    @if (template(); as template) {
      @for (toast of toaster.toasts(); track toast.id) {
        <div
          scToast
          [variant]="toast.variant ?? 'default'"
          [position]="toaster.position()"
          (pointerEnter)="toaster.pause(toast.id)"
          (pointerLeave)="toaster.resume(toast.id)"
          (swiped)="toaster.dismiss(toast.id)"
        >
          <ng-container
            [ngTemplateOutlet]="template"
            [ngTemplateOutletContext]="{ $implicit: toast }"
            [ngTemplateOutletInjector]="injectors().get(toast.id)"
          />
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

  protected readonly class = computed(() =>
    cn(
      'fixed z-100 flex max-h-screen w-full gap-2 p-4 md:max-w-[420px]',
      POSITIONS[this.toaster.position()],
      this.classInput(),
    ),
  );

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
