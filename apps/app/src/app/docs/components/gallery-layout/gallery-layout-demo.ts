import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScGalleryLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-gallery-layout-demo',
  imports: [ScGalleryLayout],
  template: `
    <div class="space-y-8 w-full">
      <!-- Uniform Grid Gallery -->
      <div>
        <h4 class="text-sm font-medium mb-2">Uniform Photo Gallery</h4>
        <p class="text-xs text-gray-500 mb-4">
          variant="uniform" aspectRatio="square" - All items maintain square aspect ratio
        </p>
        <div
          class="w-full"
          sc-gallery-layout
          variant="uniform"
          cols="4"
          gap="2"
          aspectRatio="square"
          objectFit="cover"
        >
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
          <div class="bg-purple-500 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Photo 3
            </div>
          </div>
          <div class="bg-orange-500 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Photo 4
            </div>
          </div>
          <div class="bg-red-500 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Photo 5
            </div>
          </div>
          <div class="bg-teal-500 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Photo 6
            </div>
          </div>
          <div class="bg-indigo-500 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Photo 7
            </div>
          </div>
          <div class="bg-pink-500 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Photo 8
            </div>
          </div>
        </div>
      </div>

      <!-- Video Gallery -->
      <div>
        <h4 class="text-sm font-medium mb-2">Video Gallery</h4>
        <p class="text-xs text-gray-500 mb-4">
          aspectRatio="video" - 16:9 aspect ratio for video thumbnails
        </p>
        <div
          class="w-full"
          sc-gallery-layout
          variant="uniform"
          cols="3"
          gap="4"
          aspectRatio="video"
          objectFit="cover"
        >
          <div class="bg-gray-900 rounded-lg overflow-hidden relative">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              <div class="text-center">
                <div class="text-2xl mb-2">▶️</div>
                <p>Travel Vlog</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 rounded-lg overflow-hidden relative">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              <div class="text-center">
                <div class="text-2xl mb-2">▶️</div>
                <p>Tutorial</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-700 rounded-lg overflow-hidden relative">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              <div class="text-center">
                <div class="text-2xl mb-2">▶️</div>
                <p>Review</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-600 rounded-lg overflow-hidden relative">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              <div class="text-center">
                <div class="text-2xl mb-2">▶️</div>
                <p>Demo</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-500 rounded-lg overflow-hidden relative">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              <div class="text-center">
                <div class="text-2xl mb-2">▶️</div>
                <p>Interview</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-400 rounded-lg overflow-hidden relative">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              <div class="text-center">
                <div class="text-2xl mb-2">▶️</div>
                <p>Webinar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mosaic Layout -->
      <div>
        <h4 class="text-sm font-medium mb-2">Mosaic Layout</h4>
        <p class="text-xs text-gray-500 mb-4">
          variant="mosaic" - Items can span multiple grid cells for variety
        </p>
        <div class="w-full" sc-gallery-layout variant="mosaic" cols="4" gap="3" objectFit="cover">
          <div class="bg-blue-400 rounded-lg p-4 col-span-2 row-span-2">
            <div class="h-full flex items-center justify-center text-white text-lg font-medium">
              Featured
            </div>
          </div>
          <div class="bg-green-400 rounded-lg p-4">
            <div class="h-full flex items-center justify-center text-white text-sm">Small 1</div>
          </div>
          <div class="bg-purple-400 rounded-lg p-4">
            <div class="h-full flex items-center justify-center text-white text-sm">Small 2</div>
          </div>
          <div class="bg-orange-400 rounded-lg p-4">
            <div class="h-full flex items-center justify-center text-white text-sm">Small 3</div>
          </div>
          <div class="bg-red-400 rounded-lg p-4">
            <div class="h-full flex items-center justify-center text-white text-sm">Small 4</div>
          </div>
          <div class="bg-teal-400 rounded-lg p-4 col-span-2">
            <div class="h-full flex items-center justify-center text-white text-sm">Wide</div>
          </div>
          <div class="bg-indigo-400 rounded-lg p-4">
            <div class="h-full flex items-center justify-center text-white text-sm">Regular</div>
          </div>
          <div class="bg-pink-400 rounded-lg p-4">
            <div class="h-full flex items-center justify-center text-white text-sm">Regular</div>
          </div>
        </div>
      </div>

      <!-- Portrait Gallery -->
      <div>
        <h4 class="text-sm font-medium mb-2">Portrait Gallery</h4>
        <p class="text-xs text-gray-500 mb-4">
          aspectRatio="portrait" - 3:4 aspect ratio ideal for portrait photos
        </p>
        <div
          class="w-full"
          sc-gallery-layout
          variant="uniform"
          cols="3"
          gap="4"
          aspectRatio="portrait"
          objectFit="cover"
        >
          <div class="bg-gradient-to-b from-purple-400 to-pink-400 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Portrait 1
            </div>
          </div>
          <div class="bg-gradient-to-b from-blue-400 to-cyan-400 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Portrait 2
            </div>
          </div>
          <div class="bg-gradient-to-b from-green-400 to-teal-400 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Portrait 3
            </div>
          </div>
          <div class="bg-gradient-to-b from-orange-400 to-red-400 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Portrait 4
            </div>
          </div>
          <div class="bg-gradient-to-b from-indigo-400 to-purple-400 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Portrait 5
            </div>
          </div>
          <div class="bg-gradient-to-b from-pink-400 to-rose-400 rounded-lg overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Portrait 6
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryLayoutDemo {}
