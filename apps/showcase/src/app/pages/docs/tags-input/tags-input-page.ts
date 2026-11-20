import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { TocHeading } from '../../../components/toc/toc-heading';
import { EmailsTagsInputDemoContainer } from './demos/emails-tags-input-demo-container';
import { FormTagsInputDemoContainer } from './demos/form-tags-input-demo-container';
import { LimitTagsInputDemoContainer } from './demos/limit-tags-input-demo-container';
import { TagsInputUsageDemoContainer } from './demos/tags-input-usage-demo-container';

@Component({
  selector: 'app-tags-input-page',
  imports: [
    Anatomy,
    RouterLink,
    ScKbd,
    ScLink,
    ScTypeset,
    TagsInputUsageDemoContainer,
    EmailsTagsInputDemoContainer,
    LimitTagsInputDemoContainer,
    FormTagsInputDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Tags Input</h1>
        <p class="text-muted-foreground">
          A recipe: tags typed into one field, a list of strings for Signal
          Forms — the
          <a scLink routerLink="/docs/components/combobox">Combobox</a> with
          several values, and an Add item for what is typed. No component of its
          own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-tags-input-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is made</h2>
        <p>
          Base UI&apos;s &quot;Creatable&quot; combobox: scCombobox with
          multiple holds the tags as chips; the list offers the text typed as an
          item of its own («Add “Docker”»), first, so
          <kbd scKbd>Enter</kbd> adds it — and your suggestions after it. Its
          label is the text, so the chip reads «Docker». A comma adds it too: a
          beforeinput of yours, picking it as Enter does (pick()).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The Combobox&apos;s: one tab stop; <kbd scKbd>Backspace</kbd> in an
            empty input removes the last tag, <kbd scKbd>←</kbd> and
            <kbd scKbd>→</kbd> reach the chips, and each chip&apos;s remove
            button is named by you («Remove Docker»).
          </li>
          <li>
            The Add item says what it adds, in your words; the chips are the
            value, read with the field&apos;s label.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-emails-tags-input-demo-container />
        <app-limit-tags-input-demo-container />
        <app-form-tags-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TagsInputPage {
  private readonly anatomy = {
    imports:
      "import { ScComboboxMultiple, ScComboboxChips, ScComboboxChip, ScComboboxChipRemove, ScComboboxInput, ScComboboxPortal, ScComboboxPopup, ScComboboxList, ScComboboxItem } from '@semantic-components/ui';",
    markup: [
      '<div scCombobox multiple autoHighlight [(value)]="tags" #cb="scCombobox">',
      '  <div scComboboxChips>',
      '    @for (tag of tags(); track tag) {',
      '      <span scComboboxChip [value]="tag">',
      '        {{ tag }}',
      '        <button scComboboxChipRemove>…</button>',
      '      </span>',
      '    }',
      '    <input scComboboxInput (beforeinput)="addOnComma($event, cb)" />',
      '  </div>',
      '  <ng-template scComboboxPortal>',
      '    <div scComboboxPopup>',
      '      <div scComboboxList aria-label="…">',
      '        @if (typed(cb.query()); as text) {',
      '          <div scComboboxItem [value]="text" [label]="text">Add “{{ text }}”</div>',
      '        }',
      '        @for (tag of matching(cb.query()); track tag) { … }',
      '      </div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };
}
