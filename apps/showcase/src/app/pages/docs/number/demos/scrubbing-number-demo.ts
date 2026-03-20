import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScLabel,
  ScNumber,
  ScNumberDecrement,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberInputGroup,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import {
  SiLightbulbIcon,
  SiMinusIcon,
  SiPlusIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-scrubbing-number-demo',
  imports: [
    ScNumber,
    ScNumberScrubArea,
    ScNumberInputGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    ScLabel,
    SiLightbulbIcon,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div class="space-y-6">
      <div
        scNumber
        [(value)]="opacity"
        [min]="0"
        [max]="100"
        [scrubSpeed]="0.5"
      >
        <div scNumberScrubArea>
          <label scLabel>Opacity (%)</label>
        </div>

        <div scNumberGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease</span>
          </button>
          <input scNumberInput aria-label="Opacity" />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase</span>
          </button>
        </div>
      </div>

      <div scNumber [(value)]="rotation" [min]="0" [max]="360">
        <div scNumberScrubArea>
          <label scLabel>Rotation (deg)</label>
        </div>

        <div scNumberGroup>
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease</span>
          </button>
          <input scNumberInput aria-label="Rotation" />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase</span>
          </button>
        </div>
      </div>

      <p class="text-muted-foreground flex items-center gap-1 text-sm">
        <svg siLightbulbIcon class="size-4"></svg>
        Tip: Click and drag on the label to scrub values
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrubbingNumberDemo {
  readonly opacity = signal<number | null>(50);
  readonly rotation = signal<number | null>(0);
}
