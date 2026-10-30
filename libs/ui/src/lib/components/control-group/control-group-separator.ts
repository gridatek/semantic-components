import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

export type ScControlGroupSeparatorOrientation = 'horizontal' | 'vertical';

/**
 * A line between two of a group's buttons: shadcn's Separator, with the
 * group's classes over it (the same in every preset).
 */
@Directive({
  selector: 'div[scControlGroupSeparator]',
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScControlGroupSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScControlGroupSeparatorOrientation>('vertical');

  protected readonly class = computed(() =>
    cn(
      // The separator's own: without them it has no width.
      'bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
      'bg-input relative self-stretch data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto',
      this.classInput(),
    ),
  );
}
