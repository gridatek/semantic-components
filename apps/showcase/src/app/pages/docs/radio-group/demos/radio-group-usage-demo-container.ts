import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockFooter,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiCopyIcon,
} from '@semantic-icons/lucide-icons';
import { DevOnly } from '../../../../components/dev-only/dev-only';
import { ConfigService } from '../../../../services/config-service';
import { RadioGroupUsageDemo } from './radio-group-usage-demo';

@Component({
  selector: 'app-radio-group-usage-demo-container',
  imports: [
    DevOnly,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    ScCodeBlockFooter,
    ScButton,
    SiCheckIcon,
    SiChevronDownIcon,
    SiCopyIcon,
    RadioGroupUsageDemo,
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
      <pre
        scCodeBlockContent
        id="radio-group-usage-demo-code"
        [code]="code"
        language="angular-ts"
        [class]="expanded() ? '' : 'scroll-fade-y max-h-64 overflow-y-hidden'"
      ></pre>
      <div scCodeBlockFooter class="justify-center">
        <button
          scButton
          variant="ghost"
          size="xs"
          aria-controls="radio-group-usage-demo-code"
          [attr.aria-expanded]="expanded()"
          (click)="expanded.set(!expanded())"
        >
          <svg
            siChevronDownIcon
            class="transition-transform in-aria-expanded:rotate-180"
          ></svg>
          {{ expanded() ? 'Show less' : 'Show more' }}
        </button>
      </div>
    </div>

    @if (devMode()) {
      <app-dev-only>
        <app-radio-group-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RadioGroupUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;
  /** The whole code, or its first lines. */
  protected readonly expanded = signal(false);

  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScRadio, ScRadioField, ScRadioGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-radio-group-usage-demo',
  imports: [FormField, ScRadio, ScRadioField, ScRadioGroup],
  template: \`
    <div scRadioGroup aria-label="Spacing" class="w-fit">
      <label scRadioField>
        <input
          type="radio"
          scRadio
          value="default"
          [formField]="spacingForm.spacing"
        />
        Default
      </label>
      <label scRadioField>
        <input
          type="radio"
          scRadio
          value="comfortable"
          [formField]="spacingForm.spacing"
        />
        Comfortable
      </label>
      <label scRadioField>
        <input
          type="radio"
          scRadio
          value="compact"
          [formField]="spacingForm.spacing"
        />
        Compact
      </label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RadioGroupUsageDemo {
  protected readonly spacingForm = form(signal({ spacing: 'comfortable' }));
}`;
}
