import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { TabsUsageDemo } from './tabs-usage-demo';

@Component({
  selector: 'app-tabs-usage-demo-container',
  imports: [UsageCode, TabsUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-tabs-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TabsUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
} from '@semantic-components/ui';

@Component({
  selector: 'app-tabs-usage-demo',
  imports: [
    ScTabs,
    ScTabsList,
    ScTabsTab,
    ScTabsPanel,
    ScTabsPanelContent,
    ScCard,
    ScCardHeader,
    ScCardTitle,
    ScCardDescription,
    ScCardBody,
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
        <ng-template scTabsPanelContent>
          <div scCard>
            <div scCardHeader>
              <div scCardTitle>Overview</div>
              <p scCardDescription>
                View your key metrics and recent project activity. Track
                progress across all your active projects.
              </p>
            </div>
            <div scCardBody class="text-muted-foreground text-sm">
              You have 12 active projects and 3 pending tasks.
            </div>
          </div>
        </ng-template>
      </div>
      <div scTabsPanel value="analytics">
        <ng-template scTabsPanelContent>
          <div scCard>
            <div scCardHeader>
              <div scCardTitle>Analytics</div>
              <p scCardDescription>
                Track performance and user engagement metrics. Monitor trends
                and identify growth opportunities.
              </p>
            </div>
            <div scCardBody class="text-muted-foreground text-sm">
              Page views are up 25% compared to last month.
            </div>
          </div>
        </ng-template>
      </div>
      <div scTabsPanel value="reports">
        <ng-template scTabsPanelContent>
          <div scCard>
            <div scCardHeader>
              <div scCardTitle>Reports</div>
              <p scCardDescription>
                Generate and download your detailed reports. Export data in
                multiple formats for analysis.
              </p>
            </div>
            <div scCardBody class="text-muted-foreground text-sm">
              You have 5 reports ready and available to export.
            </div>
          </div>
        </ng-template>
      </div>
      <div scTabsPanel value="settings">
        <ng-template scTabsPanelContent>
          <div scCard>
            <div scCardHeader>
              <div scCardTitle>Settings</div>
              <p scCardDescription>
                Manage your account preferences and options. Customize your
                experience to fit your needs.
              </p>
            </div>
            <div scCardBody class="text-muted-foreground text-sm">
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
