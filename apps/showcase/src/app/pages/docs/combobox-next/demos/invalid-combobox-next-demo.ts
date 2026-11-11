import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScComboboxNext,
  ScComboboxNextEmpty,
  ScComboboxNextInput,
  ScComboboxNextItem,
  ScComboboxNextItemIndicator,
  ScComboboxNextList,
  ScComboboxNextPopup,
  ScComboboxNextPortal,
  ScComboboxNextTrigger,
  ScField,
  ScFieldErrors,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  scComboboxNextMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Invalid once touched (Signal Forms on the combobox): its input marked, the error read with it. */
@Component({
  selector: 'app-invalid-combobox-next-demo',
  imports: [
    FormField,
    ScComboboxNext,
    ScComboboxNextEmpty,
    ScComboboxNextInput,
    ScComboboxNextItem,
    ScComboboxNextItemIndicator,
    ScComboboxNextList,
    ScComboboxNextPopup,
    ScComboboxNextPortal,
    ScComboboxNextTrigger,
    ScField,
    ScFieldErrors,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div scField class="w-56">
      <label scLabel>Framework</label>
      <div
        scComboboxNext
        #cb="scComboboxNext"
        [formField]="frameworkForm.framework"
        class="w-full"
      >
        <div scInputGroup>
          <input scInput scComboboxNextInput placeholder="Select a framework" />
          <div scInputGroupAddon align="inline-end">
            <button scComboboxNextTrigger>
              <svg siChevronDownIcon></svg>
              <span class="sr-only">Show the list</span>
            </button>
          </div>
        </div>
        <ng-template scComboboxNextPortal>
          <div scComboboxNextPopup>
            <div scComboboxNextEmpty>No items found.</div>
            <div scComboboxNextList aria-label="Frameworks">
              @for (framework of matching(cb.query()); track framework) {
                <div scComboboxNextItem [value]="framework">
                  {{ framework }}
                  <span scComboboxNextItemIndicator
                    ><svg siCheckIcon></svg
                  ></span>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
      <div scFieldErrors></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidComboboxNextDemo {
  protected readonly frameworkForm = form(
    signal<{ framework: string | null }>({ framework: null }),
    (path) => {
      required(path.framework, { message: 'Please select a framework.' });
    },
  );

  constructor() {
    // Touched already, to show it invalid.
    this.frameworkForm.framework().markAsTouched();
  }

  protected readonly frameworks = [
    'Next.js',
    'SvelteKit',
    'Nuxt.js',
    'Remix',
    'Astro',
  ];

  protected matching(query: string): string[] {
    return this.frameworks.filter((name) => scComboboxNextMatches(name, query));
  }
}
