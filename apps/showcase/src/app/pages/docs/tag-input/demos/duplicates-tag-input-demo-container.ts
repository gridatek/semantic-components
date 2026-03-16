import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DuplicatesTagInputDemo } from './duplicates-tag-input-demo';

@Component({
  selector: 'app-duplicates-tag-input-demo-container',
  imports: [DemoContainer, DuplicatesTagInputDemo],
  template: `
    <app-demo-container title="Allow Duplicates" [code]="code">
      <app-duplicates-tag-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DuplicatesTagInputDemoContainer {
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
  selector: 'app-duplicates-tag-input-demo',
  imports: [
    ScTagInputField,
    ScTagInputInput,
    ScTagInputTag,
    ScTagInputRemove,
    SiXIcon,
  ],
  template: \`
    <div class="max-w-md">
      <div scTagInputField [(tags)]="tags" [allowDuplicates]="true">
        @for (tag of tags(); track $index) {
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DuplicatesTagInputDemo {
  readonly tags = signal<string[]>(['hello']);
}`;
}
