import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlComboboxNextDemo } from './rtl-combobox-next-demo';

@Component({
  selector: 'app-rtl-combobox-next-demo-container',
  imports: [DemoContainer, RtlComboboxNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/combobox-next/rtl-combobox-next-demo"
      [code]="code"
    >
      <app-rtl-combobox-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlComboboxNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  scComboboxNextMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the chevron at the left, the check at the left of each option. */
@Component({
  selector: 'app-rtl-combobox-next-demo',
  imports: [
    ScComboboxNext,
    ScComboboxNextEmpty,
    ScComboboxNextInput,
    ScComboboxNextItem,
    ScComboboxNextItemIndicator,
    ScComboboxNextList,
    ScComboboxNextPopup,
    ScComboboxNextPortal,
    ScComboboxNextTrigger,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <div scComboboxNext #cb="scComboboxNext" class="w-56">
        <div scInputGroup>
          <input
            scInput
            scComboboxNextInput
            placeholder="اختر إطار عمل"
            aria-label="إطار العمل"
          />
          <div scInputGroupAddon align="inline-end">
            <button scComboboxNextTrigger>
              <svg siChevronDownIcon></svg>
              <span class="sr-only">Show the list</span>
            </button>
          </div>
        </div>
        <ng-template scComboboxNextPortal>
          <div scComboboxNextPopup>
            <div scComboboxNextEmpty>لم يتم العثور على عناصر.</div>
            <div scComboboxNextList aria-label="إطارات العمل">
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
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlComboboxNextDemo {
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
}`;
}
