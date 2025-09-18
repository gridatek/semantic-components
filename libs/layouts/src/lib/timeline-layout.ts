import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const timelineLayoutVariants = cva('relative', {
  variants: {
    orientation: {
      undefined: '',
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row overflow-x-auto',
    },
    lineStyle: {
      undefined: '',
      solid: 'before:absolute before:bg-border',
      dashed: 'before:absolute before:border-l-2 before:border-dashed before:border-border',
      dotted: 'before:absolute before:border-l-2 before:border-dotted before:border-border',
    },
    linePosition: {
      undefined: '',
      left: 'before:left-4 before:top-0 before:bottom-0 before:w-px [&>*]:ml-10',
      center: 'before:left-1/2 before:-translate-x-1/2 before:top-0 before:bottom-0 before:w-px',
      right: 'before:right-4 before:top-0 before:bottom-0 before:w-px [&>*]:mr-10',
    },
    itemGap: {
      undefined: '',
      '0': 'gap-0',
      '2': 'gap-2',
      '4': 'gap-4',
      '6': 'gap-6',
      '8': 'gap-8',
      '12': 'gap-12',
    },
    alternating: {
      undefined: '',
      true: '[&>*:nth-child(even)]:flex-row-reverse [&>*:nth-child(even)]:text-right',
      false: '',
    },
  },
});

export type TimelineLayoutVariants = VariantProps<typeof timelineLayoutVariants>;

@Component({
  selector: 'div[sc-timeline-layout]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimelineLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly orientation = input<TimelineLayoutVariants['orientation']>('vertical');
  readonly lineStyle = input<TimelineLayoutVariants['lineStyle']>('solid');
  readonly linePosition = input<TimelineLayoutVariants['linePosition']>('left');
  readonly itemGap = input<TimelineLayoutVariants['itemGap']>('6');
  readonly alternating = input<TimelineLayoutVariants['alternating']>();

  protected readonly class = computed(() =>
    cn(
      timelineLayoutVariants({
        orientation: this.orientation(),
        lineStyle: this.lineStyle(),
        linePosition: this.linePosition(),
        itemGap: this.itemGap(),
        alternating: this.alternating(),
      }),
      this.classInput(),
    ),
  );
}
