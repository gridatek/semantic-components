import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomComboboxNextDemo } from './custom-combobox-next-demo';

@Component({
  selector: 'app-custom-combobox-next-demo-container',
  imports: [DemoContainer, CustomComboboxNextDemo],
  template: `
    <app-demo-container
      title="Custom items"
      demoUrl="/demos/combobox-next/custom-combobox-next-demo"
      [code]="code"
    >
      <app-custom-combobox-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomComboboxNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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

interface Country {
  code: string;
  name: string;
}

/** Objects as values: itemToStringLabel gives the label shown in the input, before the list has ever opened too. */
@Component({
  selector: 'app-custom-combobox-next-demo',
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
    <div class="flex flex-col items-center gap-3">
      <div
        scComboboxNext
        #cb="scComboboxNext"
        [(value)]="country"
        [itemToStringLabel]="label"
        class="w-56"
      >
        <div scInputGroup>
          <input
            scInput
            scComboboxNextInput
            placeholder="Select a country"
            aria-label="Country"
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
            <div scComboboxNextEmpty>No countries found.</div>
            <div scComboboxNextList aria-label="Countries">
              @for (country of matching(cb.query()); track country.code) {
                <div
                  scComboboxNextItem
                  [value]="country"
                  [label]="country.name"
                >
                  <span class="text-muted-foreground w-6 text-xs">{{
                    country.code
                  }}</span>
                  {{ country.name }}
                  <span scComboboxNextItemIndicator
                    ><svg siCheckIcon></svg
                  ></span>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
      <p class="text-muted-foreground text-sm">
        Value: {{ country()?.code ?? 'none' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomComboboxNextDemo {
  protected readonly countries: Country[] = [
    { code: 'DZ', name: 'Algeria' },
    { code: 'BR', name: 'Brazil' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'MA', name: 'Morocco' },
    { code: 'ES', name: 'Spain' },
  ];
  protected readonly country = signal<Country | null>(this.countries[2]);
  protected readonly label = (country: Country) => country.name;

  protected matching(query: string): Country[] {
    return this.countries.filter((country) =>
      scComboboxNextMatches(country.name, query),
    );
  }
}`;
}
