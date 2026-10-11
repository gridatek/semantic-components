import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { ScStatCardSize, ScStatCardVariant } from './stat-card-types';

@Directive({
  selector: '[scStatCard]',
  host: {
    '[class]': 'class()',
    '[attr.data-variant]': 'variant()',
  },
})
export class ScStatCard {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScStatCardVariant>('default');
  readonly size = input<ScStatCardSize>('md');

  protected readonly class = computed(() => {
    const variant = this.variant();
    const size = this.size();

    return cn(
      'group/stat-card rounded-lg transition-colors',
      // Variants
      variant === 'default' && 'border bg-card text-card-foreground',
      variant === 'outline' && 'border-2 bg-transparent',
      variant === 'filled' && 'bg-primary text-primary-foreground',
      // Sizes
      size === 'sm' && 'p-4',
      size === 'md' && 'p-6',
      size === 'lg' && 'p-8',
      this.classInput(),
    );
  });
}
