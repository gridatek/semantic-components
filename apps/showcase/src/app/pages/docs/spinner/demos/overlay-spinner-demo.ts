import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSpinner } from '@semantic-components/ui-lab';
import { SiLoader2Icon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-overlay-spinner-demo',
  imports: [ScSpinner, SiLoader2Icon],
  template: `
    <div
      class="relative h-32 rounded-lg border bg-muted/50 flex items-center justify-center"
    >
      <div class="text-center">
        <svg sc-spinner si-loader-2-icon class="size-8 text-primary"></svg>
        <p class="mt-2 text-sm text-muted-foreground">Loading content...</p>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlaySpinnerDemo {}
