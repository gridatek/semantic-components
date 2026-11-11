import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScButton,
  type ScToastConfig,
  ScToaster,
} from '@semantic-components/ui';

/** A variant for each kind of message: your template gives each its icon. */
@Component({
  selector: 'app-types-toast-demo',
  imports: [ScButton],
  template: `
    <div class="flex flex-wrap justify-center gap-2">
      @for (type of types; track type.label) {
        <button scButton variant="outline" (click)="show(type.toast)">
          {{ type.label }}
        </button>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TypesToastDemo {
  private readonly toaster = inject(ScToaster);

  readonly types: { label: string; toast: ScToastConfig }[] = [
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
  ];

  show(toast: ScToastConfig): void {
    this.toaster.show(toast);
  }
}
