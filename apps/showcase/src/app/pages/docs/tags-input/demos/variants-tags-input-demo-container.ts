import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsTagsInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTagInputField,
  ScTagInputInput,
  ScTagInputRemove,
  ScTagInputTag,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-variants-tag-input-demo',
  imports: [
    ScTagInputField,
    ScTagInputInput,
    ScTagInputTag,
    ScTagInputRemove,
    SiXIcon,
  ],
  template: \`
    <div class="max-w-md space-y-3">
      <div class="space-y-1">
        <label class="text-muted-foreground text-xs">Default</label>
        <div scTagInputField [(tags)]="variantDefault">
          @for (tag of variantDefault(); track tag) {
            <span scTagInputTag [tag]="tag" variant="default">
              {{ tag }}
              <button scTagInputRemove>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagInputInput />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-muted-foreground text-xs">Secondary</label>
        <div scTagInputField [(tags)]="variantSecondary">
          @for (tag of variantSecondary(); track tag) {
            <span scTagInputTag [tag]="tag" variant="secondary">
              {{ tag }}
              <button scTagInputRemove>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagInputInput />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-muted-foreground text-xs">Outline</label>
        <div scTagInputField [(tags)]="variantOutline">
          @for (tag of variantOutline(); track tag) {
            <span scTagInputTag [tag]="tag" variant="outline">
              {{ tag }}
              <button scTagInputRemove>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagInputInput />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsTagInputDemo {
  readonly variantDefault = signal<string[]>(['Primary', 'Tags']);
  readonly variantSecondary = signal<string[]>(['Secondary', 'Style']);
  readonly variantOutline = signal<string[]>(['Outline', 'Variant']);
}`;
}
