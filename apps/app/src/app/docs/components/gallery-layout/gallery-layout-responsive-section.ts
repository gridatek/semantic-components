import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { GalleryLayoutResponsive } from './gallery-layout-responsive';

@Component({
  selector: 'app-gallery-layout-responsive-section',
  imports: [GalleryLayoutResponsive, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-gallery-layout-responsive />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryLayoutResponsiveSection {
  readonly title = input<string>('Responsive Gallery');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScGalleryLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-gallery-layout-responsive',
  imports: [ScGalleryLayout],
  template: \`
    <!-- Mobile first responsive gallery -->
    <div sc-gallery-layout variant="uniform" cols="1" smCols="2" mdCols="3" lgCols="4" gap="3" aspectRatio="landscape" objectFit="cover">
      <div class="bg-blue-500 rounded-lg overflow-hidden relative group">
        <div class="w-full h-full flex items-center justify-center text-white text-sm">
          Mountain View
        </div>
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
      </div>
      <div class="bg-green-500 rounded-lg overflow-hidden relative group">
        <div class="w-full h-full flex items-center justify-center text-white text-sm">
          Forest Path
        </div>
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
      </div>
      <!-- More photos... -->
    </div>

    <!-- High density thumbnail gallery -->
    <div sc-gallery-layout variant="uniform" cols="3" smCols="4" mdCols="6" lgCols="8" gap="1" aspectRatio="square" objectFit="cover">
      <div class="bg-red-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform">
        <div class="w-full h-full flex items-center justify-center text-white text-xs">1</div>
      </div>
      <!-- More thumbnails... -->
    </div>

    <!-- Responsive mosaic layout -->
    <div sc-gallery-layout variant="mosaic" cols="2" mdCols="4" lgCols="6" gap="4" objectFit="cover">
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 col-span-2 md:col-span-2 lg:col-span-3 md:row-span-2">
        <div class="h-full flex flex-col justify-center text-white">
          <h3 class="text-xl font-bold mb-2">Featured Article</h3>
          <p class="text-sm opacity-90">Featured content that spans multiple cells.</p>
        </div>
      </div>
      <!-- More content blocks... -->
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryLayoutResponsive {}`;
}
