import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    RouterLink,
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
        <a
          scItem
          variant="outline"
          routerLink="."
          fragment="midnight-city-lights"
        >
          <div scItemMedia variant="image" class="relative">
            <img ngSrc="/images/gallery/cafe-thumb.jpg" fill alt="" />
          </div>
          <div scItemBody>
            <div scItemTitle>Midnight City Lights</div>
            <p scItemDescription>Neon Dreams</p>
          </div>
          <div scItemBody class="flex-none text-center">
            <p scItemDescription>3:45</p>
          </div>
        </a>
        <a
          scItem
          variant="outline"
          routerLink="."
          fragment="coffee-shop-conversations"
        >
          <div scItemMedia variant="image" class="relative">
            <img ngSrc="/images/gallery/summit-thumb.jpg" fill alt="" />
          </div>
          <div scItemBody>
            <div scItemTitle>Coffee Shop Conversations</div>
            <p scItemDescription>The Morning Brew</p>
          </div>
          <div scItemBody class="flex-none text-center">
            <p scItemDescription>4:05</p>
          </div>
        </a>
        <a scItem variant="outline" routerLink="." fragment="digital-rain">
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
