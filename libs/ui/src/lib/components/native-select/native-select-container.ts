import { Directive, computed, contentChild, input } from '@angular/core';
import { cn } from '../../utils';
import { ScNativeSelect } from './native-select';

/**
 * Around a `scNativeSelect` and your chevron (`scNativeSelectIcon`):
 * as wide as its content, dimmed while the select is disabled. It carries its
 * select's size, for the chevron.
 */
@Directive({
  selector: 'div[scNativeSelectContainer]',
  host: {
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
  },
})
export class ScNativeSelectContainer {
  private readonly select = contentChild(ScNativeSelect);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly size = computed(() => this.select()?.size() ?? 'default');

  protected readonly class = computed(() =>
    cn(
      'group/native-select relative w-fit has-[select:disabled]:opacity-50',
      this.classInput(),
    ),
  );
}
