import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { PreviewCardUsageDemo } from './preview-card-usage-demo';

@Component({
  selector: 'app-preview-card-usage-demo-container',
  imports: [UsageCode, PreviewCardUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-preview-card-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewCardUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScLink,
  ScPreviewCard,
  ScPreviewCardPortal,
  ScPreviewCardProvider,
  ScPreviewCardTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-preview-card-usage-demo',
  imports: [
    ScPreviewCard,
    ScPreviewCardPortal,
    ScPreviewCardProvider,
    ScPreviewCardTrigger,
    ScLink,
  ],
  template: \`
    <div scPreviewCardProvider>
      <a
        scLink
        href="https://nextjs.org"
        scPreviewCardTrigger
        [delay]="10"
        [closeDelay]="100"
      >
        Hover Here
      </a>
      <ng-template scPreviewCardPortal>
        <div scPreviewCard class="flex w-64 flex-col gap-0.5">
          <div class="font-semibold">@nextjs</div>
          <div>The React Framework – created and maintained by @vercel.</div>
          <div class="text-muted-foreground mt-1 text-xs">
            Joined December 2021
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewCardUsageDemo {}`;
}
