import { Component, ViewEncapsulation } from '@angular/core';
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
  template: `
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TabsNextUsageDemo {}
