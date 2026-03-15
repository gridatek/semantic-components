import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';

@Component({
  selector: 'div[scTourGuideProgress]',
  template: `
    <div
      class="bg-primary h-full transition-all duration-300"
      [style.width.%]="state.progress()"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'tour-guide-progress',
    '[class]': 'class()',
  },
})
export class ScTourGuideProgress {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScTourGuideState);

  protected readonly class = computed(() =>
    cn('bg-muted mt-4 h-1 overflow-hidden rounded-full', this.classInput()),
  );
}
