import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RightHoverCardDemo } from './right-hover-card-demo';

@Component({
  selector: 'app-right-hover-card-demo-container',
  imports: [DemoContainer, RightHoverCardDemo],
  template: `
    <app-demo-container
      title="Right Side"
      demoUrl="/demos/hover-card/right-hover-card-demo"
      [code]="code"
    >
      <app-right-hover-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightHoverCardDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScHoverCardProvider,
  ScHoverCardPortal,
  ScHoverCard,
  ScHoverCardTrigger,
} from '@semantic-components/ui';
import { SiInfoIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-right-hover-card-demo',
  imports: [
    ScHoverCardProvider,
    ScHoverCardPortal,
    ScHoverCard,
    ScHoverCardTrigger,
    SiInfoIcon,
  ],
  template: \`
    <div scHoverCardProvider side="right">
      <button
        scHoverCardTrigger
        class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <svg siInfoIcon class="size-4"></svg>
        More Info
      </button>
      <ng-template scHoverCardPortal>
        <div scHoverCard>
          <div class="space-y-2">
            <h4 class="text-sm font-semibold">Information</h4>
            <p class="text-sm text-muted-foreground">
              Hover cards display supplementary information when hovering over a
              trigger element. They're useful for showing previews or additional
              context.
            </p>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightHoverCardDemo {}`;
}
