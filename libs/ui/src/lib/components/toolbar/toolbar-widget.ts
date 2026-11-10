import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * Any element made a stop in its toolbar's keyboard: Angular Aria's
 * ToolbarWidget. Its look and state are the part beside it — `scButton`,
 * `scToggle`, `scLink`, `scInput`, a trigger…
 */
@Directive({
  selector: '[scToolbarWidget]',
  hostDirectives: [{ directive: ToolbarWidget, inputs: ['disabled'] }],
  host: {
    'data-slot': 'toolbar-widget',
    '[class]': 'class()',
  },
})
export class ScToolbarWidget {
  readonly classInput = input<string>('', { alias: 'class' });

  // Raised while focused: its focus ring over its neighbours'.
  protected readonly class = computed(() =>
    cn('focus-visible:z-10', this.classInput()),
  );
}
