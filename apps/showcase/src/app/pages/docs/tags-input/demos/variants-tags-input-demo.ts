import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTagsInput,
  ScTagsInputControl,
  ScTagsInputItem,
  ScTagsInputItemDelete,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-variants-tags-input-demo',
  imports: [
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemDelete,
    SiXIcon,
  ],
  template: `
    <div class="w-full max-w-md space-y-3">
      <div class="space-y-1">
        <label class="text-muted-foreground text-xs">Default</label>
        <div scTagsInput [(tags)]="variantDefault">
          @for (tag of variantDefault(); track $index) {
            <span
              scTagsInputItem
              [tag]="tag"
              [index]="$index"
              variant="default"
            >
              {{ tag }}
              <button scTagsInputItemDelete>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagsInputControl />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-muted-foreground text-xs">Secondary</label>
        <div scTagsInput [(tags)]="variantSecondary">
          @for (tag of variantSecondary(); track $index) {
            <span
              scTagsInputItem
              [tag]="tag"
              [index]="$index"
              variant="secondary"
            >
              {{ tag }}
              <button scTagsInputItemDelete>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagsInputControl />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-muted-foreground text-xs">Outline</label>
        <div scTagsInput [(tags)]="variantOutline">
          @for (tag of variantOutline(); track $index) {
            <span
              scTagsInputItem
              [tag]="tag"
              [index]="$index"
              variant="outline"
            >
              {{ tag }}
              <button scTagsInputItemDelete>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagsInputControl />
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsTagsInputDemo {
  readonly variantDefault = signal<string[]>(['Primary', 'Tags']);
  readonly variantSecondary = signal<string[]>(['Secondary', 'Style']);
  readonly variantOutline = signal<string[]>(['Outline', 'Variant']);
}
