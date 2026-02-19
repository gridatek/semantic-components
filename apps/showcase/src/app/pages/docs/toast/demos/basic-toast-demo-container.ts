import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicToastDemo } from './basic-toast-demo';

@Component({
  selector: 'app-basic-toast-demo-container',
  imports: [DemoContainer, BasicToastDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-toast-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToastDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScToaster } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-toast-demo',
  imports: [ScButton],
  template: \`
    <button scButton variant="outline" (click)="showToast()">Show Toast</button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToastDemo {
  private readonly toastService = inject(ScToaster);

  showToast(): void {
    this.toastService.show({
      description: 'Your message has been sent.',
    });
  }
}`;
}
