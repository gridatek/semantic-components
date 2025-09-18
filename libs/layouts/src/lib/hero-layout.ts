import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const heroLayoutVariants = cva('relative flex items-center justify-center overflow-hidden', {
  variants: {
    height: {
      undefined: '',
      sm: 'h-64',
      md: 'h-80',
      lg: 'h-96',
      xl: 'h-screen',
      '2xl': 'min-h-screen',
      auto: 'h-auto',
    },
    backgroundType: {
      undefined: '',
      image: 'bg-cover bg-center bg-no-repeat',
      video:
        '[&>video]:absolute [&>video]:inset-0 [&>video]:w-full [&>video]:h-full [&>video]:object-cover',
      gradient: 'bg-gradient-to-r',
      solid: '',
    },
    overlay: {
      undefined: '',
      none: '',
      light: 'before:absolute before:inset-0 before:bg-black/20 before:z-10',
      medium: 'before:absolute before:inset-0 before:bg-black/40 before:z-10',
      dark: 'before:absolute before:inset-0 before:bg-black/60 before:z-10',
      darker: 'before:absolute before:inset-0 before:bg-black/80 before:z-10',
    },
    contentPosition: {
      undefined: '',
      center: 'text-center',
      left: 'text-left items-center justify-start',
      right: 'text-right items-center justify-end',
      'top-center': 'text-center items-start justify-center',
      'bottom-center': 'text-center items-end justify-center',
    },
    contentWidth: {
      undefined: '',
      sm: '[&>*]:max-w-sm',
      md: '[&>*]:max-w-md',
      lg: '[&>*]:max-w-lg',
      xl: '[&>*]:max-w-xl',
      '2xl': '[&>*]:max-w-2xl',
      '3xl': '[&>*]:max-w-3xl',
      '4xl': '[&>*]:max-w-4xl',
      full: '[&>*]:max-w-full',
    },
    padding: {
      undefined: '',
      '0': 'p-0',
      '4': 'p-4',
      '6': 'p-6',
      '8': 'p-8',
      '12': 'p-12',
      '16': 'p-16',
      '20': 'p-20',
    },
  },
});

export type HeroLayoutVariants = VariantProps<typeof heroLayoutVariants>;

@Component({
  selector: 'div[sc-hero-layout]',
  imports: [],
  template: `
    <ng-content select="[slot=background]" />
    <div class="relative z-20 w-full">
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
export class ScHeroLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly height = input<HeroLayoutVariants['height']>('xl');
  readonly backgroundType = input<HeroLayoutVariants['backgroundType']>('image');
  readonly overlay = input<HeroLayoutVariants['overlay']>('medium');
  readonly contentPosition = input<HeroLayoutVariants['contentPosition']>('center');
  readonly contentWidth = input<HeroLayoutVariants['contentWidth']>('2xl');
  readonly padding = input<HeroLayoutVariants['padding']>('8');

  protected readonly class = computed(() =>
    cn(
      heroLayoutVariants({
        height: this.height(),
        backgroundType: this.backgroundType(),
        overlay: this.overlay(),
        contentPosition: this.contentPosition(),
        contentWidth: this.contentWidth(),
        padding: this.padding(),
      }),
      this.classInput(),
    ),
  );
}
