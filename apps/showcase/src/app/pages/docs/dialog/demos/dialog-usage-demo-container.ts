import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { DialogUsageDemo } from './dialog-usage-demo';

@Component({
  selector: 'app-dialog-usage-demo-container',
  imports: [UsageCode, DialogUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-dialog-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DialogUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  ScSelectOnFocus,
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
    ScSelectOnFocus,
    SiXIcon,
  ],
  template: \`
    <div scDialogProvider [(open)]="open">
      <button scButton variant="outline" scDialogTrigger>Open Dialog</button>
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-sm">
          <button scDialogClose>
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
              <input
                cdkFocusInitial
                scSelectOnFocus="program"
                scInput
                value="Pedro Duarte"
              />
            </div>
            <div scField>
              <label scLabel>Username</label>
              <input scInput value="@peduarte" />
            </div>
          </div>
          <div scDialogFooter>
            <button scDialogClose variant="outline" size="default">
              Cancel
            </button>
            <button scButton (click)="save()">Save changes</button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
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
}`;
}
