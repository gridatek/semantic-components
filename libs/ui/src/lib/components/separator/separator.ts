import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

export type ScSeparatorOrientation = 'horizontal' | 'vertical';

/**
 * A line between sections: `role="separator"`, across (`horizontal`, the
 * default) or up and down (`vertical`). Only decoration? Hide it yourself:
 * `aria-hidden="true"`. As Base UI's Separator; the same in every style.
 */
@Directive({
  selector: 'div[scSeparator]',
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScSeparatorOrientation>('horizontal');

  protected readonly class = computed(() =>
    cn(
      'shrink-0 bg-border',
      // Plain classes, not data-[orientation=…]: variants: those outrank
      // yours (h-4 self-center) in specificity, and cn can't merge them.
      this.orientation() === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
      this.classInput(),
    ),
  );
}
