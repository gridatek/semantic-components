import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * A rule — "At least 8 characters" — met or not (`met`, `data-met`): your
 * text, your icons (a tick, a cross), and the state in words for screen
 * readers (`sr-only`): the icons aren't read.
 */
@Directive({
  selector: 'li[scPasswordRequirement]',
  host: {
    'data-slot': 'password-requirement',
    '[attr.data-met]': 'met() || null',
    '[class]': 'class()',
  },
})
export class ScPasswordRequirement {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly met = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground data-met:text-foreground flex items-center gap-1.5 transition-colors [&_svg]:size-4 [&_svg]:shrink-0',
      this.classInput(),
    ),
  );
}
