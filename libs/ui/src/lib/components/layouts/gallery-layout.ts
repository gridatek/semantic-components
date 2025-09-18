import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const galleryLayoutVariants = cva('grid gap-4', {
  variants: {
    variant: {
      undefined: '',
      masonry: 'grid-flow-row-dense auto-rows-auto',
      uniform: 'grid-rows-none',
      mosaic: 'grid-flow-row-dense',
    },
    cols: {
      undefined: '',
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '5': 'grid-cols-5',
      '6': 'grid-cols-6',
      '7': 'grid-cols-7',
      '8': 'grid-cols-8',
      '9': 'grid-cols-9',
      '10': 'grid-cols-10',
      '11': 'grid-cols-11',
      '12': 'grid-cols-12',
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
      '10': 'gap-10',
      '12': 'gap-12',
      '16': 'gap-16',
    },
    aspectRatio: {
      undefined: '',
      auto: '',
      square: '[&>*]:aspect-square',
      video: '[&>*]:aspect-video',
      portrait: '[&>*]:aspect-[3/4]',
      landscape: '[&>*]:aspect-[4/3]',
    },
    objectFit: {
      undefined: '',
      contain: '[&_img]:object-contain',
      cover: '[&_img]:object-cover',
      fill: '[&_img]:object-fill',
      none: '[&_img]:object-none',
      scale: '[&_img]:object-scale-down',
    },
    smCols: {
      undefined: '',
      '1': 'sm:grid-cols-1',
      '2': 'sm:grid-cols-2',
      '3': 'sm:grid-cols-3',
      '4': 'sm:grid-cols-4',
      '5': 'sm:grid-cols-5',
      '6': 'sm:grid-cols-6',
      '7': 'sm:grid-cols-7',
      '8': 'sm:grid-cols-8',
      '9': 'sm:grid-cols-9',
      '10': 'sm:grid-cols-10',
      '11': 'sm:grid-cols-11',
      '12': 'sm:grid-cols-12',
    },
    mdCols: {
      undefined: '',
      '1': 'md:grid-cols-1',
      '2': 'md:grid-cols-2',
      '3': 'md:grid-cols-3',
      '4': 'md:grid-cols-4',
      '5': 'md:grid-cols-5',
      '6': 'md:grid-cols-6',
      '7': 'md:grid-cols-7',
      '8': 'md:grid-cols-8',
      '9': 'md:grid-cols-9',
      '10': 'md:grid-cols-10',
      '11': 'md:grid-cols-11',
      '12': 'md:grid-cols-12',
    },
    lgCols: {
      undefined: '',
      '1': 'lg:grid-cols-1',
      '2': 'lg:grid-cols-2',
      '3': 'lg:grid-cols-3',
      '4': 'lg:grid-cols-4',
      '5': 'lg:grid-cols-5',
      '6': 'lg:grid-cols-6',
      '7': 'lg:grid-cols-7',
      '8': 'lg:grid-cols-8',
      '9': 'lg:grid-cols-9',
      '10': 'lg:grid-cols-10',
      '11': 'lg:grid-cols-11',
      '12': 'lg:grid-cols-12',
    },
    xlCols: {
      undefined: '',
      '1': 'xl:grid-cols-1',
      '2': 'xl:grid-cols-2',
      '3': 'xl:grid-cols-3',
      '4': 'xl:grid-cols-4',
      '5': 'xl:grid-cols-5',
      '6': 'xl:grid-cols-6',
      '7': 'xl:grid-cols-7',
      '8': 'xl:grid-cols-8',
      '9': 'xl:grid-cols-9',
      '10': 'xl:grid-cols-10',
      '11': 'xl:grid-cols-11',
      '12': 'xl:grid-cols-12',
    },
  },
});

export type GalleryLayoutVariants = VariantProps<typeof galleryLayoutVariants>;

@Component({
  selector: 'div[sc-gallery-layout]',
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
export class ScGalleryLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  // Gallery configuration inputs
  readonly variant = input<GalleryLayoutVariants['variant']>('uniform');
  readonly cols = input<GalleryLayoutVariants['cols']>('3');
  readonly gap = input<GalleryLayoutVariants['gap']>('4');
  readonly aspectRatio = input<GalleryLayoutVariants['aspectRatio']>('auto');
  readonly objectFit = input<GalleryLayoutVariants['objectFit']>('cover');
  readonly smCols = input<GalleryLayoutVariants['smCols']>();
  readonly mdCols = input<GalleryLayoutVariants['mdCols']>();
  readonly lgCols = input<GalleryLayoutVariants['lgCols']>();
  readonly xlCols = input<GalleryLayoutVariants['xlCols']>();

  protected readonly class = computed(() =>
    cn(
      galleryLayoutVariants({
        variant: this.variant(),
        cols: this.cols(),
        gap: this.gap(),
        aspectRatio: this.aspectRatio(),
        objectFit: this.objectFit(),
        smCols: this.smCols(),
        mdCols: this.mdCols(),
        lgCols: this.lgCols(),
        xlCols: this.xlCols(),
      }),
      this.classInput(),
    ),
  );
}
