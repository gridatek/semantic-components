import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: '[sc-timeline-dot]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'timeline-dot',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimelineDot {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<
    'default' | 'outline' | 'success' | 'warning' | 'error'
  >('default');
  readonly size = input<'sm' | 'default' | 'lg'>('default');

  protected readonly class = computed(() =>
    cn(
      'absolute left-0 flex items-center justify-center rounded-full',
      // Size
      this.size() === 'sm' && 'size-4 top-1',
      this.size() === 'default' && 'size-6 top-0',
      this.size() === 'lg' && 'size-8 -top-1',
      // Variant
      this.variant() === 'default' && 'bg-primary text-primary-foreground',
      this.variant() === 'outline' && 'border-2 border-border bg-background',
      this.variant() === 'success' && 'bg-green-500 text-white',
      this.variant() === 'warning' && 'bg-yellow-500 text-white',
      this.variant() === 'error' && 'bg-red-500 text-white',
      this.classInput(),
    ),
  );
}
