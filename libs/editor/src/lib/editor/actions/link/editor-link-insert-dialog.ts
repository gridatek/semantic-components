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

export interface LinkData {
  url: string | null | undefined;
}

@Component({
  selector: 'sc-editor-link-insert-dialog',
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
          <h2 sc-dialog-title>Insert Link</h2>
          <button sc-dialog-close type="button">
            <svg class="h-4 w-4" si-x-icon></svg>
            <span class="sr-only">Close</span>
          </button>
        </div>

        <form class="space-y-4" [formGroup]="linkForm">
          <div class="space-y-2">
            <label sc-label for="link-url">URL</label>
            <input
              id="link-url"
              sc-input
              type="url"
              name="url"
              formControlName="url"
              placeholder="https://example.com"
            />
          </div>

          <button class="w-full" (click)="dialogRef.close(getLinkInfo())" sc-button type="submit">
            Add link
          </button>
        </form>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorLinkInsertDialog {
  dialogRef = inject<DialogRef<LinkData>>(DialogRef<LinkData>);

  linkForm = new FormGroup({
    url: new FormControl('https://flowbite.com', Validators.required),
  });

  get url() {
    return this.linkForm.get('url');
  }

  getLinkInfo() {
    return {
      url: this.url?.value,
    };
  }
}
