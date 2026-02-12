import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-copy-button-demo',
  imports: [ScCopyButton],
  template: `
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Small:</span>
        <button
          sc-copy-button
          [value]="'Small'"
          size="sm"
          variant="outline"
        ></button>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Default:</span>
        <button
          sc-copy-button
          [value]="'Default'"
          size="default"
          variant="outline"
        ></button>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Large:</span>
        <button
          sc-copy-button
          [value]="'Large'"
          size="lg"
          variant="outline"
        ></button>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Icon:</span>
        <button
          sc-copy-button
          [value]="'Icon'"
          size="icon"
          variant="outline"
        ></button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesCopyButtonDemo {}
