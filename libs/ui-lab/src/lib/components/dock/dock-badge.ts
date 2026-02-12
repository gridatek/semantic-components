import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'span[sc-dock-badge]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'dock-badge',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDockBadge {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute -top-1 -right-1',
      'min-w-[18px] h-[18px] px-1',
      'flex items-center justify-center',
      'text-[10px] font-medium',
      'bg-destructive text-destructive-foreground',
      'rounded-full',
      this.classInput(),
    ),
  );
}
