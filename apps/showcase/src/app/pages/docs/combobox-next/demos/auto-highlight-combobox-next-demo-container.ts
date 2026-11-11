import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AutoHighlightComboboxNextDemo } from './auto-highlight-combobox-next-demo';

@Component({
  selector: 'app-auto-highlight-combobox-next-demo-container',
  imports: [DemoContainer, AutoHighlightComboboxNextDemo],
  template: `
    <app-demo-container
      title="Auto highlight"
      demoUrl="/demos/combobox-next/auto-highlight-combobox-next-demo"
      [code]="code"
    >
      <app-auto-highlight-combobox-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AutoHighlightComboboxNextDemoContainer {
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

/** autoHighlight: the first match highlighted as you type, so Enter picks it. */
@Component({
  selector: 'app-auto-highlight-combobox-next-demo',
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
    <div scComboboxNext autoHighlight #cb="scComboboxNext" class="w-56">
      <div scInputGroup>
        <input
          scInput
          scComboboxNextInput
          placeholder="Select a framework"
          aria-label="Framework"
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
          <div scComboboxNextEmpty>No items found.</div>
          <div scComboboxNextList aria-label="Frameworks">
            @for (framework of matching(cb.query()); track framework) {
              <div scComboboxNextItem [value]="framework">
                {{ framework }}
                <span scComboboxNextItemIndicator><svg siCheckIcon></svg></span>
              </div>
            }
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AutoHighlightComboboxNextDemo {
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
