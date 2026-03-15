import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicConfettiDemo } from './basic-confetti-demo';

@Component({
  selector: 'app-basic-confetti-demo-container',
  imports: [DemoContainer, BasicConfettiDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-confetti-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicConfettiDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-basic-confetti-demo',
  imports: [ScButton],
  template: \`
    <button scButton (click)="fire()">Fire Confetti!</button>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicConfettiDemo {
  fire(): void {
    confetti();
  }
}`;
}
