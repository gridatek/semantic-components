import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ClearableTagsInputDemo } from './clearable-tags-input-demo';

@Component({
  selector: 'app-clearable-tags-input-demo-container',
  imports: [DemoContainer, ClearableTagsInputDemo],
  template: `
    <app-demo-container title="With Clear Button" [code]="code">
      <app-clearable-tags-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearableTagsInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import {
  ScTagsInput,
  ScTagsInputClear,
  ScTagsInputControl,
  ScTagsInputItem,
  ScTagsInputItemDelete,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-clearable-tags-input-demo',
  imports: [
    ScField,
    ScLabel,
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemDelete,
    ScTagsInputClear,
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
          <input scTagsInputControl />
          <button scTagsInputClear>
            <svg siXIcon class="size-4"></svg>
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearableTagsInputDemo {
  readonly tags = signal<string[]>(['React', 'Vue', 'Svelte']);
}`;
}
