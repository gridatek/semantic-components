import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  inject,
  viewChild,
} from '@angular/core';

import {
  ScButton,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldset,
  ScInput,
  ScLabel,
  ScSheet,
  ScSheetClose,
  ScSheetConfig,
  ScSheetManager,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sheet-demo',
  imports: [
    ScButton,
    ScSheet,
    ScCardHeader,
    ScCardFooter,
    ScFieldset,
    ScField,
    ScInput,
    ScLabel,
    ScCardTitle,
    ScCardDescription,
    ScSheetClose,
    SiXIcon,
  ],
  template: `
    <div class="flex items-center justify-center">
      <button (click)="openSheet()" sc-button variant="outline">Open</button>
    </div>

    <ng-template #sheet>
      <div sc-sheet>
        <button sc-sheet-close>
          <svg class="size-4" si-x-icon></svg>
          <span class="sr-only">Close</span>
        </button>

        <div sc-card-header>
          <h2 sc-card-title>Edit profile</h2>
          <p sc-card-description>Make changes to your profile here. Click save when you're done.</p>
        </div>
        <div class="py-4">
          <fieldset sc-fieldset>
            <div sc-field controlId="profile-name" orientation="horizontal-right">
              <label sc-label>Name</label>
              <input sc-input value="Pedro Duarte" data-slot="control" />
            </div>
            <div sc-field controlId="profile-username" orientation="horizontal-right">
              <label sc-label>Username</label>
              <input sc-input value="@peduarte" data-slot="control" />
            </div>
          </fieldset>
        </div>
        <div sc-card-footer>
          <button sc-button type="submit">Save changes</button>
        </div>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetDemo {
  private readonly scSheetManager = inject(ScSheetManager);

  private readonly sheetRef = viewChild.required<TemplateRef<unknown>>('sheet');

  openSheet() {
    const config = new ScSheetConfig();
    config.side = 'right';
    config.width = '300';

    this.scSheetManager.open(this.sheetRef(), config);
  }
}
