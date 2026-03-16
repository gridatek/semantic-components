import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledTagInputDemo } from './disabled-tag-input-demo';

@Component({
  selector: 'app-disabled-tag-input-demo-container',
  imports: [DemoContainer, DisabledTagInputDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-tag-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTagInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTagInputField,
  ScTagInputInput,
  ScTagInputRemove,
  ScTagInputTag,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-tag-input-demo',
  imports: [
    ScTagInputField,
    ScTagInputInput,
    ScTagInputTag,
    ScTagInputRemove,
    SiXIcon,
  ],
  template: \`
    <div class="max-w-md">
      <div
        scTagInputField
        [tags]="['Angular', 'React', 'Vue']"
        [disabled]="true"
      >
        @for (tag of ['Angular', 'React', 'Vue']; track tag) {
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
export class DisabledTagInputDemo {}`;
}
