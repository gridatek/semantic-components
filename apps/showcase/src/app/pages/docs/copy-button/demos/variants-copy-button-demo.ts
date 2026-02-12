import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-variants-copy-button-demo',
  imports: [ScCopyButton],
  template: `
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Ghost:</span>
        <button
          sc-copy-button
          [value]="'Ghost variant'"
          variant="ghost"
        ></button>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Outline:</span>
        <button
          sc-copy-button
          [value]="'Outline variant'"
          variant="outline"
        ></button>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Default:</span>
        <button
          sc-copy-button
          [value]="'Default variant'"
          variant="default"
        ></button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsCopyButtonDemo {}
