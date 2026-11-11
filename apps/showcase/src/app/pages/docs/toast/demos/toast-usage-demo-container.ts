import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ToastUsageDemo } from './toast-usage-demo';

@Component({
  selector: 'app-toast-usage-demo-container',
  imports: [UsageCode, ToastUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-toast-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ToastUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ScButton, ScToaster } from '@semantic-components/ui';

/** A toast from code: its title, its description and an Undo action. */
@Component({
  selector: 'app-toast-usage-demo',
  imports: [ScButton],
  template: \`
    <button scButton variant="outline" (click)="show()">Show Toast</button>
  \`,
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
}`;
}
