import { Toolbar } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/**
 * A toolbar: Angular Aria's Toolbar — one Tab stop, the arrow keys move
 * between its widgets (mirrored right to left; Up and Down when vertical),
 * wrapping at the ends (`loopFocus`). Disabled widgets stay focusable
 * (`softDisabled`). Its widgets are any parts made `scToolbarWidget`.
 */
@Directive({
  selector: 'div[scToolbar]',
  hostDirectives: [
    {
      directive: Toolbar,
      inputs: ['orientation', 'disabled', 'softDisabled', 'wrap: loopFocus'],
    },
  ],
  host: {
    'data-slot': 'toolbar',
    '[attr.data-orientation]': 'toolbar.orientation()',
    '[class]': 'class()',
  },
})
export class ScToolbar {
  private readonly frame = injectStyle().frame;
  private readonly toolbar = inject(Toolbar);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      this.frame,
      'flex w-fit gap-1 bg-background p-1',
      this.toolbar.orientation() === 'vertical'
        ? 'flex-col items-stretch'
        : 'items-center',
      this.classInput(),
    ),
  );
}
