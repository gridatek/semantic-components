import { Combobox, ComboboxInput, ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-demo',
  imports: [
    SiChevronDownIcon,
    SiCheckIcon,
    Combobox,
    ComboboxInput,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
  ],
  template: `
    <div class="group/select block relative w-full" #combobox="ngCombobox" ngCombobox readonly>
      <div
        class="group/trigger border-input focus-within:border-ring focus-within:ring-ring/50 flex h-9 w-full items-center relative rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]"
        #origin
      >
        <input
          class="h-full w-full bg-transparent pl-3 pr-10 outline-none cursor-pointer caret-transparent"
          (click)="debugExpanded($event.target)"
          ngComboboxInput
          readonly
          placeholder="Select a fruit"
        />
        <svg
          class="absolute right-3 size-4 opacity-50 text-muted-foreground transition-transform duration-150 pointer-events-none group-aria-expanded/trigger:rotate-180"
          si-chevron-down-icon
        ></svg>
      </div>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlayOrigin]="origin"
          [cdkConnectedOverlayOpen]="true"
          [cdkConnectedOverlayWidth]="origin.offsetWidth"
          cdkConnectedOverlay
        >
          <div
            class="bg-popover text-popover-foreground relative z-50 min-w-[8rem] rounded-md border shadow-md p-1 flex flex-col gap-0.5 transition-[max-height,opacity,visibility] duration-150 overflow-hidden max-h-0 opacity-0 invisible ease-in group-data-[expanded=true]/select:overflow-y-auto group-data-[expanded=true]/select:max-h-60 group-data-[expanded=true]/select:opacity-100 group-data-[expanded=true]/select:visible group-data-[expanded=true]/select:ease-out"
            ngListbox
          >
            @for (fruit of fruits; track fruit) {
              <div
                class="relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[active]:bg-accent data-[active]:text-accent-foreground"
                [value]="fruit"
                [label]="fruit"
                ngOption
              >
                <span>{{ fruit }}</span>
              </div>
            }
          </div>
        </ng-template>
      </ng-template>
    </div>
  `,
  host: {
    class: 'block w-[180px]',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemo {
  fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];

  debugExpanded(el: EventTarget | null) {
    if (!(el instanceof HTMLInputElement)) return;
    console.log('=== INPUT TRIGGER ===');
    console.log('aria-expanded:', el.getAttribute('aria-expanded'));
    setTimeout(() => {
      console.log('aria-expanded (after):', el.getAttribute('aria-expanded'));
    }, 100);
  }
}
