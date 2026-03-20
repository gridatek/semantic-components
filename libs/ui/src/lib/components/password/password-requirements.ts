import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { SiCheckIcon, SiCircleIcon } from '@semantic-icons/lucide-icons';
import { cn } from '../../utils';

@Directive({
  selector: 'ul[scPasswordRequirements]',
  host: {
    'data-slot': 'password-requirements',
    '[class]': 'class()',
  },
})
export class ScPasswordRequirements {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('mt-2 space-y-1 text-xs', this.classInput()),
  );
}

@Component({
  selector: 'li[scPasswordRequirementItem]',
  imports: [SiCheckIcon, SiCircleIcon],
  template: `
    @if (met()) {
      <svg siCheckIcon class="mr-1 inline size-3" aria-hidden="true"></svg>
    } @else {
      <svg siCircleIcon class="mr-1 inline size-3" aria-hidden="true"></svg>
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'password-requirement-item',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPasswordRequirementItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly met = input.required<boolean>();

  protected readonly class = computed(() =>
    cn(
      'flex items-center',
      this.met() ? 'text-green-600' : 'text-muted-foreground',
      this.classInput(),
    ),
  );
}
