import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItemIndicator,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuTrigger,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** One of a group on, [(value)]: a click chooses it and the menu stays open. */
@Component({
  selector: 'app-radio-group-menu-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItemIndicator,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuTrigger,
    SiCheckIcon,
  ],
  template: `
    <div scMenuProvider>
      <button scButton scMenuTrigger variant="outline">Open</button>
      <ng-template scMenuPortal>
        <div scMenu class="w-32">
          <ng-template scMenuContent>
            <div scMenuGroup>
              <div scMenuLabel>Panel Position</div>
              <div scMenuRadioGroup [(value)]="position">
                <div scMenuRadioItem value="top">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Top
                </div>
                <div scMenuRadioItem value="bottom">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Bottom
                </div>
                <div scMenuRadioItem value="right">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Right
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RadioGroupMenuDemo {
  protected readonly position = signal('bottom');
}
