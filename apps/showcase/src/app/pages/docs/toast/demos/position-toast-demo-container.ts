import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PositionToastDemo } from './position-toast-demo';

@Component({
  selector: 'app-position-toast-demo-container',
  imports: [DemoContainer, PositionToastDemo],
  template: `
    <app-demo-container title="Position" [code]="code">
      <app-position-toast-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionToastDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScToaster, ScToastPosition } from '@semantic-components/ui';

@Component({
  selector: 'app-position-toast-demo',
  imports: [ScButton],
  template: \`
    <div class="grid grid-cols-3 gap-2 w-fit">
      <button scButton variant="outline" (click)="show('top-left')">Top Left</button>
      <button scButton variant="outline" (click)="show('top-center')">Top Center</button>
      <button scButton variant="outline" (click)="show('top-right')">Top Right</button>
      <button scButton variant="outline" (click)="show('bottom-left')">Bottom Left</button>
      <button scButton variant="outline" (click)="show('bottom-center')">Bottom Center</button>
      <button scButton variant="outline" (click)="show('bottom-right')">Bottom Right</button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionToastDemo {
  private readonly toastService = inject(ScToaster);

  show(position: ScToastPosition): void {
    this.toastService.setPosition(position);
    this.toastService.show({ description: \`Position: \${position}\` });
  }
}`;
}
