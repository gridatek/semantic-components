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
import { ProgressUsageDemo } from './progress-usage-demo';

@Component({
  selector: 'app-progress-usage-demo-container',
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
    ProgressUsageDemo,
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
        <app-progress-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ProgressUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import {
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
} from '@semantic-components/ui';

@Component({
  selector: 'app-progress-usage-demo',
  imports: [ScProgress, ScProgressRange, ScProgressTrack],
  template: \`
    <div scProgress [value]="value()" aria-label="Loading" class="w-[60%]">
      <div scProgressTrack><div scProgressRange></div></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ProgressUsageDemo {
  protected readonly value = signal(13);

  constructor() {
    // A moment after it appears: further along.
    let timer: ReturnType<typeof setTimeout> | undefined;
    afterNextRender(() => {
      timer = setTimeout(() => this.value.set(66), 500);
    });
    inject(DestroyRef).onDestroy(() => clearTimeout(timer));
  }
}`;
}
