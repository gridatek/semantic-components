import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MaxTagsTagsInputDemo } from './max-tags-tags-input-demo';

@Component({
  selector: 'app-max-tags-tags-input-demo-container',
  imports: [DemoContainer, MaxTagsTagsInputDemo],
  template: `
    <app-demo-container title="Max Tags" [code]="code">
      <app-max-tags-tags-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxTagsTagsInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTagInputCount,
  ScTagInputField,
  ScTagInputInput,
  ScTagInputRemove,
  ScTagInputTag,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-max-tags-tag-input-demo',
  imports: [
    ScTagInputField,
    ScTagInputInput,
    ScTagInputTag,
    ScTagInputRemove,
    ScTagInputCount,
    SiXIcon,
  ],
  template: \`
    <div class="max-w-md space-y-2">
      <div scTagInputField [(tags)]="tags" [maxTags]="5">
        @for (tag of tags(); track tag) {
          <span scTagInputTag [tag]="tag">
            {{ tag }}
            <button scTagInputRemove>
              <svg siXIcon class="size-3"></svg>
            </button>
          </span>
        }
        <input scTagInputInput />
        <span scTagInputCount class="ml-auto text-xs"></span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxTagsTagInputDemo {
  readonly tags = signal<string[]>(['One', 'Two', 'Three']);
}`;
}
