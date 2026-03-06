import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
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
    <div class="max-w-md space-y-3">
      <div class="space-y-1">
        <label class="text-muted-foreground text-xs">Default</label>
        <div scTagInput [(tags)]="variantDefault">
          @for (tag of variantDefault(); track tag) {
            <span scTagInputTag [tag]="tag" variant="default"></span>
          }
          <input scTagInputField />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-muted-foreground text-xs">Secondary</label>
        <div scTagInput [(tags)]="variantSecondary">
          @for (tag of variantSecondary(); track tag) {
            <span scTagInputTag [tag]="tag" variant="secondary"></span>
          }
          <input scTagInputField />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-muted-foreground text-xs">Outline</label>
        <div scTagInput [(tags)]="variantOutline">
          @for (tag of variantOutline(); track tag) {
            <span scTagInputTag [tag]="tag" variant="outline"></span>
          }
          <input scTagInputField />
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsTagInputDemo {
  readonly variantDefault = signal<string[]>(['Primary', 'Tags']);
  readonly variantSecondary = signal<string[]>(['Secondary', 'Style']);
  readonly variantOutline = signal<string[]>(['Outline', 'Variant']);
}
