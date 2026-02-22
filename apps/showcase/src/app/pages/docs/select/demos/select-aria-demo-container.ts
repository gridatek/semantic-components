import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScSelectAriaDemo } from './select-aria-demo';

@Component({
  selector: 'app-select-aria-demo-container',
  imports: [DemoContainer, ScSelectAriaDemo],
  template: `
    <app-demo-container title="Raw Aria Select" [code]="code">
      <app-select-aria-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectAriaDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Combobox, ComboboxInput, ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-select-aria-demo',
  imports: [Combobox, ComboboxInput, ComboboxPopupContainer, Listbox, Option, OverlayModule],
  template: \`
    <div ngCombobox readonly>
      <div #origin class="flex items-center relative border rounded-lg px-3 h-10 cursor-pointer">
        <span class="pointer-events-none">Select a food</span>
        <input
          aria-label="Food dropdown"
          placeholder="Select a food"
          ngComboboxInput
          class="opacity-0 absolute inset-0 cursor-pointer"
        />
      </div>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{origin, usePopover: 'inline', matchWidth: true}"
          [cdkConnectedOverlayOpen]="true"
        >
          <div class="bg-popover text-popover-foreground mt-1 rounded-lg border p-1 shadow-md max-h-44">
            <div ngListbox class="flex flex-col h-full overflow-y-auto">
              @for (item of items; track item) {
                <div
                  ngOption
                  [value]="item"
                  [label]="item"
                  class="cursor-pointer rounded-md px-2 py-1.5 text-sm data-[active=true]:bg-accent aria-selected:bg-accent/50"
                >
                  {{ item }}
                </div>
              }
            </div>
          </div>
        </ng-template>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectAriaDemo {
  items = ['Apple', 'Banana', 'Orange', 'Carrot', 'Broccoli', 'Spinach', 'Tomato', 'Pepper'];
}`;
}
