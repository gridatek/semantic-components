import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ActionToastDemo } from './action-toast-demo';

@Component({
  selector: 'app-action-toast-demo-container',
  imports: [DemoContainer, ActionToastDemo],
  template: `
    <app-demo-container title="With Action" [code]="code">
      <app-action-toast-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionToastDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScToaster } from '@semantic-components/ui';

@Component({
  selector: 'app-action-toast-demo',
  imports: [ScButton],
  template: \`
    <button scButton variant="outline" (click)="showToast()">Show Toast</button>
  \`,
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
}`;
}
