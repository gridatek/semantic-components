import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupsAutocompleteDemo } from './groups-autocomplete-demo';

@Component({
  selector: 'app-groups-autocomplete-demo-container',
  imports: [DemoContainer, GroupsAutocompleteDemo],
  template: `
    <app-demo-container
      title="Groups"
      demoUrl="/demos/autocomplete/groups-autocomplete-demo"
      [code]="code"
    >
      <app-groups-autocomplete-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsAutocompleteDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAutocomplete,
  ScComboboxEmpty,
  ScComboboxGroup,
  ScComboboxGroupLabel,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxSeparator,
  ScInput,
  scComboboxMatches,
} from '@semantic-components/ui';

/** Suggestions in named groups, a line between them: the Combobox’s group parts. */
@Component({
  selector: 'app-groups-autocomplete-demo',
  imports: [
    ScAutocomplete,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScInput,
    ScComboboxGroup,
    ScComboboxGroupLabel,
    ScComboboxSeparator,
  ],
  template: \`
    <div
      scAutocomplete
      #ac="scAutocomplete"
      [(value)]="food"
      class="w-64"
    >
      <input
        scInput
        scComboboxInput
        aria-label="Food"
        placeholder="Fruit or vegetable"
      />
      <ng-template scComboboxPortal>
        <div scComboboxPopup>
          <div scComboboxEmpty>Nothing found.</div>
          <div scComboboxList aria-label="Food">
            @for (group of matching(ac.query()); track group.name) {
              <div scComboboxGroup>
                <div scComboboxGroupLabel>{{ group.name }}</div>
                @for (item of group.items; track item) {
                  <div scComboboxItem [value]="item">{{ item }}</div>
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
export class GroupsAutocompleteDemo {
  private readonly food = signal('');
  private readonly groups = [
    {
      name: 'Fruits',
      items: ['Apple', 'Apricot', 'Banana', 'Cherry', 'Grape', 'Orange'],
    },
    {
      name: 'Vegetables',
      items: [
        'Artichoke',
        'Asparagus',
        'Broccoli',
        'Carrot',
        'Celery',
        'Onion',
      ],
    },
  ];

  private matching(query: string) {
    return this.groups
      .map((group) => ({
        name: group.name,
        items: group.items.filter((item) => scComboboxMatches(item, query)),
      }))
      .filter((group) => group.items.length);
  }
}`;
}
