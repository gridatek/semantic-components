import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-usecases-copy-button-demo',
  imports: [ScCopyButton],
  template: `
    <div class="max-w-lg space-y-4">
      <!-- Share URL -->
      <div class="rounded-lg border p-4">
        <h4 class="mb-2 text-sm font-medium">Share this page</h4>
        <div class="flex items-center gap-2">
          <input
            type="text"
            [value]="shareUrl"
            readonly
            class="bg-muted h-9 flex-1 rounded-md border px-3 text-sm"
          />
          <button
            scCopyButton
            [value]="shareUrl"
            variant="outline"
            size="icon"
          ></button>
        </div>
      </div>

      <!-- Color Code -->
      <div class="rounded-lg border p-4">
        <h4 class="mb-2 text-sm font-medium">Color</h4>
        <div class="flex items-center gap-3">
          <div class="size-10 rounded-md bg-blue-500"></div>
          <div class="flex-1">
            <p class="text-sm font-medium">#3B82F6</p>
            <p class="text-muted-foreground text-xs">Blue 500</p>
          </div>
          <button scCopyButton [value]="'#3B82F6'" variant="ghost"></button>
        </div>
      </div>

      <!-- Promo Code -->
      <div
        class="rounded-lg border bg-linear-to-r from-purple-500/10 to-pink-500/10 p-4"
      >
        <h4 class="mb-1 text-sm font-medium">Your promo code</h4>
        <div class="flex items-center justify-between">
          <code class="text-2xl font-bold tracking-wider">SAVE20</code>
          <button
            scCopyButton
            [value]="'SAVE20'"
            variant="outline"
            size="default"
          >
            Copy Code
          </button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsecasesCopyButtonDemo {
  readonly shareUrl = 'https://example.com/share/demo-page';
}
