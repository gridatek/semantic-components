import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OutputTagInputDemo } from './output-tag-input-demo';

@Component({
  selector: 'app-output-tag-input-demo-container',
  imports: [DemoContainer, OutputTagInputDemo],
  template: `
    <app-demo-container title="Output Display" [code]="code">
      <app-output-tag-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputTagInputDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import {
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
  selector: 'app-output-tag-input-demo',
  imports: [JsonPipe, ScTagInput, ScTagInputField, ScTagInputTag],
  template: \`
    <div class="max-w-md space-y-4">
      <div sc-tag-input [(tags)]="tags">
        @for (tag of tags(); track tag) {
          <span sc-tag-input-tag [tag]="tag"></span>
        }
        <input sc-tag-input-field />
      </div>
      <div class="rounded-md border p-4 bg-muted/50">
        <pre class="text-sm">{{ tags() | json }}</pre>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputTagInputDemo {
  readonly tags = signal<string[]>(['Angular', 'TypeScript']);
}`;
}
