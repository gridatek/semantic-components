import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { NativeDialogUsageDemo } from './native-dialog-usage-demo';

@Component({
  selector: 'app-native-dialog-usage-demo-container',
  imports: [UsageCode, NativeDialogUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-native-dialog-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NativeDialogUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScNativeDialog,
  ScNativeDialogClose,
  ScNativeDialogDescription,
  ScNativeDialogFooter,
  ScNativeDialogHeader,
  ScNativeDialogPortal,
  ScNativeDialogProvider,
  ScNativeDialogTitle,
  ScNativeDialogTrigger,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-native-dialog-usage-demo',
  imports: [
    ScButton,
    ScNativeDialogProvider,
    ScNativeDialogTrigger,
    ScNativeDialogPortal,
    ScNativeDialog,
    ScNativeDialogClose,
    ScNativeDialogHeader,
    ScNativeDialogTitle,
    ScNativeDialogDescription,
    ScNativeDialogFooter,
    ScFieldGroup,
    ScField,
    ScLabel,
    ScInput,
    ScSelectOnFocus,
    SiXIcon,
  ],
  template: \`
    <div scNativeDialogProvider [(open)]="open">
      <button scButton variant="outline" scNativeDialogTrigger>Open Dialog</button>
      <ng-template scNativeDialogPortal>
        <dialog scNativeDialog class="sm:max-w-sm">
          <button scNativeDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scNativeDialogHeader>
            <h2 scNativeDialogTitle>Edit profile</h2>
            <p scNativeDialogDescription>
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <div scFieldGroup>
            <div scField>
              <label scLabel>Name</label>
              <input
                autofocus
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
          <div scNativeDialogFooter>
            <button scNativeDialogClose variant="outline" size="default">
              Cancel
            </button>
            <button scButton (click)="save()">Save changes</button>
          </div>
        </dialog>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NativeDialogUsageDemo {
  private readonly open = signal(false);

  /** Save: your code runs first; the dialog closes when it's done. */
  private save(): void {
    // Send the changes, check them…
    this.open.set(false);
  }
}`;
}
