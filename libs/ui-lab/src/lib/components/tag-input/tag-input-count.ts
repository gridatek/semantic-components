import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_TAG_INPUT } from './tag-input';

// ============================================================================
// TagInputCount
// ============================================================================
@Component({
  selector: '[sc-tag-input-count]',
  template: `
    {{ tagInput.tags().length }}{{ maxText() }}
  `,
  host: {
    'data-slot': 'tag-input-count',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTagInputCount {
  readonly tagInput = inject(SC_TAG_INPUT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly showMax = input<boolean>(true);

  protected readonly class = computed(() =>
    cn('text-xs text-muted-foreground', this.classInput()),
  );

  protected readonly maxText = computed(() => {
    if (!this.showMax()) return '';
    const max = this.tagInput.maxTags();
    return max !== null ? ` / ${max}` : '';
  });
}
