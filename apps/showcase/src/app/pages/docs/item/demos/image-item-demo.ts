import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemMedia,
  ScItemTitle,
} from '@semantic-components/ui';

/** scItemMedia variant="image": a square image. */
@Component({
  selector: 'app-image-item-demo',
  imports: [
    NgOptimizedImage,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemMedia,
    ScItemTitle,
  ],
  template: `
    <div class="flex w-full max-w-md flex-col gap-6">
      <div scItemGroup class="gap-4">
        <a scItem variant="outline" href="#image">
          <div scItemMedia variant="image" class="relative">
            <img ngSrc="/images/gallery/cafe-thumb.jpg" fill alt="" priority />
          </div>
          <div scItemBody>
            <div scItemTitle>Midnight City Lights</div>
            <p scItemDescription>Neon Dreams</p>
          </div>
          <div scItemBody class="flex-none text-center">
            <p scItemDescription>3:45</p>
          </div>
        </a>
        <a scItem variant="outline" href="#image">
          <div scItemMedia variant="image" class="relative">
            <img ngSrc="/images/gallery/coast-thumb.jpg" fill alt="" />
          </div>
          <div scItemBody>
            <div scItemTitle>Coffee Shop Conversations</div>
            <p scItemDescription>The Morning Brew</p>
          </div>
          <div scItemBody class="flex-none text-center">
            <p scItemDescription>4:05</p>
          </div>
        </a>
        <a scItem variant="outline" href="#image">
          <div scItemMedia variant="image" class="relative">
            <img ngSrc="/images/gallery/forest-thumb.jpg" fill alt="" />
          </div>
          <div scItemBody>
            <div scItemTitle>Digital Rain</div>
            <p scItemDescription>Binary Beats</p>
          </div>
          <div scItemBody class="flex-none text-center">
            <p scItemDescription>3:30</p>
          </div>
        </a>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ImageItemDemo {}
