import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VariantsTagsInputDemo } from './variants-tags-input-demo';

@Component({
  selector: 'app-variants-tags-input-demo-container',
  imports: [DemoContainer, VariantsTagsInputDemo],
  template: `
    <app-demo-container title="Variants" [code]="code">
      <app-variants-tags-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VariantsTagsInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
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
    ScField,
    ScLabel,
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemDelete,
    SiXIcon,
  ],
  template: \`
    <div class="w-full max-w-md space-y-3">
      <div scField>
        <label scLabel>Default</label>
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
      <div scField>
        <label scLabel>Secondary</label>
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
      <div scField>
        <label scLabel>Outline</label>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VariantsTagsInputDemo {
  readonly variantDefault = signal<string[]>(['Primary', 'Tags']);
  readonly variantSecondary = signal<string[]>(['Secondary', 'Style']);
  readonly variantOutline = signal<string[]>(['Outline', 'Variant']);
}`;
}
