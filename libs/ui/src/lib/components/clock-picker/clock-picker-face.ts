import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScClockPickerCenter } from './clock-picker-center';

@Component({
  selector: 'div[sc-clock-picker-face]',
  imports: [ScClockPickerCenter],
  template: `
    <div sc-clock-picker-center></div>
    <ng-content />
  `,
  styles: ``,
  host: {
    '[class]': 'class()',
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
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'relative w-[280px] h-[280px] rounded-full border-2 border-border bg-card mx-auto',
      this.classInput(),
    ),
  );

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
