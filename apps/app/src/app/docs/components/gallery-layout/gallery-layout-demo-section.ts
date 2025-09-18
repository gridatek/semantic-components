import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { GalleryLayoutDemo } from './gallery-layout-demo';

@Component({
  selector: 'app-gallery-layout-demo-section',
  imports: [GalleryLayoutDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-gallery-layout-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryLayoutDemoSection {
  readonly title = input<string>('Gallery Layout');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScGalleryLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-gallery-layout-demo',
  imports: [ScGalleryLayout],
  template: \`
    <!-- Uniform Photo Gallery -->
    <div sc-gallery-layout variant="uniform" cols="4" gap="2" aspectRatio="square" objectFit="cover">
      <div class="bg-blue-500 rounded-lg overflow-hidden">
        <div class="w-full h-full flex items-center justify-center text-white text-sm">
          Photo 1
        </div>
      </div>
      <div class="bg-green-500 rounded-lg overflow-hidden">
        <div class="w-full h-full flex items-center justify-center text-white text-sm">
          Photo 2
        </div>
      </div>
      <!-- More photos... -->
    </div>

    <!-- Video Gallery -->
    <div sc-gallery-layout variant="uniform" cols="3" gap="4" aspectRatio="video" objectFit="cover">
      <div class="bg-gray-900 rounded-lg overflow-hidden relative">
        <div class="w-full h-full flex items-center justify-center text-white text-sm">
          <div class="text-center">
            <div class="text-2xl mb-2">▶️</div>
            <p>Travel Vlog</p>
          </div>
        </div>
      </div>
      <!-- More videos... -->
    </div>

    <!-- Mosaic Layout -->
    <div sc-gallery-layout variant="mosaic" cols="4" gap="3" objectFit="cover">
      <div class="bg-blue-400 rounded-lg p-4 col-span-2 row-span-2">
        <div class="h-full flex items-center justify-center text-white text-lg font-medium">
          Featured
        </div>
      </div>
      <div class="bg-green-400 rounded-lg p-4">
        <div class="h-full flex items-center justify-center text-white text-sm">Small 1</div>
      </div>
      <!-- More items... -->
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryLayoutDemo {}`;
}
