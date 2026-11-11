import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupsComboboxNextDemo } from './groups-combobox-next-demo';

@Component({
  selector: 'app-groups-combobox-next-demo-container',
  imports: [DemoContainer, GroupsComboboxNextDemo],
  template: `
    <app-demo-container
      title="Groups"
      demoUrl="/demos/combobox-next/groups-combobox-next-demo"
      [code]="code"
    >
      <app-groups-combobox-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsComboboxNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScComboboxNext,
  ScComboboxNextEmpty,
  ScComboboxNextGroup,
  ScComboboxNextGroupLabel,
  ScComboboxNextInput,
  ScComboboxNextItem,
  ScComboboxNextItemIndicator,
  ScComboboxNextList,
  ScComboboxNextPopup,
  ScComboboxNextPortal,
  ScComboboxNextSeparator,
  ScComboboxNextTrigger,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  scComboboxNextMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Options in named groups, a line between them: a group with no match is not rendered (your filter). */
@Component({
  selector: 'app-groups-combobox-next-demo',
  imports: [
    ScComboboxNext,
    ScComboboxNextEmpty,
    ScComboboxNextGroup,
    ScComboboxNextGroupLabel,
    ScComboboxNextInput,
    ScComboboxNextItem,
    ScComboboxNextItemIndicator,
    ScComboboxNextList,
    ScComboboxNextPopup,
    ScComboboxNextPortal,
    ScComboboxNextSeparator,
    ScComboboxNextTrigger,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div scComboboxNext #cb="scComboboxNext" class="w-64">
      <div scInputGroup>
        <input
          scInput
          scComboboxNextInput
          placeholder="Select a timezone"
          aria-label="Timezone"
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
          <div scComboboxNextEmpty>No timezones found.</div>
          <div scComboboxNextList aria-label="Timezones">
            @for (group of matching(cb.query()); track group.region) {
              <div scComboboxNextGroup>
                <div scComboboxNextGroupLabel>{{ group.region }}</div>
                @for (zone of group.zones; track zone) {
                  <div scComboboxNextItem [value]="zone">
                    {{ zone }}
                    <span scComboboxNextItemIndicator
                      ><svg siCheckIcon></svg
                    ></span>
                  </div>
                }
              </div>
              @if (!$last) {
                <div scComboboxNextSeparator></div>
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
export class GroupsComboboxNextDemo {
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
        zones: group.zones.filter((zone) => scComboboxNextMatches(zone, query)),
      }))
      .filter((group) => group.zones.length);
  }
}`;
}
