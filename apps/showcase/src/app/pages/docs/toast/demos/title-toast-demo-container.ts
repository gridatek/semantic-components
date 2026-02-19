import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TitleToastDemo } from './title-toast-demo';

@Component({
  selector: 'app-title-toast-demo-container',
  imports: [DemoContainer, TitleToastDemo],
  template: `
    <app-demo-container title="With Title" [code]="code">
      <app-title-toast-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleToastDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScToaster } from '@semantic-components/ui';

@Component({
  selector: 'app-title-toast-demo',
  imports: [ScButton],
  template: \`
    <button scButton variant="outline" (click)="showToast()">Show Toast</button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleToastDemo {
  private readonly toastService = inject(ScToaster);

  showToast(): void {
    this.toastService.show({
      title: 'Scheduled: Catch up',
      description: 'Friday, February 10, 2025 at 5:57 PM',
    });
  }
}`;
}
