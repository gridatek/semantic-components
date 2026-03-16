import { Directive, InjectionToken, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

export const SC_TAG_INPUT_TAG = new InjectionToken<ScTagInputTag>(
  'ScTagInputTag',
);

@Directive({
  selector: '[scTagInputTag]',
  exportAs: 'scTagInputTag',
  providers: [{ provide: SC_TAG_INPUT_TAG, useExisting: ScTagInputTag }],
  host: {
    'data-slot': 'tag-input-tag',
    '[class]': 'class()',
  },
})
export class ScTagInputTag {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly tag = input.required<string>();
  readonly variant = input<'default' | 'secondary' | 'outline'>('default');

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-colors',
      'max-w-[150px]',
      this.variant() === 'default' && 'bg-primary text-primary-foreground',
      this.variant() === 'secondary' &&
        'bg-secondary text-secondary-foreground',
      this.variant() === 'outline' && 'border bg-background',
      this.classInput(),
    ),
  );
}
