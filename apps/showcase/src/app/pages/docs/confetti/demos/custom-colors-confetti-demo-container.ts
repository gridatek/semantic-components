import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomColorsConfettiDemo } from './custom-colors-confetti-demo';

@Component({
  selector: 'app-custom-colors-confetti-demo-container',
  imports: [DemoContainer, CustomColorsConfettiDemo],
  template: `
    <app-demo-container title="Custom Colors" [code]="code">
      <app-custom-colors-confetti-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColorsConfettiDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ScConfetti } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-colors-confetti-demo',
  imports: [ScConfetti],
  template: \`
    <sc-confetti #confetti />
    <button
      class="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
      (click)="fire()"
    >
      Purple Party
    </button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColorsConfettiDemo {
  readonly confetti = viewChild.required<ScConfetti>('confetti');

  fire(): void {
    this.confetti().fire({
      colors: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'],
      particleCount: 80,
    });
  }
}`;
}
