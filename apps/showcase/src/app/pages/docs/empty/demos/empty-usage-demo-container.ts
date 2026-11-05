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
import { EmptyUsageDemo } from './empty-usage-demo';

@Component({
  selector: 'app-empty-usage-demo-container',
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
    EmptyUsageDemo,
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
        <app-empty-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class EmptyUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
  ScLink,
} from '@semantic-components/ui';
import {
  SiArrowUpRightIcon,
  SiFolderCodeIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-empty-usage-demo',
  imports: [
    ScButton,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScLink,
    SiFolderCodeIcon,
    SiArrowUpRightIcon,
  ],
  template: \`
    <div scEmpty>
      <div scEmptyHeader>
        <div scEmptyMedia variant="icon"><svg siFolderCodeIcon></svg></div>
        <h2 scEmptyTitle>No Projects Yet</h2>
        <div scEmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </div>
      </div>
      <div scEmptyBody>
        <div class="flex justify-center gap-2">
          <button scButton>Create Project</button>
          <button scButton variant="outline">Import Project</button>
        </div>
      </div>
      <a
        scLink
        variant="link"
        size="sm"
        href="#usage"
        class="text-muted-foreground"
      >
        Learn More <svg siArrowUpRightIcon></svg>
      </a>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EmptyUsageDemo {}`;
}
