import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DestructiveAlertDialogDemo } from './destructive-alert-dialog-demo';

@Component({
  selector: 'app-destructive-alert-dialog-demo-container',
  imports: [DemoContainer, DestructiveAlertDialogDemo],
  template: `
    <app-demo-container
      title="Destructive"
      demoUrl="/demos/alert-dialog/destructive-alert-dialog-demo"
      [code]="code"
    >
      <app-destructive-alert-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveAlertDialogDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlertDialog,
  ScAlertDialogAction,
  ScAlertDialogCancel,
  ScAlertDialogDescription,
  ScAlertDialogFooter,
  ScAlertDialogHeader,
  ScAlertDialogMedia,
  ScAlertDialogPortal,
  ScAlertDialogProvider,
  ScAlertDialogTitle,
  ScAlertDialogTrigger,
  ScButton,
} from '@semantic-components/ui';
import { SiTrash2Icon } from '@semantic-icons/lucide-icons';

/** A destructive action: its button and media in the destructive color. */
@Component({
  selector: 'app-destructive-alert-dialog-demo',
  imports: [
    ScAlertDialog,
    ScAlertDialogAction,
    ScAlertDialogCancel,
    ScAlertDialogDescription,
    ScAlertDialogFooter,
    ScAlertDialogHeader,
    ScAlertDialogMedia,
    ScAlertDialogPortal,
    ScAlertDialogProvider,
    ScAlertDialogTitle,
    ScAlertDialogTrigger,
    ScButton,
    SiTrash2Icon,
  ],
  template: \`
    <div scAlertDialogProvider>
      <button scButton scAlertDialogTrigger variant="destructive">
        Delete Chat
      </button>
      <ng-template scAlertDialogPortal>
        <div scAlertDialog size="sm">
          <div scAlertDialogHeader>
            <div
              scAlertDialogMedia
              class="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"
            >
              <svg siTrash2Icon></svg>
            </div>
            <h2 scAlertDialogTitle>Delete chat?</h2>
            <p scAlertDialogDescription>
              This will permanently delete this chat conversation. Memories
              saved during this chat stay until you delete them in Settings.
            </p>
          </div>
          <div scAlertDialogFooter>
            <button scAlertDialogCancel>Cancel</button>
            <button scAlertDialogAction variant="destructive">Delete</button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveAlertDialogDemo {}`;
}
