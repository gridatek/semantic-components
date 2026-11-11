import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScButton,
  ScToast,
  ScToastAction,
  ScToastClose,
  type ScToastConfig,
  ScToastDescription,
  ScToastIcon,
  type ScToastPosition,
  ScToastTemplate,
  ScToastTitle,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiCircleCheckIcon,
  SiInfoIcon,
  SiLoaderCircleIcon,
  SiOctagonXIcon,
  SiTriangleAlertIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/**
 * Toasts in a whole page, to try right to left: the language switch (Arabic)
 * sets the page's direction, which the toasts follow — their row, and start
 * and end positions. The showcase can't show it: one stack for the app,
 * following the document, not a demo's dir="rtl".
 */
@Component({
  selector: 'app-toast-page',
  imports: [
    ScButton,
    ScToast,
    ScToastAction,
    ScToastClose,
    ScToastDescription,
    ScToastIcon,
    ScToastTemplate,
    ScToastTitle,
    SiCircleCheckIcon,
    SiInfoIcon,
    SiLoaderCircleIcon,
    SiOctagonXIcon,
    SiTriangleAlertIcon,
    SiXIcon,
  ],
  template: `
    <div class="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-16">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold tracking-tight">Toast</h1>
        <p class="text-muted-foreground">
          Switch the language to العربية: the page turns right to left, and the
          toasts with it.
        </p>
      </div>

      <section class="flex flex-col gap-3">
        <h2 class="text-lg font-semibold">Types</h2>
        <div class="flex flex-wrap gap-2">
          @for (type of types; track type.label) {
            <button scButton variant="outline" (click)="show(type.toast)">
              {{ type.label }}
            </button>
          }
        </div>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-lg font-semibold">Positions</h2>
        <div class="grid w-fit grid-cols-3 gap-2">
          @for (position of positions; track position) {
            <button
              scButton
              variant="outline"
              (click)="show({ position, description: 'Shown at ' + position })"
            >
              {{ position }}
            </button>
          }
        </div>
      </section>
    </div>

    <ng-template scToastTemplate let-toast label="Notifications">
      <div scToast>
        @switch (toast.variant) {
          @case ('success') {
            <span scToastIcon><svg siCircleCheckIcon></svg></span>
          }
          @case ('info') {
            <span scToastIcon><svg siInfoIcon></svg></span>
          }
          @case ('warning') {
            <span scToastIcon><svg siTriangleAlertIcon></svg></span>
          }
          @case ('error') {
            <span scToastIcon><svg siOctagonXIcon></svg></span>
          }
          @case ('loading') {
            <span scToastIcon><svg siLoaderCircleIcon></svg></span>
          }
        }
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          @if (toast.title) {
            <div scToastTitle>{{ toast.title }}</div>
          }
          @if (toast.description) {
            <div scToastDescription>{{ toast.description }}</div>
          }
        </div>
        @if (toast.action) {
          <button scToastAction>{{ toast.action.label }}</button>
        }
        <button scToastClose>
          <svg siXIcon></svg>
          <span class="sr-only">Close</span>
        </button>
      </div>
    </ng-template>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class ToastPage {
  private readonly toaster = inject(ScToaster);

  protected readonly types: { label: string; toast: ScToastConfig }[] = [
    {
      label: 'Title and action',
      toast: {
        title: 'Event created',
        description: 'Sunday, December 3 at 9:00 AM',
        action: { label: 'Undo', onClick: () => undefined },
      },
    },
    { label: 'Default', toast: { description: 'Event has been created.' } },
    {
      label: 'Success',
      toast: { variant: 'success', description: 'Event has been created.' },
    },
    {
      label: 'Info',
      toast: {
        variant: 'info',
        description: 'Arrive 10 minutes before the event.',
      },
    },
    {
      label: 'Warning',
      toast: {
        variant: 'warning',
        description: 'The event cannot start before 8:00 AM.',
      },
    },
    {
      label: 'Error',
      toast: {
        variant: 'error',
        description: 'The event could not be created.',
      },
    },
    {
      label: 'Arabic',
      toast: {
        variant: 'success',
        title: 'تم إنشاء الحدث',
        description: 'الأحد، 3 ديسمبر الساعة 9:00 صباحًا',
        action: { label: 'تراجع', onClick: () => undefined },
      },
    },
  ];

  /** Start and end follow the page's direction. */
  protected readonly positions: ScToastPosition[] = [
    'top-start',
    'top-center',
    'top-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
  ];

  protected show(toast: ScToastConfig): void {
    this.toaster.show(toast);
  }
}
