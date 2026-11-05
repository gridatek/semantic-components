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
import { KbdUsageDemo } from './kbd-usage-demo';

@Component({
  selector: 'app-kbd-usage-demo-container',
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
    KbdUsageDemo,
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
        <app-kbd-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class KbdUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScKbdGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-kbd-usage-demo',
  imports: [ScKbd, ScKbdGroup],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <kbd scKbdGroup>
        <kbd scKbd>⌘<span class="sr-only"> Command</span></kbd>
        <kbd scKbd>⇧<span class="sr-only"> Shift</span></kbd>
        <kbd scKbd>⌥<span class="sr-only"> Option</span></kbd>
        <kbd scKbd>⌃<span class="sr-only"> Control</span></kbd>
      </kbd>
      <kbd scKbdGroup>
        <kbd scKbd>Ctrl</kbd>
        <span>+</span>
        <kbd scKbd>B</kbd>
      </kbd>
      <kbd scKbdGroup>
        <kbd scKbd>←<span class="sr-only"> Left</span></kbd>
        <kbd scKbd>↑<span class="sr-only"> Up</span></kbd>
        <kbd scKbd>↓<span class="sr-only"> Down</span></kbd>
        <kbd scKbd>→<span class="sr-only"> Right</span></kbd>
      </kbd>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class KbdUsageDemo {}`;
}
