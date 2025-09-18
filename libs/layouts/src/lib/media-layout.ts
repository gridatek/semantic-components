import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const mediaLayoutVariants = cva('flex', {
  variants: {
    direction: {
      undefined: '',
      'media-left': 'flex-row',
      'media-right': 'flex-row-reverse',
      'media-top': 'flex-col',
      'media-bottom': 'flex-col-reverse',
    },
    align: {
      undefined: '',
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    mediaSize: {
      undefined: '',
      xs: '[&>*:first-child]:w-12 [&>*:first-child]:h-12',
      sm: '[&>*:first-child]:w-16 [&>*:first-child]:h-16',
      md: '[&>*:first-child]:w-20 [&>*:first-child]:h-20',
      lg: '[&>*:first-child]:w-24 [&>*:first-child]:h-24',
      xl: '[&>*:first-child]:w-32 [&>*:first-child]:h-32',
      '2xl': '[&>*:first-child]:w-40 [&>*:first-child]:h-40',
      auto: '[&>*:first-child]:w-auto [&>*:first-child]:h-auto',
    },
    gap: {
      undefined: '',
      '0': 'gap-0',
      '1': 'gap-1',
      '2': 'gap-2',
      '3': 'gap-3',
      '4': 'gap-4',
      '5': 'gap-5',
      '6': 'gap-6',
      '8': 'gap-8',
    },
    mediaShape: {
      undefined: '',
      square: '[&>*:first-child]:rounded-none',
      rounded: '[&>*:first-child]:rounded-md',
      circle: '[&>*:first-child]:rounded-full',
    },
  },
});

export type MediaLayoutVariants = VariantProps<typeof mediaLayoutVariants>;

@Component({
  selector: 'div[sc-media-layout]',
  imports: [],
  template: `
    <div class="media flex-shrink-0">
      <ng-content select="[slot=media]" />
    </div>
    <div class="content flex-1 min-w-0">
      <ng-content />
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMediaLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly direction = input<MediaLayoutVariants['direction']>('media-left');
  readonly align = input<MediaLayoutVariants['align']>('start');
  readonly mediaSize = input<MediaLayoutVariants['mediaSize']>('md');
  readonly gap = input<MediaLayoutVariants['gap']>('4');
  readonly mediaShape = input<MediaLayoutVariants['mediaShape']>('rounded');

  protected readonly class = computed(() =>
    cn(
      mediaLayoutVariants({
        direction: this.direction(),
        align: this.align(),
        mediaSize: this.mediaSize(),
        gap: this.gap(),
        mediaShape: this.mediaShape(),
      }),
      this.classInput(),
    ),
  );
}
