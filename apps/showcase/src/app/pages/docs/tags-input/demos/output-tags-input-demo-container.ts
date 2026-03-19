import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OutputTagsInputDemo } from './output-tags-input-demo';

@Component({
  selector: 'app-output-tags-input-demo-container',
  imports: [DemoContainer, OutputTagsInputDemo],
  template: `
    <app-demo-container title="Output Display" [code]="code">
      <app-output-tags-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputTagsInputDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import {
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
  selector: 'app-output-tag-input-demo',
  imports: [
    JsonPipe,
    ScTagInputField,
    ScTagInputInput,
    ScTagInputTag,
    ScTagInputRemove,
    SiXIcon,
  ],
  template: \`
    <div class="max-w-md space-y-4">
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
      </div>
      <div class="bg-muted/50 rounded-md border p-4">
        <pre class="text-sm">{{ tags() | json }}</pre>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputTagInputDemo {
  readonly tags = signal<string[]>(['Angular', 'TypeScript']);
}`;
}
