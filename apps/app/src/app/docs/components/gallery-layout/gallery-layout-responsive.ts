import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScGalleryLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-gallery-layout-responsive',
  imports: [ScGalleryLayout],
  template: `
    <div class="space-y-8 w-full">
      <!-- Mobile First Responsive Gallery -->
      <div>
        <h4 class="text-sm font-medium mb-2">Responsive Photo Gallery</h4>
        <p class="text-xs text-gray-500 mb-4">
          cols="1" smCols="2" mdCols="3" lgCols="4" - Scales from 1 to 4 columns across breakpoints
        </p>
        <div
          class="w-full"
          sc-gallery-layout
          variant="uniform"
          cols="1"
          smCols="2"
          mdCols="3"
          lgCols="4"
          gap="3"
          aspectRatio="landscape"
          objectFit="cover"
        >
          <div class="bg-blue-500 rounded-lg overflow-hidden relative group">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Mountain View
            </div>
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"
            ></div>
          </div>
          <div class="bg-green-500 rounded-lg overflow-hidden relative group">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Forest Path
            </div>
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"
            ></div>
          </div>
          <div class="bg-purple-500 rounded-lg overflow-hidden relative group">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              City Lights
            </div>
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"
            ></div>
          </div>
          <div class="bg-orange-500 rounded-lg overflow-hidden relative group">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Beach Sunset
            </div>
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"
            ></div>
          </div>
          <div class="bg-red-500 rounded-lg overflow-hidden relative group">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Desert Dunes
            </div>
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"
            ></div>
          </div>
          <div class="bg-teal-500 rounded-lg overflow-hidden relative group">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Ocean Waves
            </div>
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"
            ></div>
          </div>
          <div class="bg-indigo-500 rounded-lg overflow-hidden relative group">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Snow Peaks
            </div>
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"
            ></div>
          </div>
          <div class="bg-pink-500 rounded-lg overflow-hidden relative group">
            <div class="w-full h-full flex items-center justify-center text-white text-sm">
              Cherry Blossoms
            </div>
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"
            ></div>
          </div>
        </div>
      </div>

      <!-- High Density Thumbnail Gallery -->
      <div>
        <h4 class="text-sm font-medium mb-2">Thumbnail Gallery</h4>
        <p class="text-xs text-gray-500 mb-4">
          cols="3" smCols="4" mdCols="6" lgCols="8" - High density layout for thumbnails
        </p>
        <div
          class="w-full"
          sc-gallery-layout
          variant="uniform"
          cols="3"
          smCols="4"
          mdCols="6"
          lgCols="8"
          gap="1"
          aspectRatio="square"
          objectFit="cover"
        >
          <div
            class="bg-red-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">1</div>
          </div>
          <div
            class="bg-orange-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">2</div>
          </div>
          <div
            class="bg-yellow-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">3</div>
          </div>
          <div
            class="bg-green-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">4</div>
          </div>
          <div
            class="bg-blue-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">5</div>
          </div>
          <div
            class="bg-indigo-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">6</div>
          </div>
          <div
            class="bg-purple-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">7</div>
          </div>
          <div
            class="bg-pink-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">8</div>
          </div>
          <div
            class="bg-rose-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">9</div>
          </div>
          <div
            class="bg-cyan-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">10</div>
          </div>
          <div
            class="bg-teal-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">11</div>
          </div>
          <div
            class="bg-emerald-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">12</div>
          </div>
          <div
            class="bg-lime-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">13</div>
          </div>
          <div
            class="bg-amber-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">14</div>
          </div>
          <div
            class="bg-violet-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">15</div>
          </div>
          <div
            class="bg-fuchsia-400 rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <div class="w-full h-full flex items-center justify-center text-white text-xs">16</div>
          </div>
        </div>
      </div>

      <!-- Responsive Mosaic -->
      <div>
        <h4 class="text-sm font-medium mb-2">Responsive Mosaic</h4>
        <p class="text-xs text-gray-500 mb-4">
          Mosaic layout that adapts to different screen sizes
        </p>
        <div
          class="w-full"
          sc-gallery-layout
          variant="mosaic"
          cols="2"
          mdCols="4"
          lgCols="6"
          gap="4"
          objectFit="cover"
        >
          <div
            class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 col-span-2 md:col-span-2 lg:col-span-3 md:row-span-2"
          >
            <div class="h-full flex flex-col justify-center text-white">
              <h3 class="text-xl font-bold mb-2">Featured Article</h3>
              <p class="text-sm opacity-90">
                This featured content spans multiple grid cells and adapts to different screen
                sizes.
              </p>
            </div>
          </div>
          <div class="bg-green-500 rounded-lg p-4">
            <div class="h-full flex items-center justify-center text-white text-sm">Article 1</div>
          </div>
          <div class="bg-purple-500 rounded-lg p-4">
            <div class="h-full flex items-center justify-center text-white text-sm">Article 2</div>
          </div>
          <div class="bg-orange-500 rounded-lg p-4 md:col-span-2 lg:col-span-3">
            <div class="h-full flex items-center justify-center text-white text-sm">
              Wide Content
            </div>
          </div>
          <div class="bg-red-500 rounded-lg p-4">
            <div class="h-full flex items-center justify-center text-white text-sm">Article 3</div>
          </div>
          <div class="bg-teal-500 rounded-lg p-4">
            <div class="h-full flex items-center justify-center text-white text-sm">Article 4</div>
          </div>
          <div class="bg-indigo-500 rounded-lg p-4">
            <div class="h-full flex items-center justify-center text-white text-sm">Article 5</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryLayoutResponsive {}
