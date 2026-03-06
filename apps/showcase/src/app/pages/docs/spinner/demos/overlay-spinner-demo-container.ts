import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OverlaySpinnerDemo } from './overlay-spinner-demo';

@Component({
  selector: 'app-overlay-spinner-demo-container',
  imports: [DemoContainer, OverlaySpinnerDemo],
  template: `
    <app-demo-container
      title="Loading Overlay"
      demoUrl="/demos/spinner/overlay-spinner-demo"
      [code]="code"
    >
      <app-overlay-spinner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlaySpinnerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-overlay-spinner-demo',
  imports: [ScSpinner, SiLoaderCircleIcon],
  template: \`
    <div
      class="bg-muted/50 relative flex h-64 w-96 items-center justify-center rounded-lg border"
    >
      <div class="flex flex-col items-center">
        <svg scSpinner siLoaderCircleIcon class="text-primary size-8"></svg>
        <p class="text-muted-foreground mt-2 text-sm">Loading content...</p>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlaySpinnerDemo {}`;
}
