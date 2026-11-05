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
import { TabsUsageDemo } from './tabs-usage-demo';

@Component({
  selector: 'app-tabs-usage-demo-container',
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
    TabsUsageDemo,
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
        <app-tabs-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class TabsUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScTabs,
  ScTabsContent,
  ScTabsList,
  ScTabsPanel,
  ScTabsTab,
} from '@semantic-components/ui';

@Component({
  selector: 'app-tabs-usage-demo',
  imports: [
    ScTabs,
    ScTabsList,
    ScTabsTab,
    ScTabsPanel,
    ScTabsContent,
    ScCard,
    ScCardHeader,
    ScCardTitle,
    ScCardDescription,
    ScCardContent,
  ],
  template: \`
    <div scTabs value="overview" class="w-full max-w-sm">
      <div scTabsList>
        <button scTabsTab value="overview">Overview</button>
        <button scTabsTab value="analytics">Analytics</button>
        <button scTabsTab value="reports">Reports</button>
        <button scTabsTab value="settings">Settings</button>
      </div>
      <div scTabsPanel value="overview">
        <ng-template scTabsContent>
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
      <div scTabsPanel value="analytics">
        <ng-template scTabsContent>
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
      <div scTabsPanel value="reports">
        <ng-template scTabsContent>
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
      <div scTabsPanel value="settings">
        <ng-template scTabsContent>
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
export class TabsUsageDemo {}`;
}
