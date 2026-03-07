import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-overlay-spinner-demo',
  imports: [ScSpinner, SiLoaderCircleIcon],
  template: `
    <div
      class="bg-muted/50 relative flex h-64 w-96 items-center justify-center rounded-lg border"
    >
      <div class="flex flex-col items-center">
        <svg scSpinner siLoaderCircleIcon class="text-primary size-8"></svg>
        <p class="text-muted-foreground mt-2 text-sm">Loading content...</p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlaySpinnerDemo {}
