import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScMenuNext,
  ScMenuNextContent,
  ScMenuNextGroup,
  ScMenuNextItemIndicator,
  ScMenuNextLabel,
  ScMenuNextPortal,
  ScMenuNextProvider,
  ScMenuNextRadioGroup,
  ScMenuNextRadioItem,
  ScMenuNextTrigger,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** One of a group on, [(value)]: a click chooses it and the menu stays open. */
@Component({
  selector: 'app-radio-group-menu-next-demo',
  imports: [
    ScButton,
    ScMenuNext,
    ScMenuNextContent,
    ScMenuNextGroup,
    ScMenuNextItemIndicator,
    ScMenuNextLabel,
    ScMenuNextPortal,
    ScMenuNextProvider,
    ScMenuNextRadioGroup,
    ScMenuNextRadioItem,
    ScMenuNextTrigger,
    SiCheckIcon,
  ],
  template: `
    <div scMenuNextProvider>
      <button scButton scMenuNextTrigger variant="outline">Open</button>
      <ng-template scMenuNextPortal>
        <div scMenuNext class="w-32">
          <ng-template scMenuNextContent>
            <div scMenuNextGroup>
              <div scMenuNextLabel>Panel Position</div>
              <div scMenuNextRadioGroup [(value)]="position">
                <div scMenuNextRadioItem value="top">
                  <span scMenuNextItemIndicator><svg siCheckIcon></svg></span>
                  Top
                </div>
                <div scMenuNextRadioItem value="bottom">
                  <span scMenuNextItemIndicator><svg siCheckIcon></svg></span>
                  Bottom
                </div>
                <div scMenuNextRadioItem value="right">
                  <span scMenuNextItemIndicator><svg siCheckIcon></svg></span>
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
export class RadioGroupMenuNextDemo {
  protected readonly position = signal('bottom');
}
