import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScDialogDemo } from './dialog-demo';

@Component({
  selector: 'app-dialog-demo-container',
  imports: [DemoContainer, ScDialogDemo],
  template: `
    <app-demo-container title="Dialog" [code]="code">
      <app-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDialogDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScDialogProvider,
  ScDialogClose,
  ScDialog,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogTitle,
  ScDialogTrigger,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-dialog-demo',
  imports: [
    ScButton,
    ScDialogProvider,
    ScDialogClose,
    ScDialog,
    ScDialogDescription,
    ScDialogFooter,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogTitle,
    ScDialogTrigger,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    SiXIcon,
  ],
  template: \`
    <div sc-dialog-provider [(open)]="isOpen">
      <button sc-dialog-trigger sc-button variant="outline">Open Dialog</button>
      <ng-template scDialogPortal>
        <form>
          <div sc-dialog class="sm:max-w-sm">
            <button sc-dialog-close>
              <svg si-x-icon></svg>
              <span class="sr-only">Close</span>
            </button>
            <div sc-dialog-header>
              <h2 sc-dialog-title>Edit profile</h2>
              <p sc-dialog-description>
                Make changes to your profile here. Click save when you're
                done.
              </p>
            </div>
            <div sc-field-group>
              <div sc-field orientation="horizontal">
                <label sc-label>Name</label>
                <input cdkFocusInitial sc-input value="Pedro Duarte" />
              </div>
              <div sc-field orientation="horizontal">
                <label sc-label>Username</label>
                <input sc-input value="@peduarte" />
              </div>
            </div>
            <div sc-dialog-footer>
              <button sc-button variant="outline" (click)="isOpen.set(false)">
                Cancel
              </button>
              <button sc-button type="submit">Save changes</button>
            </div>
          </div>
        </form>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDialogDemo {
  readonly isOpen = signal(false);
}`;
}
