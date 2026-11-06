import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { DevOnly } from '../../../../components/dev-only/dev-only';
import { ConfigService } from '../../../../services/config-service';
import { SheetUsageDemo } from './sheet-usage-demo';

@Component({
  selector: 'app-sheet-usage-demo-container',
  imports: [
    DevOnly,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    SheetUsageDemo,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>angular-ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="code" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy to clipboard</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="code" language="angular-ts"></pre>
    </div>

    @if (devMode()) {
      <app-dev-only>
        <app-sheet-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class SheetUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
  ScSheet,
  ScSheetClose,
  ScSheetDescription,
  ScSheetFooter,
  ScSheetHeader,
  ScSheetPortal,
  ScSheetProvider,
  ScSheetTitle,
  ScSheetTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sheet-usage-demo',
  imports: [
    ScButton,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScSelectOnFocus,
    ScSheet,
    ScSheetClose,
    ScSheetDescription,
    ScSheetFooter,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetProvider,
    ScSheetTitle,
    ScSheetTrigger,
    SiXIcon,
  ],
  template: \`
    <div scSheetProvider [(open)]="open">
      <button scButton scSheetTrigger variant="outline">Open</button>
      <ng-template scSheetPortal>
        <div scSheet>
          <div scSheetHeader>
            <h2 scSheetTitle>Edit profile</h2>
            <p scSheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </p>
          </div>
          <div scFieldGroup class="px-4">
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
          <div scSheetFooter>
            <button scButton type="submit" (click)="open.set(false)">
              Save changes
            </button>
            <button scSheetClose variant="outline" size="default">Close</button>
          </div>
          <button scSheetClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SheetUsageDemo {
  protected readonly open = signal(false);
}`;
}
