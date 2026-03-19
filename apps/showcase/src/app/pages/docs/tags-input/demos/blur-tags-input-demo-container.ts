import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BlurTagsInputDemo } from './blur-tags-input-demo';

@Component({
  selector: 'app-blur-tags-input-demo-container',
  imports: [DemoContainer, BlurTagsInputDemo],
  template: `
    <app-demo-container title="Add on Blur" [code]="code">
      <app-blur-tags-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlurTagsInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import {
  ScTagsInput,
  ScTagsInputControl,
  ScTagsInputItem,
  ScTagsInputItemDelete,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-blur-tags-input-demo',
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
    <div class="w-full max-w-md">
      <div scField>
        <label scLabel>Tags</label>
        <div scTagsInput [(tags)]="tags">
          @for (tag of tags(); track $index) {
            <span scTagsInputItem [tag]="tag" [index]="$index">
              {{ tag }}
              <button scTagsInputItemDelete>
                <svg siXIcon class="size-3"></svg>
              </button>
            </span>
          }
          <input scTagsInputControl [addOnBlur]="true" />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlurTagsInputDemo {
  readonly tags = signal<string[]>(['blur', 'to', 'add']);
}`;
}
