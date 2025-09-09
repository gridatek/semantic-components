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

@Component({
  selector: 'div[sc-clock-picker-face]',
  imports: [],
  template: `
    <div class="sc-clock-picker-center" aria-hidden="true"></div>
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

    .sc-clock-picker-center {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      background: var(--primary);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 25;
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
