import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScTouchArea } from '@semantic-components/ui';

@Component({
  selector: 'app-touch-area-demo',
  imports: [ScTouchArea],
  template: `
    <div class="flex flex-col gap-6">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Small buttons with touch areas</h3>
        <p class="text-sm text-muted-foreground">
          On touch devices, small buttons get expanded 44px touch targets for better accessibility.
        </p>
        <div class="flex gap-4">
          <div class="relative">
            <button class="h-6 w-6 rounded border bg-background hover:bg-accent">
              <span class="sr-only">Small button</span>
              ×
            </button>
            <span sc-touch-area></span>
          </div>
          <div class="relative">
            <button class="h-8 w-8 rounded-full border bg-background hover:bg-accent">
              <span class="sr-only">Small icon button</span>
              +
            </button>
            <span sc-touch-area></span>
          </div>
          <div class="relative">
            <button class="px-2 py-1 text-xs rounded border bg-background hover:bg-accent">
              Tag
            </button>
            <span sc-touch-area></span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Links in dense layouts</h3>
        <p class="text-sm text-muted-foreground">
          Small links in lists or tables get improved touch targets.
        </p>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center justify-between">
            <span>File item 1</span>
            <div class="relative">
              <a class="text-xs text-blue-600 hover:underline" href="#">Edit</a>
              <span sc-touch-area></span>
            </div>
          </li>
          <li class="flex items-center justify-between">
            <span>File item 2</span>
            <div class="relative">
              <a class="text-xs text-blue-600 hover:underline" href="#">Edit</a>
              <span sc-touch-area></span>
            </div>
          </li>
          <li class="flex items-center justify-between">
            <span>File item 3</span>
            <div class="relative">
              <a class="text-xs text-blue-600 hover:underline" href="#">Edit</a>
              <span sc-touch-area></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TouchAreaDemo {}
