import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BackgroundEmptyDemo } from './background-empty-demo';

@Component({
  selector: 'app-background-empty-demo-container',
  imports: [DemoContainer, BackgroundEmptyDemo],
  template: `
    <app-demo-container
      title="Background"
      demoUrl="/demos/empty/background-empty-demo"
      [code]="code"
    >
      <app-background-empty-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BackgroundEmptyDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
} from '@semantic-components/ui';
import { SiBellIcon, SiRefreshCcwIcon } from '@semantic-icons/lucide-icons';

/** A muted background behind it. */
@Component({
  selector: 'app-background-empty-demo',
  imports: [
    ScButton,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    SiBellIcon,
    SiRefreshCcwIcon,
  ],
  template: \`
    <div scEmpty class="bg-muted/30 h-full">
      <div scEmptyHeader>
        <div scEmptyMedia variant="icon"><svg siBellIcon></svg></div>
        <h2 scEmptyTitle>No Notifications</h2>
        <div scEmptyDescription>
          You&apos;re all caught up. New notifications will appear here.
        </div>
      </div>
      <div scEmptyBody>
        <button scButton variant="outline">
          <svg siRefreshCcwIcon data-icon="inline-start"></svg>
          Refresh
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BackgroundEmptyDemo {}`;
}
