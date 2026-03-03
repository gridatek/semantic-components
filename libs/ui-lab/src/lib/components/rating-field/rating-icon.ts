import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_RATING_ITEM_GROUP } from './rating-item-group';

export type ScRatingIconRole = 'single' | 'background' | 'foreground';

const ACTIVE_CLASSES = 'fill-(--sc-rating-color) text-(--sc-rating-color)';
const INACTIVE_CLASSES = 'text-gray-300';

@Directive({
  selector: 'svg[scRatingIcon]',
  host: {
    '[class]': 'class()',
    '[style.clip-path]': 'clipPath()',
  },
})
export class ScRatingIcon {
  private readonly group = inject(SC_RATING_ITEM_GROUP);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Set by the parent ScRatingFieldItem via contentChildren resolution */
  readonly role = signal<ScRatingIconRole>('single');

  /** Set by the parent ScRatingFieldItem so the icon can read state */
  readonly state = signal<'full' | 'half' | 'empty'>('empty');

  protected readonly class = computed(() => {
    const role = this.role();
    const state = this.state();
    const base = this.classInput();

    if (role === 'single') {
      return cn(base, state === 'empty' ? INACTIVE_CLASSES : ACTIVE_CLASSES);
    }

    if (role === 'background') {
      return cn(base, INACTIVE_CLASSES);
    }

    // foreground
    return cn(
      'absolute inset-0',
      base,
      state === 'empty' ? 'hidden' : ACTIVE_CLASSES,
    );
  });

  protected readonly clipPath = computed(() => {
    if (this.role() !== 'foreground') {
      return null;
    }

    return this.state() === 'half' ? 'inset(0 50% 0 0)' : 'none';
  });
}
