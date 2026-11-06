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
import { DrawerNextUsageDemo } from './drawer-next-usage-demo';

@Component({
  selector: 'app-drawer-next-usage-demo-container',
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
    DrawerNextUsageDemo,
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
        <app-drawer-next-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class DrawerNextUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScDrawerNext,
  ScDrawerNextClose,
  ScDrawerNextDescription,
  ScDrawerNextFooter,
  ScDrawerNextHandle,
  ScDrawerNextHeader,
  ScDrawerNextPortal,
  ScDrawerNextProvider,
  ScDrawerNextTitle,
  ScDrawerNextTrigger,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
} from '@semantic-components/ui';

@Component({
  selector: 'app-drawer-next-usage-demo',
  imports: [
    ScButton,
    ScDrawerNext,
    ScDrawerNextClose,
    ScDrawerNextDescription,
    ScDrawerNextFooter,
    ScDrawerNextHandle,
    ScDrawerNextHeader,
    ScDrawerNextPortal,
    ScDrawerNextProvider,
    ScDrawerNextTitle,
    ScDrawerNextTrigger,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScSelectOnFocus,
  ],
  template: \`
    <div scDrawerNextProvider [(open)]="open">
      <button scButton scDrawerNextTrigger variant="outline">
        Edit profile
      </button>
      <ng-template scDrawerNextPortal>
        <div scDrawerNext>
          <div scDrawerNextHandle></div>
          <div scDrawerNextHeader>
            <h2 scDrawerNextTitle>Edit profile</h2>
            <p scDrawerNextDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </p>
          </div>
          <div scFieldGroup class="p-4">
            <div scField>
              <label scLabel>Email</label>
              <input
                cdkFocusInitial
                scSelectOnFocus="program"
                scInput
                value="shadcn@example.com"
              />
            </div>
            <div scField>
              <label scLabel>Username</label>
              <input scInput value="@shadcn" />
            </div>
          </div>
          <div scDrawerNextFooter>
            <button scButton (click)="open.set(false)">Save changes</button>
            <button scDrawerNextClose>Cancel</button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DrawerNextUsageDemo {
  protected readonly open = signal(false);
}`;
}
