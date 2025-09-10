import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { InputGroupDemoSection } from './input-group-demo-section';

@Component({
  selector: 'app-input-group-page',
  imports: [InputGroupDemoSection],
  template: `
    <div class="prose prose-slate dark:prose-invert max-w-none mt-4">
      <p>
        Input groups allow you to combine input fields with icons to provide visual context and
        improve user experience. The component uses CSS Grid to layout icons and input controls
        seamlessly.
      </p>

      <h3>Features</h3>
      <ul>
        <li>Support for left, right, or both icons</li>
        <li>Automatic padding adjustment for icons</li>
        <li>Flexible grid-based layout system</li>
        <li>
          Works with any icon component using
          <code>data-slot="icon"</code>
        </li>
        <li>Seamless integration with existing input styling</li>
      </ul>
    </div>

    <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight my-10">Examples</h2>

    <app-input-group-demo-section title="Basic Usage" level="3" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputGroupPage {}
