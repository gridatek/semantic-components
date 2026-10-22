import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LimitTagsInputNextDemo } from './limit-tags-input-next-demo';

@Component({
  selector: 'app-limit-tags-input-next-demo-container',
  imports: [DemoContainer, LimitTagsInputNextDemo],
  template: `
    <app-demo-container
      title="Limit and clear"
      [code]="code"
      demoUrl="/demos/tags-input-next/limit-tags-input-next-demo"
    >
      <app-limit-tags-input-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitTagsInputNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScFieldDescription, ScLabel } from '@semantic-components/ui';
import {
  ScTagsInputNext,
  ScTagsInputNextClear,
  ScTagsInputNextControl,
  ScTagsInputNextItem,
  ScTagsInputNextItemRemove,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** maxLength: at five, nothing more goes in (data-full on it). The count is yours to write; Clear removes them all. */
@Component({
  selector: 'app-limit-tags-input-next-demo',
  imports: [
    ScTagsInputNext,
    ScTagsInputNextControl,
    ScTagsInputNextItem,
    ScTagsInputNextItemRemove,
    ScTagsInputNextClear,
    ScField,
    ScFieldDescription,
    ScLabel,
    SiXIcon,
  ],
  template: \`
    <div scField class="w-full max-w-md">
      <label scLabel>Topics</label>
      <div scTagsInputNext [(value)]="topics" [maxLength]="5">
        @for (topic of topics(); track $index) {
          <span scTagsInputNextItem>
            <span>{{ topic }}</span>
            <button scTagsInputNextItemRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ topic }}</span>
            </button>
          </span>
        }
        <input scTagsInputNextControl placeholder="Add a topic" />
        <button scTagsInputNextClear>
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
export class LimitTagsInputNextDemo {
  readonly topics = signal(['Design', 'Research', 'Testing']);
}`;
}
