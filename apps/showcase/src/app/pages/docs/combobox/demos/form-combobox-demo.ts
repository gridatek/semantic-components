import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScCombobox,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxTrigger,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  scComboboxMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** In a form (Signal Forms): [formField] on the combobox, required in the schema, its label and error from the field. */
@Component({
  selector: 'app-form-combobox-demo',
  imports: [
    FormField,
    ScButton,
    ScCombobox,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScComboboxTrigger,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <form class="flex w-64 flex-col gap-4" (submit)="submit($event)">
      <div scField>
        <label scLabel>Framework</label>
        <div
          scCombobox
          #cb="scCombobox"
          [formField]="projectForm.framework"
          class="w-full"
        >
          <div scInputGroup>
            <input scInput scComboboxInput placeholder="Select a framework" />
            <div scInputGroupAddon align="inline-end">
              <button scComboboxTrigger>
                <svg siChevronDownIcon></svg>
                <span class="sr-only">Show the list</span>
              </button>
            </div>
          </div>
          <ng-template scComboboxPortal>
            <div scComboboxPopup>
              <div scComboboxEmpty>No items found.</div>
              <div scComboboxList aria-label="Frameworks">
                @for (framework of matching(cb.query()); track framework) {
                  <div scComboboxItem [value]="framework">
                    {{ framework }}
                    <span scComboboxItemIndicator><svg siCheckIcon></svg></span>
                  </div>
                }
              </div>
            </div>
          </ng-template>
        </div>
        <p scFieldDescription>The one your project starts with.</p>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit">Create project</button>
      <p class="text-muted-foreground text-sm" aria-live="polite">
        @if (created(); as framework) {
          Created with {{ framework }}.
        }
      </p>
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormComboboxDemo {
  protected readonly projectForm = form(
    signal<{ framework: string | null }>({ framework: null }),
    (path) => {
      required(path.framework, { message: 'Please select a framework.' });
    },
  );
  protected readonly created = signal<string | null>(null);

  protected submit(event: Event): void {
    event.preventDefault();
    this.projectForm.framework().markAsTouched();
    if (this.projectForm().valid()) {
      this.created.set(this.projectForm.framework().value());
    }
  }

  protected readonly frameworks = [
    'Next.js',
    'SvelteKit',
    'Nuxt.js',
    'Remix',
    'Astro',
  ];

  protected matching(query: string): string[] {
    return this.frameworks.filter((name) => scComboboxMatches(name, query));
  }
}
