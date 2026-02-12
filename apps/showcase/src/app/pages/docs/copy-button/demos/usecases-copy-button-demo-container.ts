import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UsecasesCopyButtonDemo } from './usecases-copy-button-demo';

@Component({
  selector: 'app-usecases-copy-button-demo-container',
  imports: [DemoContainer, UsecasesCopyButtonDemo],
  template: `
    <app-demo-container title="Common Use Cases" [code]="code">
      <app-usecases-copy-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsecasesCopyButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-usecases-copy-button-demo',
  imports: [ScCopyButton],
  template: \`
    <div class="space-y-4 max-w-lg">
      <!-- Share URL -->
      <div class="rounded-lg border p-4">
        <h4 class="text-sm font-medium mb-2">Share this page</h4>
        <div class="flex items-center gap-2">
          <input
            type="text"
            [value]="shareUrl"
            readonly
            class="flex-1 h-9 rounded-md border bg-muted px-3 text-sm"
          />
          <button
            sc-copy-button
            [value]="shareUrl"
            variant="outline"
            size="icon"
          ></button>
        </div>
      </div>

      <!-- Color Code -->
      <div class="rounded-lg border p-4">
        <h4 class="text-sm font-medium mb-2">Color</h4>
        <div class="flex items-center gap-3">
          <div class="size-10 rounded-md bg-blue-500"></div>
          <div class="flex-1">
            <p class="text-sm font-medium">#3B82F6</p>
            <p class="text-xs text-muted-foreground">Blue 500</p>
          </div>
          <button sc-copy-button [value]="'#3B82F6'" variant="ghost"></button>
        </div>
      </div>

      <!-- Promo Code -->
      <div
        class="rounded-lg border bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4"
      >
        <h4 class="text-sm font-medium mb-1">Your promo code</h4>
        <div class="flex items-center justify-between">
          <code class="text-2xl font-bold tracking-wider">SAVE20</code>
          <button
            sc-copy-button
            [value]="'SAVE20'"
            variant="outline"
            size="default"
          >
            Copy Code
          </button>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsecasesCopyButtonDemo {
  readonly shareUrl = 'https://example.com/share/demo-page';
}`;
}
