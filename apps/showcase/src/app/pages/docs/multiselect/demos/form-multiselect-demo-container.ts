import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormMultiselectDemo } from './form-multiselect-demo';

@Component({
  selector: 'app-form-multiselect-demo-container',
  imports: [DemoContainer, FormMultiselectDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/multiselect/form-multiselect-demo"
    >
      <app-form-multiselect-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormMultiselectDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, validate } from '@angular/forms/signals';
import {
  ScComboboxMultiple,
  ScComboboxChip,
  ScComboboxChipRemove,
  ScComboboxChips,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScField,
  ScFieldErrors,
  ScLabel,
} from '@semantic-components/ui';
import { SiCheckIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** A [formField], an array: one at least and three at most, in the schema; the field shows the error. */
@Component({
  selector: 'app-form-multiselect-demo',
  imports: [
    FormField,
    ScComboboxMultiple,
    ScComboboxChip,
    ScComboboxChipRemove,
    ScComboboxChips,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScField,
    ScFieldErrors,
    ScLabel,
    SiCheckIcon,
    SiXIcon,
  ],
  template: \`
    <div class="w-full max-w-sm">
      <div scField>
        <label scLabel>Reviewers</label>
        <div
          scCombobox
          multiple
          autoHighlight
          #picker="scCombobox"
          [formField]="reviewForm.reviewers"
        >
          <div scComboboxChips>
            @for (item of picker.value(); track item) {
              <span scComboboxChip [value]="item">
                {{ item }}
                <button scComboboxChipRemove>
                  <svg siXIcon></svg>
                  <span class="sr-only">Remove {{ item }}</span>
                </button>
              </span>
            }
            <input scComboboxInput placeholder="Pick reviewers" />
          </div>
          <ng-template scComboboxPortal>
            <div scComboboxPopup>
              <div scComboboxEmpty>No one found.</div>
              <div scComboboxList aria-label="Reviewers">
                @for (item of matching(picker.query()); track item) {
                  <div scComboboxItem [value]="item">
                    {{ item }}
                    <span scComboboxItemIndicator><svg siCheckIcon></svg></span>
                  </div>
                }
              </div>
            </div>
          </ng-template>
        </div>
        <div scFieldErrors></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormMultiselectDemo {
  private readonly model = signal<{ reviewers: string[] }>({ reviewers: [] });
  private readonly reviewForm = form(this.model, (path) =>
    validate(path.reviewers, ({ value }) =>
      value().length === 0
        ? { kind: 'required', message: 'Pick one reviewer at least.' }
        : value().length > 3
          ? { kind: 'maxItems', message: 'Three reviewers at most.' }
          : null,
    ),
  );

  private readonly options = [
    'Ada',
    'Grace',
    'Linus',
    'Margaret',
    'Alan',
    'Barbara',
  ];

  /** The options whose name has what is typed. */
  private matching(query: string): readonly string[] {
    const text = query.trim().toLowerCase();
    return text
      ? this.options.filter((option) => option.toLowerCase().includes(text))
      : this.options;
  }
}`;
}
