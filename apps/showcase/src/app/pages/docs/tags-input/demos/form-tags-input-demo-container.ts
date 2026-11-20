import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormTagsInputDemo } from './form-tags-input-demo';

@Component({
  selector: 'app-form-tags-input-demo-container',
  imports: [DemoContainer, FormTagsInputDemo],
  template: `
    <app-demo-container
      title="Form"
      demoUrl="/demos/tags-input/form-tags-input-demo"
      [code]="code"
    >
      <app-form-tags-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTagsInputDemoContainer {
  private readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form, validate } from '@angular/forms/signals';
import {
  ScComboboxChip,
  ScComboboxChipRemove,
  ScComboboxChips,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxMultiple,
  ScComboboxPopup,
  ScComboboxPortal,
  ScField,
  ScFieldErrors,
  ScFrame,
  ScLabel,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** A Signal Forms field of strings: one tag at least and five at most, in the schema; the errors once touched. */
@Component({
  selector: 'app-form-tags-input-demo',
  imports: [
    FormField,
    JsonPipe,
    ScComboboxChip,
    ScComboboxChipRemove,
    ScComboboxChips,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxMultiple,
    ScComboboxPopup,
    ScComboboxPortal,
    ScField,
    ScFieldErrors,
    ScFrame,
    ScLabel,
    SiXIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-4">
      <div scField>
        <label scLabel>Keywords</label>
        <div
          scCombobox
          multiple
          autoHighlight
          #tags="scCombobox"
          [formField]="articleForm.keywords"
        >
          <div scComboboxChips>
            @for (keyword of keywords(); track keyword) {
              <span scComboboxChip [value]="keyword">
                {{ keyword }}
                <button scComboboxChipRemove>
                  <svg siXIcon></svg>
                  <span class="sr-only">Remove {{ keyword }}</span>
                </button>
              </span>
            }
            <input
              scComboboxInput
              placeholder="Add a keyword"
              (beforeinput)="addOnComma($event, tags)"
            />
          </div>
          <ng-template scComboboxPortal>
            <div scComboboxPopup>
              <div scComboboxList aria-label="Keywords">
                @if (typed(tags.query()); as text) {
                  <div scComboboxItem [value]="text" [label]="text">
                    Add “{{ text }}”
                  </div>
                }
              </div>
            </div>
          </ng-template>
        </div>
        <div scFieldErrors></div>
      </div>
      <pre scFrame class="bg-muted p-4 text-xs">{{ model() | json }}</pre>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTagsInputDemo {
  private readonly model = signal<{ keywords: string[] }>({ keywords: [] });
  private readonly articleForm = form(this.model, (path) =>
    validate(path.keywords, ({ value }) =>
      value().length === 0
        ? { kind: 'required', message: 'Add one keyword at least.' }
        : value().length > 5
          ? { kind: 'maxItems', message: 'Five keywords at most.' }
          : null,
    ),
  );
  private readonly keywords = computed(() => this.model().keywords);

  /** What is typed, as a new keyword: not empty, not one already. */
  private typed(query: string): string | null {
    const text = query.trim();
    return text && !this.keywords().includes(text) ? text : null;
  }

  /** A comma adds the text typed, as Enter on the Add item does. */
  private addOnComma(
    event: InputEvent,
    tags: ScComboboxMultiple<string>,
  ): void {
    // On the character typed (beforeinput: after the combobox's own keys,
    // and phone keyboards too).
    if (event.data !== ',') return;
    event.preventDefault();
    const text = this.typed(tags.query());
    // As a pick: the tag added, the text cleared.
    if (text) tags.pick([...tags.selected(), text]);
  }
}`;
}
