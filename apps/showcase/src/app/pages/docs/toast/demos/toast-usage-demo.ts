import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ScButton, ScToaster } from '@semantic-components/ui';

/** A toast from code: its title, its description and an Undo action. */
@Component({
  selector: 'app-toast-usage-demo',
  imports: [ScButton],
  template: `
    <button scButton variant="outline" (click)="show()">Show Toast</button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ToastUsageDemo {
  private readonly toaster = inject(ScToaster);

  show(): void {
    this.toaster.show({
      title: 'Event created',
      description: 'Sunday, December 3 at 9:00 AM',
      // Undo it here: the toast closes itself.
      action: { label: 'Undo', onClick: () => undefined },
    });
  }
}
