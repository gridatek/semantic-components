import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DurationToastDemo } from './duration-toast-demo';

@Component({
  selector: 'app-duration-toast-demo-container',
  imports: [DemoContainer, DurationToastDemo],
  template: `
    <app-demo-container title="Custom Duration" [code]="code">
      <app-duration-toast-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationToastDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScToaster } from '@semantic-components/ui';

@Component({
  selector: 'app-duration-toast-demo',
  imports: [ScButton],
  template: \`
    <button scButton variant="outline" (click)="showToast()">Show Toast</button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationToastDemo {
  private readonly toastService = inject(ScToaster);

  showToast(): void {
    this.toastService.show({
      title: 'Long toast',
      description: 'This toast will stay for 10 seconds.',
      duration: 10000,
    });
  }
}`;
}
