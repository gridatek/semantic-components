import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupsComboboxDemo } from './groups-combobox-demo';

@Component({
  selector: 'app-groups-combobox-demo-container',
  imports: [DemoContainer, GroupsComboboxDemo],
  template: `
    <app-demo-container
      title="Groups"
      demoUrl="/demos/combobox/groups-combobox-demo"
      [code]="code"
    >
      <app-groups-combobox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsComboboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCombobox,
  ScComboboxEmpty,
  ScComboboxGroup,
  ScComboboxGroupLabel,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxSeparator,
  ScComboboxTrigger,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  scComboboxMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Options in named groups, a line between them: a group with no match is not rendered (your filter). */
@Component({
  selector: 'app-groups-combobox-demo',
  imports: [
    ScCombobox,
    ScComboboxEmpty,
    ScComboboxGroup,
    ScComboboxGroupLabel,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScComboboxSeparator,
    ScComboboxTrigger,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div scCombobox #cb="scCombobox" class="w-64">
      <div scInputGroup>
        <input
          scInput
          scComboboxInput
          placeholder="Select a timezone"
          aria-label="Timezone"
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
          <div scComboboxEmpty>No timezones found.</div>
          <div scComboboxList aria-label="Timezones">
            @for (group of matching(cb.query()); track group.region) {
              <div scComboboxGroup>
                <div scComboboxGroupLabel>{{ group.region }}</div>
                @for (zone of group.zones; track zone) {
                  <div scComboboxItem [value]="zone">
                    {{ zone }}
                    <span scComboboxItemIndicator><svg siCheckIcon></svg></span>
                  </div>
                }
              </div>
              @if (!$last) {
                <div scComboboxSeparator></div>
              }
            }
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsComboboxDemo {
  protected readonly timezones = [
    {
      region: 'Americas',
      zones: [
        '(GMT-5) New York',
        '(GMT-8) Los Angeles',
        '(GMT-6) Chicago',
        '(GMT-5) Toronto',
        '(GMT-3) São Paulo',
      ],
    },
    {
      region: 'Europe',
      zones: [
        '(GMT+0) London',
        '(GMT+1) Paris',
        '(GMT+1) Berlin',
        '(GMT+1) Rome',
        '(GMT+1) Madrid',
      ],
    },
    {
      region: 'Asia/Pacific',
      zones: [
        '(GMT+9) Tokyo',
        '(GMT+8) Shanghai',
        '(GMT+8) Singapore',
        '(GMT+4) Dubai',
        '(GMT+11) Sydney',
      ],
    },
  ];

  /** The groups that still have a zone matching, with those zones. */
  protected matching(query: string): { region: string; zones: string[] }[] {
    return this.timezones
      .map((group) => ({
        region: group.region,
        zones: group.zones.filter((zone) => scComboboxMatches(zone, query)),
      }))
      .filter((group) => group.zones.length);
  }
}`;
}
