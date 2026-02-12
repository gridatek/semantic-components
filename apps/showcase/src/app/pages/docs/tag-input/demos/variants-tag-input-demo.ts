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
        <div sc-tag-input [(tags)]="variantDefault">
          @for (tag of variantDefault(); track tag) {
            <span sc-tag-input-tag [tag]="tag" variant="default"></span>
          }
          <input sc-tag-input-field />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-xs text-muted-foreground">Secondary</label>
        <div sc-tag-input [(tags)]="variantSecondary">
          @for (tag of variantSecondary(); track tag) {
            <span sc-tag-input-tag [tag]="tag" variant="secondary"></span>
          }
          <input sc-tag-input-field />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-xs text-muted-foreground">Outline</label>
        <div sc-tag-input [(tags)]="variantOutline">
          @for (tag of variantOutline(); track tag) {
            <span sc-tag-input-tag [tag]="tag" variant="outline"></span>
          }
          <input sc-tag-input-field />
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
