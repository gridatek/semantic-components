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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearableTagInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTagInput,
  ScTagInputClear,
  ScTagInputField,
  ScTagInputTag,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-clearable-tag-input-demo',
  imports: [ScTagInput, ScTagInputField, ScTagInputTag, ScTagInputClear],
  template: \`
    <div class="max-w-md">
      <div sc-tag-input [(tags)]="tags">
        @for (tag of tags(); track tag) {
          <span sc-tag-input-tag [tag]="tag"></span>
        }
        <input sc-tag-input-field />
        <button sc-tag-input-clear></button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearableTagInputDemo {
  readonly tags = signal<string[]>(['React', 'Vue', 'Svelte']);
}`;
}
