import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-dialog-usage-demo',
  imports: [
    ScButton,
    ScDialogProvider,
    ScDialogTrigger,
    ScDialogPortal,
    ScDialog,
    ScDialogClose,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogDescription,
    ScDialogFooter,
    ScFieldGroup,
    ScField,
    ScLabel,
    ScInput,
    SiXIcon,
  ],
  template: `
    <div scDialogProvider [(open)]="open">
      <button scButton variant="outline" scDialogTrigger>Open Dialog</button>
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-sm">
          <button scButton variant="ghost" size="icon-sm" scDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <h2 scDialogTitle>Edit profile</h2>
            <p scDialogDescription>
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <div scFieldGroup>
            <div scField>
              <label scLabel>Name</label>
              <input scInput value="Pedro Duarte" />
            </div>
            <div scField>
              <label scLabel>Username</label>
              <input scInput value="@peduarte" />
            </div>
          </div>
          <div scDialogFooter>
            <button scButton variant="outline" scDialogClose>Cancel</button>
            <button scButton (click)="save()">Save changes</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DialogUsageDemo {
  protected readonly open = signal(false);

  /** Save: your code runs first; the dialog closes when it's done. */
  protected save(): void {
    // Send the changes, check them…
    this.open.set(false);
  }
}
