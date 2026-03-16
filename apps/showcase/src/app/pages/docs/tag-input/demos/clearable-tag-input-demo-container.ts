import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ClearableTagInputDemo } from './clearable-tag-input-demo';

@Component({
  selector: 'app-clearable-tag-input-demo-container',
  imports: [DemoContainer, ClearableTagInputDemo],
  template: `
    <app-demo-container title="With Clear Button" [code]="code">
      <app-clearable-tag-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearableTagInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTagInputClear,
  ScTagInputField,
  ScTagInputInput,
  ScTagInputRemove,
  ScTagInputTag,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-clearable-tag-input-demo',
  imports: [
    ScTagInputField,
    ScTagInputInput,
    ScTagInputTag,
    ScTagInputRemove,
    ScTagInputClear,
    SiXIcon,
  ],
  template: \`
    <div class="max-w-md">
      <div scTagInputField [(tags)]="tags">
        @for (tag of tags(); track tag) {
          <span scTagInputTag [tag]="tag">
            {{ tag }}
            <button scTagInputRemove>
              <svg siXIcon class="size-3"></svg>
            </button>
          </span>
        }
        <input scTagInputInput />
        <button scTagInputClear>
          <svg siXIcon class="size-4"></svg>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearableTagInputDemo {
  readonly tags = signal<string[]>(['React', 'Vue', 'Svelte']);
}`;
}
