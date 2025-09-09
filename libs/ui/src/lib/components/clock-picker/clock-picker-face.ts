import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  inject,
  input,
  output,
} from '@angular/core';

import { ScClockPickerCenter } from './clock-picker-center';

@Component({
  selector: 'div[sc-clock-picker-face]',
  imports: [ScClockPickerCenter],
  template: `
    <div sc-clock-picker-center></div>
    <ng-content />
  `,
  styles: `
    .sc-clock-picker-face {
      position: relative;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      border: 2px solid var(--border);
      background: var(--card);
      margin: 0 auto;
    }
  `,
  host: {
    '[class.sc-clock-picker-face]': 'true',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.tabindex]': 'tabindex()',
    role: 'grid',
    '(keydown)': 'keyPressed.emit($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScClockPickerFace {
  private readonly elementRef = inject(ElementRef);

  readonly ariaLabel = input<string>('');
  readonly tabindex = input<number>(0);

  readonly keyPressed = output<KeyboardEvent>();
  readonly faceClicked = output<{ clientX: number; clientY: number; rect: DOMRect }>();

  constructor() {
    afterNextRender(() => {
      this.setupClickHandler();
    });
  }

  private setupClickHandler() {
    const face = this.elementRef.nativeElement.querySelector('.sc-clock-picker-face');
    if (!face) return;

    face.addEventListener('click', (e: MouseEvent) => {
      const rect = face.getBoundingClientRect();
      this.faceClicked.emit({
        clientX: e.clientX,
        clientY: e.clientY,
        rect,
      });
    });
  }
}
