import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InvalidComboboxDemo } from './invalid-combobox-demo';

@Component({
  selector: 'app-invalid-combobox-demo-container',
  imports: [DemoContainer, InvalidComboboxDemo],
  template: `
    <app-demo-container
      title="Invalid"
      demoUrl="/demos/combobox/invalid-combobox-demo"
      [code]="code"
    >
      <app-invalid-combobox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidComboboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
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
  ScFieldErrors,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  scComboboxMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Invalid once touched (Signal Forms on the combobox): its input marked, the error read with it. */
@Component({
  selector: 'app-invalid-combobox-demo',
  imports: [
    FormField,
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
    ScFieldErrors,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div scField class="w-56">
      <label scLabel>Framework</label>
      <div
        scCombobox
        #cb="scCombobox"
        [formField]="frameworkForm.framework"
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
      <div scFieldErrors></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidComboboxDemo {
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
    return this.frameworks.filter((name) => scComboboxMatches(name, query));
  }
}`;
}
