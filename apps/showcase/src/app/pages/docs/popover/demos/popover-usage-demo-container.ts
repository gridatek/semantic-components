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
import { PopoverUsageDemo } from './popover-usage-demo';

@Component({
  selector: 'app-popover-usage-demo-container',
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
    PopoverUsageDemo,
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
        <app-popover-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class PopoverUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScPopover,
  ScPopoverDescription,
  ScPopoverHeader,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTitle,
  ScPopoverTrigger,
  ScSelectOnFocus,
} from '@semantic-components/ui';

@Component({
  selector: 'app-popover-usage-demo',
  imports: [
    ScButton,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScPopover,
    ScPopoverDescription,
    ScPopoverHeader,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTitle,
    ScPopoverTrigger,
    ScSelectOnFocus,
  ],
  template: \`
    <div scPopoverProvider align="start">
      <button scButton scPopoverTrigger variant="outline">Open Popover</button>
      <ng-template scPopoverPortal>
        <div scPopover class="w-64">
          <div scPopoverHeader>
            <h2 scPopoverTitle>Dimensions</h2>
            <p scPopoverDescription>Set the dimensions for the layer.</p>
          </div>
          <div scFieldGroup class="gap-4">
            <div scField orientation="horizontal">
              <label scLabel class="w-1/2">Width</label>
              <input
                scInput
                value="100%"
                cdkFocusInitial
                scSelectOnFocus="program"
              />
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
export class PopoverUsageDemo {}`;
}
