import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { EmptyUsageDemo } from './empty-usage-demo';

@Component({
  selector: 'app-empty-usage-demo-container',
  imports: [UsageCode, EmptyUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-empty-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class EmptyUsageDemoContainer {
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
