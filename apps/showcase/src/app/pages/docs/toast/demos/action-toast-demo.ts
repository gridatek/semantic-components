import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScToaster } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-action-toast-demo',
  imports: [ScButton],
  template: `
    <button scButton variant="outline" (click)="showToast()">Show Toast</button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionToastDemo {
  private readonly toastService = inject(ScToaster);

  showToast(): void {
    this.toastService.show({
      title: 'Event has been created',
      description: 'Monday, January 20, 2025 at 2:00 PM',
      action: {
        label: 'Undo',
        onClick: () => {
          console.log('Undo clicked');
        },
      },
    });
  }
}
