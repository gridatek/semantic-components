import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

export type ScSeparatorOrientation = 'horizontal' | 'vertical';

/**
 * A line between sections: `role="separator"`, across (`horizontal`, the
 * default) or up and down (`vertical`). With content — your icon, a dot, a
 * word — it shows that instead, centred, no line (a dash between an OTP
 * input's chunks: `<div scSeparator><svg siMinusIcon></svg></div>`). Only
 * decoration? Hide it yourself: `aria-hidden="true"`. As Base UI's
 * Separator; the same in every style.
 */
@Directive({
  selector: 'div[scSeparator]',
  host: {
    // The OTP input styles its separators by it.
    'data-slot': 'separator',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScSeparatorOrientation>('horizontal');

  private readonly class = computed(() =>
    cn(
      'shrink-0 bg-border',
      // Plain classes, not data-[orientation=…]: variants: those outrank
      // yours (h-4 self-center) in specificity, and cn can't merge them.
      this.orientation() === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
      // With content: the content, centred — no line. By :empty, in CSS: the
      // same on the server. (Its line's classes stay plain: yours win.)
      'not-empty:flex not-empty:h-auto not-empty:w-auto not-empty:items-center not-empty:justify-center not-empty:bg-transparent',
      "[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
      this.classInput(),
    ),
  );
}
