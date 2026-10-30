import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSelectNextDemo } from './disabled-select-next-demo';

@Component({
  selector: 'app-disabled-select-next-demo-container',
  imports: [DemoContainer, DisabledSelectNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/select-next/disabled-select-next-demo"
      [code]="code"
    >
      <app-disabled-select-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSelectNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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

/** A disabled select, and a select with a disabled option. */
@Component({
  selector: 'app-disabled-select-next-demo',
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
  template: \`
    <div class="grid w-full max-w-48 gap-6">
      @for (select of selects; track select.label) {
        <div scField>
          <div scSelectNext [disabled]="select.disabled" [items]="fruits">
            <div scSelectNextLabel>{{ select.label }}</div>
            <div scSelectNextTrigger class="w-full">
              <span scSelectNextValue placeholder="Select a fruit"></span>
              <svg scSelectNextIcon siChevronDownIcon></svg>
            </div>
            <ng-template scSelectNextPortal>
              <div scSelectNextPopup>
                <div scSelectNextList>
                  <div scSelectNextGroup>
                    @for (item of fruits; track item.value) {
                      <div
                        scSelectNextItem
                        [value]="item.value"
                        [disabled]="item.disabled"
                      >
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
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSelectNextDemo {
  protected readonly selects = [
    { label: 'Disabled', disabled: true },
    { label: 'Disabled option', disabled: false },
  ];
  protected readonly fruits = [
    { value: 'apple', label: 'Apple', disabled: false },
    { value: 'banana', label: 'Banana', disabled: false },
    { value: 'blueberry', label: 'Blueberry', disabled: false },
    { value: 'grapes', label: 'Grapes', disabled: true },
    { value: 'pineapple', label: 'Pineapple', disabled: false },
  ];
}`;
}
