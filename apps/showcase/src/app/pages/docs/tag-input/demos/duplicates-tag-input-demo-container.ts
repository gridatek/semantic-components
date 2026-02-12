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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DuplicatesTagInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTagInput,
  ScTagInputField,
  ScTagInputTag,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-duplicates-tag-input-demo',
  imports: [ScTagInput, ScTagInputField, ScTagInputTag],
  template: \`
    <div class="max-w-md">
      <div sc-tag-input [(tags)]="tags" [allowDuplicates]="true">
        @for (tag of tags(); track $index) {
          <span sc-tag-input-tag [tag]="tag" variant="secondary"></span>
        }
        <input sc-tag-input-field />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DuplicatesTagInputDemo {
  readonly tags = signal<string[]>(['hello']);
}`;
}
