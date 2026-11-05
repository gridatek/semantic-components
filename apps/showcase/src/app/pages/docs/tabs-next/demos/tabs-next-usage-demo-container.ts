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
import { TabsNextUsageDemo } from './tabs-next-usage-demo';

@Component({
  selector: 'app-tabs-next-usage-demo-container',
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
    TabsNextUsageDemo,
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
        <app-tabs-next-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class TabsNextUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScTabsNext,
  ScTabsNextContent,
  ScTabsNextList,
  ScTabsNextPanel,
  ScTabsNextTab,
} from '@semantic-components/ui';

@Component({
  selector: 'app-tabs-next-usage-demo',
  imports: [
    ScTabsNext,
    ScTabsNextList,
    ScTabsNextTab,
    ScTabsNextPanel,
    ScTabsNextContent,
    ScCard,
    ScCardHeader,
    ScCardTitle,
    ScCardDescription,
    ScCardContent,
  ],
  template: \`
    <div scTabsNext value="overview" class="w-full max-w-sm">
      <div scTabsNextList>
        <button scTabsNextTab value="overview">Overview</button>
        <button scTabsNextTab value="analytics">Analytics</button>
        <button scTabsNextTab value="reports">Reports</button>
        <button scTabsNextTab value="settings">Settings</button>
      </div>
      <div scTabsNextPanel value="overview">
        <ng-template scTabsNextContent>
          <div scCard>
            <div scCardHeader>
              <div scCardTitle>Overview</div>
              <p scCardDescription>
                View your key metrics and recent project activity. Track
                progress across all your active projects.
              </p>
            </div>
            <div scCardContent class="text-muted-foreground text-sm">
              You have 12 active projects and 3 pending tasks.
            </div>
          </div>
        </ng-template>
      </div>
      <div scTabsNextPanel value="analytics">
        <ng-template scTabsNextContent>
          <div scCard>
            <div scCardHeader>
              <div scCardTitle>Analytics</div>
              <p scCardDescription>
                Track performance and user engagement metrics. Monitor trends
                and identify growth opportunities.
              </p>
            </div>
            <div scCardContent class="text-muted-foreground text-sm">
              Page views are up 25% compared to last month.
            </div>
          </div>
        </ng-template>
      </div>
      <div scTabsNextPanel value="reports">
        <ng-template scTabsNextContent>
          <div scCard>
            <div scCardHeader>
              <div scCardTitle>Reports</div>
              <p scCardDescription>
                Generate and download your detailed reports. Export data in
                multiple formats for analysis.
              </p>
            </div>
            <div scCardContent class="text-muted-foreground text-sm">
              You have 5 reports ready and available to export.
            </div>
          </div>
        </ng-template>
      </div>
      <div scTabsNextPanel value="settings">
        <ng-template scTabsNextContent>
          <div scCard>
            <div scCardHeader>
              <div scCardTitle>Settings</div>
              <p scCardDescription>
                Manage your account preferences and options. Customize your
                experience to fit your needs.
              </p>
            </div>
            <div scCardContent class="text-muted-foreground text-sm">
              Configure notifications, security, and themes.
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TabsNextUsageDemo {}`;
}
