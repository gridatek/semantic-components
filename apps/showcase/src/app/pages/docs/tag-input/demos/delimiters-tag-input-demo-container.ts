import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DelimitersTagInputDemo } from './delimiters-tag-input-demo';

@Component({
  selector: 'app-delimiters-tag-input-demo-container',
  imports: [DemoContainer, DelimitersTagInputDemo],
  template: `
    <app-demo-container title="Custom Delimiters" [code]="code">
      <app-delimiters-tag-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelimitersTagInputDemoContainer {
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
  selector: 'app-delimiters-tag-input-demo',
  imports: [
    ScTagInputField,
    ScTagInputInput,
    ScTagInputTag,
    ScTagInputRemove,
    SiXIcon,
  ],
  template: \`
    <div class="max-w-md">
      <div scTagInputField [(tags)]="tags" [delimiters]="['Enter', ' ', 'Tab']">
        @for (tag of tags(); track tag) {
          <span scTagInputTag [tag]="tag">
            {{ tag }}
            <button scTagInputRemove>
              <svg siXIcon class="size-3"></svg>
            </button>
          </span>
        }
        <input scTagInputInput />
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelimitersTagInputDemo {
  readonly tags = signal<string[]>(['space', 'separated']);
}`;
}
