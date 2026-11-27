import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { SelectUsageDemo } from './select-usage-demo';

@Component({
  selector: 'app-select-usage-demo-container',
  imports: [UsageCode, SelectUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-select-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-usage-demo',
  imports: [
    ScField,
    ScLabel,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div scField class="w-full max-w-48">
      <label scLabel>Theme</label>
      <div scSelect [(value)]="theme" [items]="themes">
        <div scSelectTrigger>
          <span scSelectValue placeholder="Select a theme"></span>
          <svg scSelectIcon siChevronDownIcon></svg>
        </div>
        <ng-template scSelectPortal>
          <div scSelectPopup>
            <div scSelectList>
              <div scSelectGroup>
                @for (item of themes; track item.value) {
                  <div scSelectItem [value]="item.value">
                    <span scSelectItemText>{{ item.label }}</span>
                    <span scSelectItemIndicator>
                      <svg siCheckIcon></svg>
                    </span>
                  </div>
                }
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectUsageDemo {
  private readonly themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];
  private readonly theme = signal('');
}`;
}
