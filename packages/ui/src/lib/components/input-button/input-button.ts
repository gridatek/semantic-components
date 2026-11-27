import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/**
 * A button that looks like a text field — in the style's input look — to
 * open a search, a command palette or a picker: your icon, your text, your
 * shortcut (`scKbd`). Muted while `data-placeholder` (yours on a search; a
 * picker's trigger sets it while empty). Its name is its text; icon only,
 * give it sr-only text.
 */
@Directive({
  selector: 'button[scInputButton]',
  host: {
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScInputButton {
  private readonly inputStyles = injectStyle().input;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      this.inputStyles,
      'inline-flex cursor-pointer items-center gap-2 text-start select-none data-placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate',
      "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      this.classInput(),
    ),
  );
}
