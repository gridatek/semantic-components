import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScrollableSelectDemo } from './scrollable-select-demo';

@Component({
  selector: 'app-scrollable-select-demo-container',
  imports: [DemoContainer, ScrollableSelectDemo],
  template: `
    <app-demo-container
      title="Scrollable"
      demoUrl="/demos/select/scrollable-select-demo"
      [code]="code"
    >
      <app-scrollable-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollableSelectDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSelect,
  ScSelectGroup,
  ScSelectGroupLabel,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectScrollDownButton,
  ScSelectScrollUpButton,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiChevronUpIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-scrollable-select-demo',
  imports: [
    ScSelect,
    ScSelectGroup,
    ScSelectGroupLabel,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectScrollDownButton,
    ScSelectScrollUpButton,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
    SiChevronUpIcon,
  ],
  template: \`
    <div scSelect [(value)]="zone" [items]="items" class="w-full max-w-64">
      <div scSelectLabel>Timezone</div>
      <div scSelectTrigger>
        <span scSelectValue placeholder="Select a timezone"></span>
        <svg scSelectIcon siChevronDownIcon></svg>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectScrollUpButton>
            <svg siChevronUpIcon></svg>
          </div>
          <div scSelectList>
            @for (region of regions; track region.label) {
              <div scSelectGroup>
                <div scSelectGroupLabel>{{ region.label }}</div>
                @for (item of region.items; track item.value) {
                  <div scSelectItem [value]="item.value">
                    <span scSelectItemText>{{ item.label }}</span>
                    <span scSelectItemIndicator>
                      <svg siCheckIcon></svg>
                    </span>
                  </div>
                }
              </div>
            }
          </div>
          <div scSelectScrollDownButton>
            <svg siChevronDownIcon></svg>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollableSelectDemo {
  protected readonly regions = [
    {
      label: 'North America',
      items: [
        { label: 'Eastern Standard Time', value: 'est' },
        { label: 'Central Standard Time', value: 'cst' },
        { label: 'Mountain Standard Time', value: 'mst' },
        { label: 'Pacific Standard Time', value: 'pst' },
        { label: 'Alaska Standard Time', value: 'akst' },
        { label: 'Hawaii Standard Time', value: 'hst' },
      ],
    },
    {
      label: 'Europe & Africa',
      items: [
        { label: 'Greenwich Mean Time', value: 'gmt' },
        { label: 'Central European Time', value: 'cet' },
        { label: 'Eastern European Time', value: 'eet' },
        { label: 'Western European Summer Time', value: 'west' },
        { label: 'Central Africa Time', value: 'cat' },
        { label: 'East Africa Time', value: 'eat' },
      ],
    },
    {
      label: 'Asia',
      items: [
        { label: 'Moscow Time', value: 'msk' },
        { label: 'India Standard Time', value: 'ist' },
        { label: 'China Standard Time', value: 'cst_china' },
        { label: 'Japan Standard Time', value: 'jst' },
        { label: 'Korea Standard Time', value: 'kst' },
        { label: 'Indonesia Central Standard Time', value: 'ist_indonesia' },
      ],
    },
    {
      label: 'Australia & Pacific',
      items: [
        { label: 'Australian Western Standard Time', value: 'awst' },
        { label: 'Australian Central Standard Time', value: 'acst' },
        { label: 'Australian Eastern Standard Time', value: 'aest' },
        { label: 'New Zealand Standard Time', value: 'nzst' },
        { label: 'Fiji Time', value: 'fjt' },
      ],
    },
    {
      label: 'South America',
      items: [
        { label: 'Argentina Time', value: 'art' },
        { label: 'Bolivia Time', value: 'bot' },
        { label: 'Brasilia Time', value: 'brt' },
        { label: 'Chile Standard Time', value: 'clt' },
      ],
    },
  ];
  protected readonly items = this.regions.flatMap((region) => region.items);
  protected readonly zone = signal('');
}`;
}
