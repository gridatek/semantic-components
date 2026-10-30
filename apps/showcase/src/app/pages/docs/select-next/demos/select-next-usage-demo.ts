import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScSelectNext,
  ScSelectNextGroup,
  ScSelectNextIcon,
  ScSelectNextItem,
  ScSelectNextItemIndicator,
  ScSelectNextItemText,
  ScSelectNextLabel,
  ScSelectNextList,
  ScSelectNextPopup,
  ScSelectNextPortal,
  ScSelectNextTrigger,
  ScSelectNextValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-next-usage-demo',
  imports: [
    ScField,
    ScSelectNext,
    ScSelectNextGroup,
    ScSelectNextIcon,
    ScSelectNextItem,
    ScSelectNextItemIndicator,
    ScSelectNextItemText,
    ScSelectNextLabel,
    ScSelectNextList,
    ScSelectNextPopup,
    ScSelectNextPortal,
    ScSelectNextTrigger,
    ScSelectNextValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div scField class="w-full max-w-48">
      <div scSelectNext [(value)]="theme" [items]="themes">
        <div scSelectNextLabel>Theme</div>
        <div scSelectNextTrigger class="w-full">
          <span scSelectNextValue placeholder="Select a theme"></span>
          <svg scSelectNextIcon siChevronDownIcon></svg>
        </div>
        <ng-template scSelectNextPortal>
          <div scSelectNextPopup>
            <div scSelectNextList>
              <div scSelectNextGroup>
                @for (item of themes; track item.value) {
                  <div scSelectNextItem [value]="item.value">
                    <span scSelectNextItemText>{{ item.label }}</span>
                    <span scSelectNextItemIndicator>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectNextUsageDemo {
  protected readonly themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];
  protected readonly theme = signal('');
}
