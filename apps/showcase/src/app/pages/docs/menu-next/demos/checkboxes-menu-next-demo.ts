import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScMenuNext,
  ScMenuNextCheckboxItem,
  ScMenuNextContent,
  ScMenuNextGroup,
  ScMenuNextItemIndicator,
  ScMenuNextLabel,
  ScMenuNextPortal,
  ScMenuNextProvider,
  ScMenuNextTrigger,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** Items that are on or off, [(checked)]: a click toggles one and the menu stays open. */
@Component({
  selector: 'app-checkboxes-menu-next-demo',
  imports: [
    ScButton,
    ScMenuNext,
    ScMenuNextCheckboxItem,
    ScMenuNextContent,
    ScMenuNextGroup,
    ScMenuNextItemIndicator,
    ScMenuNextLabel,
    ScMenuNextPortal,
    ScMenuNextProvider,
    ScMenuNextTrigger,
    SiCheckIcon,
  ],
  template: `
    <div scMenuNextProvider>
      <button scButton scMenuNextTrigger variant="outline">Open</button>
      <ng-template scMenuNextPortal>
        <div scMenuNext class="w-40">
          <ng-template scMenuNextContent>
            <div scMenuNextGroup>
              <div scMenuNextLabel>Appearance</div>
              <div scMenuNextCheckboxItem [(checked)]="statusBar">
                <span scMenuNextItemIndicator><svg siCheckIcon></svg></span>
                Status Bar
              </div>
              <div
                scMenuNextCheckboxItem
                [(checked)]="activityBar"
                [disabled]="true"
              >
                <span scMenuNextItemIndicator><svg siCheckIcon></svg></span>
                Activity Bar
              </div>
              <div scMenuNextCheckboxItem [(checked)]="panel">
                <span scMenuNextItemIndicator><svg siCheckIcon></svg></span>
                Panel
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
export class CheckboxesMenuNextDemo {
  protected readonly statusBar = signal(true);
  protected readonly activityBar = signal(false);
  protected readonly panel = signal(false);
}
