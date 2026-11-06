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
import { PopoverNextUsageDemo } from './popover-next-usage-demo';

@Component({
  selector: 'app-popover-next-usage-demo-container',
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
    PopoverNextUsageDemo,
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
        <app-popover-next-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class PopoverNextUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScPopoverNext,
  ScPopoverNextDescription,
  ScPopoverNextHeader,
  ScPopoverNextPortal,
  ScPopoverNextProvider,
  ScPopoverNextTitle,
  ScPopoverNextTrigger,
  ScSelectOnFocus,
} from '@semantic-components/ui';

@Component({
  selector: 'app-popover-next-usage-demo',
  imports: [
    ScButton,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScPopoverNext,
    ScPopoverNextDescription,
    ScPopoverNextHeader,
    ScPopoverNextPortal,
    ScPopoverNextProvider,
    ScPopoverNextTitle,
    ScPopoverNextTrigger,
    ScSelectOnFocus,
  ],
  template: \`
    <div scPopoverNextProvider align="start">
      <button scButton scPopoverNextTrigger variant="outline">
        Open Popover
      </button>
      <ng-template scPopoverNextPortal>
        <div scPopoverNext class="w-64">
          <div scPopoverNextHeader>
            <h2 scPopoverNextTitle>Dimensions</h2>
            <p scPopoverNextDescription>Set the dimensions for the layer.</p>
          </div>
          <div scFieldGroup class="gap-4">
            <div scField orientation="horizontal">
              <label scLabel class="w-1/2">Width</label>
              <input scInput value="100%" scSelectOnFocus="program" />
            </div>
            <div scField orientation="horizontal">
              <label scLabel class="w-1/2">Height</label>
              <input scInput value="25px" />
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PopoverNextUsageDemo {}`;
}
