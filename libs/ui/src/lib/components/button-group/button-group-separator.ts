import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

export type ButtonGroupSeparatorOrientation = 'horizontal' | 'vertical';

@Directive({
  selector: 'div[sc-button-group-separator]',
  host: {
    'data-slot': 'button-group-separator',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScButtonGroupSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ButtonGroupSeparatorOrientation>('vertical');

  protected readonly class = computed(() =>
    cn(
      'bg-input relative self-stretch data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto',
      this.classInput(),
    ),
  );
}
