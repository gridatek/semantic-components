import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LimitTagsInputDemo } from './limit-tags-input-demo';

@Component({
  selector: 'app-limit-tags-input-demo-container',
  imports: [DemoContainer, LimitTagsInputDemo],
  template: `
    <app-demo-container
      title="Limit and clear"
      [code]="code"
      demoUrl="/demos/tags-input/limit-tags-input-demo"
    >
      <app-limit-tags-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitTagsInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTagsInput,
  ScTagsInputClear,
  ScTagsInputControl,
  ScTagsInputItem,
  ScTagsInputItemRemove,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** maxLength: at five, nothing more goes in (data-full on it). The count is yours to write; Clear removes them all. */
@Component({
  selector: 'app-limit-tags-input-demo',
  imports: [
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemRemove,
    ScTagsInputClear,
    ScField,
    ScFieldDescription,
    ScLabel,
    SiXIcon,
  ],
  template: \`
    <div scField class="w-full max-w-md">
      <label scLabel>Topics</label>
      <div scTagsInput [(value)]="topics" [maxLength]="5">
        @for (topic of topics(); track $index) {
          <span scTagsInputItem>
            <span>{{ topic }}</span>
            <button scTagsInputItemRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ topic }}</span>
            </button>
          </span>
        }
        <input scTagsInputControl placeholder="Add a topic" />
        <button scTagsInputClear>
          <svg siXIcon></svg>
          <span class="sr-only">Clear topics</span>
        </button>
      </div>
      <p scFieldDescription>{{ topics().length }} of 5 topics.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitTagsInputDemo {
  readonly topics = signal(['Design', 'Research', 'Testing']);
}`;
}
