import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_RATING_ITEM_GROUP } from './rating-item-group';

export type ScRatingIconRole = 'single' | 'background' | 'foreground';

@Directive({
  selector: 'svg[scRatingIcon]',
  host: {
    '[class]': 'class()',
    '[style.clip-path]': 'clipPath()',
  },
})
export class ScRatingIcon {
  private readonly group = inject(SC_RATING_ITEM_GROUP);

  readonly activeClass = input('fill-yellow-400 text-yellow-400');
  readonly inactiveClass = input('text-gray-300');
  readonly classInput = input<string>('', { alias: 'class' });

  /** Set by the parent ScRatingFieldItem via contentChildren resolution */
  readonly role = signal<ScRatingIconRole>('single');

  /** Set by the parent ScRatingFieldItem so the icon can read state */
  readonly state = signal<'full' | 'half' | 'empty'>('empty');

  protected readonly class = computed(() => {
    const role = this.role();
    const state = this.state();
    const active = this.activeClass();
    const inactive = this.inactiveClass();
    const base = this.classInput();

    if (role === 'single') {
      return cn(base, state === 'empty' ? inactive : active);
    }

    if (role === 'background') {
      return cn(base, inactive);
    }

    // foreground
    return cn('absolute inset-0', base, state === 'empty' ? 'hidden' : active);
  });

  protected readonly clipPath = computed(() => {
    if (this.role() !== 'foreground') {
      return null;
    }

    return this.state() === 'half' ? 'inset(0 50% 0 0)' : 'none';
  });
}
