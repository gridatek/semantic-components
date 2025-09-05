import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogContent,
  ScDialogHeader,
  ScDialogTitle,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

export interface AttributeData {
  name: string | null | undefined;
  value: string | null | undefined;
}

@Component({
  selector: 'sc-add-cell-attribute-dialog',
  imports: [
    ReactiveFormsModule,
    ScDialog,
    ScDialogContent,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogClose,
    ScInput,
    ScLabel,
    ScButton,
    SiXIcon,
  ],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80" sc-dialog>
      <div class="mx-auto my-8 max-w-md" sc-dialog-content>
        <div sc-dialog-header>
          <h2 sc-dialog-title>Add cell attribute</h2>
          <button sc-dialog-close type="button">
            <svg class="h-4 w-4" si-x-icon></svg>
            <span class="sr-only">Close</span>
          </button>
        </div>

        <form class="space-y-4" [formGroup]="attributeForm">
          <div class="space-y-2">
            <label sc-label for="attribute-name">Attribute name</label>
            <input
              id="attribute-name"
              sc-input
              type="text"
              formControlName="name"
              placeholder="eg. backgroundColor"
            />
          </div>

          <div class="space-y-2">
            <label sc-label for="attribute-value">Attribute value</label>
            <input
              id="attribute-value"
              sc-input
              type="text"
              formControlName="value"
              placeholder="#E1EFFE;"
            />
          </div>

          <button
            class="w-full"
            (click)="
              dialogRef.close({
                name: name?.value,
                value: value?.value,
              })
            "
            sc-button
            type="submit"
          >
            Set attribute
          </button>
        </form>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAddCellAttributeDialog {
  dialogRef = inject<DialogRef<AttributeData>>(DialogRef<AttributeData>);

  attributeForm = new FormGroup({
    name: new FormControl('backgroundColor', Validators.required),
    value: new FormControl('#E1EFFE;'),
  });

  get name() {
    return this.attributeForm.get('name');
  }

  get value() {
    return this.attributeForm.get('value');
  }
}
