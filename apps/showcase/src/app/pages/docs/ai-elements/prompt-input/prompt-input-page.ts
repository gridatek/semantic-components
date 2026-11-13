import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { PromptInputUsageDemoContainer } from './demos/prompt-input-usage-demo-container';
import { RtlPromptInputDemoContainer } from './demos/rtl-prompt-input-demo-container';

/** shadcn's Prompt Input pattern: the message field, its files and Send. */
@Component({
  selector: 'app-prompt-input-page',
  imports: [
    Anatomy,
    PromptInputUsageDemoContainer,
    RouterLink,
    RtlPromptInputDemoContainer,
    ScHeading,
    ScLink,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Prompt Input</h1>
        <p class="text-muted-foreground">
          The field the person types into to message the agent, with attachments
          and a send button.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-prompt-input-usage-demo-container />
        <p class="text-muted-foreground">
          An
          <a scLink routerLink="/docs/components/input-group">Input Group</a>
          around a textarea bound with Signal Forms, an attach button, the
          <a scLink routerLink="/docs/ai-elements/model-selector"
            >Model Selector</a
          >
          menus and a send button. Attached files show as
          <a scLink routerLink="/docs/components/attachment">Attachment</a>
          chips above the text.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Attachments</h2>
        <p class="text-muted-foreground">
          The attach button opens a hidden file input. Each file shows as an
          Attachment in an addon on top, with a button to remove it, named by
          the file (&quot;Remove report.pdf&quot;).
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Model and effort</h2>
        <p class="text-muted-foreground">
          The two Model Selector menus go in the bottom addon, between the
          attach and send buttons: the first menu&apos;s
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">ms-auto</code>
          pushes both next to Send.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Keyboard</h2>
        <p class="text-muted-foreground">
          Enter sends the message; Shift+Enter adds a new line. Send isn&apos;t
          disabled while the field is empty — an empty message sends nothing —
          because a disabled button dims the whole Input Group (a gap in the
          library, noted in the todo).
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-rtl-prompt-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the
          <a scLink routerLink="/docs/components/input-group">Input Group</a>,
          the
          <a scLink routerLink="/docs/components/attachment">Attachment</a> and
          the <a scLink routerLink="/docs/components/menu">Menu</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PromptInputPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScInputGroup, ScInputGroupAddon, ScInputGroupButton, ScTextarea,',
      "} from '@semantic-components/ui';",
      "import { FormField, FormRoot, form } from '@angular/forms/signals';",
    ].join('\n'),
    markup: [
      '<form [formRoot]="composer">',
      '  <div scInputGroup>',
      '    <textarea scTextarea aria-label="Message" [formField]="composer.text"',
      '      (keydown.enter)="sendOnEnter($event)"></textarea>',
      '    <div scInputGroupAddon side="bottom">',
      '      <button scInputGroupButton type="button" size="icon-sm" variant="outline">',
      '        <svg siPlusIcon></svg>',
      '        <span class="sr-only">Attach files</span>',
      '      </button>',
      '      <button scInputGroupButton type="submit" size="icon-sm" class="ms-auto">',
      '        <svg siArrowUpIcon></svg>',
      '        <span class="sr-only">Send</span>',
      '      </button>',
      '    </div>',
      '  </div>',
      '</form>',
    ].join('\n'),
  };
}
