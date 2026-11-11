import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlComboboxDemo } from './rtl-combobox-demo';

@Component({
  selector: 'app-rtl-combobox-demo-container',
  imports: [DemoContainer, RtlComboboxDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/combobox/rtl-combobox-demo"
      [code]="code"
    >
      <app-rtl-combobox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlComboboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  scComboboxMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the chevron at the left, the check at the left of each option. */
@Component({
  selector: 'app-rtl-combobox-demo',
  imports: [
    ScCombobox,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScComboboxTrigger,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <div scCombobox #cb="scCombobox" class="w-56">
        <div scInputGroup>
          <input
            scInput
            scComboboxInput
            placeholder="اختر إطار عمل"
            aria-label="إطار العمل"
          />
          <div scInputGroupAddon align="inline-end">
            <button scComboboxTrigger>
              <svg siChevronDownIcon></svg>
              <span class="sr-only">Show the list</span>
            </button>
          </div>
        </div>
        <ng-template scComboboxPortal>
          <div scComboboxPopup>
            <div scComboboxEmpty>لم يتم العثور على عناصر.</div>
            <div scComboboxList aria-label="إطارات العمل">
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
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlComboboxDemo {
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
