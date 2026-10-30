import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScSelectNext,
  ScSelectNextGroup,
  ScSelectNextGroupLabel,
  ScSelectNextIcon,
  ScSelectNextItem,
  ScSelectNextItemIndicator,
  ScSelectNextItemText,
  ScSelectNextLabel,
  ScSelectNextList,
  ScSelectNextPopup,
  ScSelectNextPortal,
  ScSelectNextScrollDownButton,
  ScSelectNextScrollUpButton,
  ScSelectNextTrigger,
  ScSelectNextValue,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiChevronUpIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-scrollable-select-next-demo',
  imports: [
    ScField,
    ScSelectNext,
    ScSelectNextGroup,
    ScSelectNextGroupLabel,
    ScSelectNextIcon,
    ScSelectNextItem,
    ScSelectNextItemIndicator,
    ScSelectNextItemText,
    ScSelectNextLabel,
    ScSelectNextList,
    ScSelectNextPopup,
    ScSelectNextPortal,
    ScSelectNextScrollDownButton,
    ScSelectNextScrollUpButton,
    ScSelectNextTrigger,
    ScSelectNextValue,
    SiCheckIcon,
    SiChevronDownIcon,
    SiChevronUpIcon,
  ],
  template: `
    <div scField class="w-full max-w-64">
      <div scSelectNext [(value)]="zone" [items]="items">
        <div scSelectNextLabel>Timezone</div>
        <div scSelectNextTrigger class="w-full">
          <span scSelectNextValue placeholder="Select a timezone"></span>
          <svg scSelectNextIcon siChevronDownIcon></svg>
        </div>
        <ng-template scSelectNextPortal>
          <div scSelectNextPopup>
            <div scSelectNextScrollUpButton>
              <svg siChevronUpIcon></svg>
            </div>
            <div scSelectNextList>
              @for (region of regions; track region.label) {
                <div scSelectNextGroup>
                  <div scSelectNextGroupLabel>{{ region.label }}</div>
                  @for (item of region.items; track item.value) {
                    <div scSelectNextItem [value]="item.value">
                      <span scSelectNextItemText>{{ item.label }}</span>
                      <span scSelectNextItemIndicator>
                        <svg siCheckIcon></svg>
                      </span>
                    </div>
                  }
                </div>
              }
            </div>
            <div scSelectNextScrollDownButton>
              <svg siChevronDownIcon></svg>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollableSelectNextDemo {
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
}
