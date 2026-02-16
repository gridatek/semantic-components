import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTagInput,
  ScTagInputField,
  ScTagInputTag,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-variants-tag-input-demo',
  imports: [ScTagInput, ScTagInputField, ScTagInputTag],
  template: `
    <div class="space-y-3 max-w-md">
      <div class="space-y-1">
        <label class="text-xs text-muted-foreground">Default</label>
        <div scTagInput [(tags)]="variantDefault">
          @for (tag of variantDefault(); track tag) {
            <span scTagInputTag [tag]="tag" variant="default"></span>
          }
          <input scTagInputField />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-xs text-muted-foreground">Secondary</label>
        <div scTagInput [(tags)]="variantSecondary">
          @for (tag of variantSecondary(); track tag) {
            <span scTagInputTag [tag]="tag" variant="secondary"></span>
          }
          <input scTagInputField />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-xs text-muted-foreground">Outline</label>
        <div scTagInput [(tags)]="variantOutline">
          @for (tag of variantOutline(); track tag) {
            <span scTagInputTag [tag]="tag" variant="outline"></span>
          }
          <input scTagInputField />
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsTagInputDemo {
  readonly variantDefault = signal<string[]>(['Primary', 'Tags']);
  readonly variantSecondary = signal<string[]>(['Secondary', 'Style']);
  readonly variantOutline = signal<string[]>(['Outline', 'Variant']);
}
