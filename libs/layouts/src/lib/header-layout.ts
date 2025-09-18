import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const headerLayoutVariants = cva('flex items-center', {
  variants: {
    justify: {
      undefined: '',
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
    height: {
      undefined: '',
      sm: 'h-12',
      md: 'h-14',
      lg: 'h-16',
      xl: 'h-20',
      auto: 'h-auto',
    },
    padding: {
      undefined: '',
      '0': 'px-0',
      '2': 'px-2',
      '4': 'px-4',
      '6': 'px-6',
      '8': 'px-8',
      '12': 'px-12',
    },
    sticky: {
      undefined: '',
      true: 'sticky top-0 z-50',
      false: '',
    },
    border: {
      undefined: '',
      true: 'border-b border-border',
      false: '',
    },
    background: {
      undefined: '',
      transparent: 'bg-transparent',
      background: 'bg-background',
      card: 'bg-card',
      muted: 'bg-muted',
    },
    blur: {
      undefined: '',
      true: 'backdrop-blur-sm bg-background/80',
      false: '',
    },
  },
});

export type HeaderLayoutVariants = VariantProps<typeof headerLayoutVariants>;

@Component({
  selector: 'header[sc-header-layout]',
  imports: [],
  template: `
    <div class="logo-section">
      <ng-content select="[slot=logo]" />
    </div>
    <nav class="navigation-section flex-1">
      <ng-content select="[slot=navigation]" />
    </nav>
    <div class="actions-section">
      <ng-content select="[slot=actions]" />
    </div>
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScHeaderLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly justify = input<HeaderLayoutVariants['justify']>('between');
  readonly height = input<HeaderLayoutVariants['height']>('lg');
  readonly padding = input<HeaderLayoutVariants['padding']>('6');
  readonly sticky = input<HeaderLayoutVariants['sticky']>();
  readonly border = input<HeaderLayoutVariants['border']>();
  readonly background = input<HeaderLayoutVariants['background']>('background');
  readonly blur = input<HeaderLayoutVariants['blur']>();

  protected readonly class = computed(() =>
    cn(
      headerLayoutVariants({
        justify: this.justify(),
        height: this.height(),
        padding: this.padding(),
        sticky: this.sticky(),
        border: this.border(),
        background: this.background(),
        blur: this.blur(),
      }),
      this.classInput(),
    ),
  );
}
