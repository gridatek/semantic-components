import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DestructiveToastDemo } from './destructive-toast-demo';

@Component({
  selector: 'app-destructive-toast-demo-container',
  imports: [DemoContainer, DestructiveToastDemo],
  template: `
    <app-demo-container title="Destructive" [code]="code">
      <app-destructive-toast-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestructiveToastDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScToaster } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-destructive-toast-demo',
  imports: [ScButton],
  template: \`
    <button scButton variant="destructive" (click)="showToast()">
      Show Toast
    </button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestructiveToastDemo {
  private readonly toastService = inject(ScToaster);

  showToast(): void {
    this.toastService.show({
      variant: 'destructive',
      title: 'Error',
      description: 'Something went wrong. Please try again.',
    });
  }
}`;
}
