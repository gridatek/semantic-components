import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'sc-marquee-fade',
  template: `
    <div [class]="fadeLeftClass()"></div>
    <ng-content />
    <div [class]="fadeRightClass()"></div>
  `,
  host: {
    'data-slot': 'marquee-fade',
    '[class]': 'class()',
    '[attr.data-direction]': 'direction()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMarqueeFade {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly fadeSize = input<string>('5rem');

  protected readonly class = computed(() =>
    cn('relative overflow-hidden', this.classInput()),
  );

  protected readonly fadeLeftClass = computed(() => {
    const isVertical = this.direction() === 'vertical';
    return cn(
      'pointer-events-none absolute z-10 from-background to-transparent',
      isVertical
        ? `top-0 left-0 right-0 h-[${this.fadeSize()}] bg-gradient-to-b`
        : `left-0 top-0 bottom-0 w-[${this.fadeSize()}] bg-gradient-to-r`,
    );
  });

  protected readonly fadeRightClass = computed(() => {
    const isVertical = this.direction() === 'vertical';
    return cn(
      'pointer-events-none absolute z-10 from-background to-transparent',
      isVertical
        ? `bottom-0 left-0 right-0 h-[${this.fadeSize()}] bg-gradient-to-t`
        : `right-0 top-0 bottom-0 w-[${this.fadeSize()}] bg-gradient-to-l`,
    );
  });
}
