import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_MULTISELECT } from './multiselect-tokens';

/**
 * Summarises the selection ("Important + 2 more"), or shows the placeholder.
 * Project content to customise how a selection is rendered.
 */
@Component({
  selector: '[scMultiselectValue]',
  template: `
    @if (multiselect.hasValue()) {
      <ng-content>{{ summary() }}</ng-content>
    } @else {
      {{ multiselect.placeholder() }}
    }
  `,
  host: {
    'data-slot': 'multiselect-value',
    '[attr.data-placeholder]': '!multiselect.hasValue() || null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMultiselectValue {
  protected readonly multiselect = inject(SC_MULTISELECT);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly summary = computed(() => {
    const [first, ...rest] = this.multiselect.selectedLabels();
    return rest.length ? `${first} + ${rest.length} more` : first;
  });

  protected readonly class = computed(() =>
    cn(
      'line-clamp-1 flex flex-1 items-center gap-1.5 text-start data-placeholder:text-muted-foreground',
      this.classInput(),
    ),
  );
}
