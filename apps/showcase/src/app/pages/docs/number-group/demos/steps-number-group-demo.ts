import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScKbd,
  ScLabel,
  ScNumberDecrement,
  ScNumberGroup,
  ScNumberIncrement,
  ScNumberInput,
  ScNumberScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** Steps of 5 (Alt: 1, Shift or Page Up / Down: 50), snapped to multiples of 5; Home / End for the bounds; the wheel steps it while focused. */
@Component({
  selector: 'app-steps-number-group-demo',
  imports: [
    ScKbd,
    ScLabel,
    ScField,
    ScNumberScrubArea,
    ScNumberGroup,
    ScNumberDecrement,
    ScNumberInput,
    ScNumberIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div class="w-48 space-y-4">
      <div scField>
        <div scNumberScrubArea>
          <label scLabel>Width (px)</label>
        </div>
        <div
          scNumberGroup
          [(value)]="width"
          [min]="0"
          [max]="1000"
          [step]="5"
          [smallStep]="1"
          [largeStep]="50"
          snapOnStep
          allowWheelScrub
        >
          <button scNumberDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease width</span>
          </button>
          <input scNumberInput />
          <button scNumberIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase width</span>
          </button>
        </div>
      </div>
      <p class="text-muted-foreground text-sm">
        Type 12, then press <kbd scKbd>↑</kbd>: it snaps to 15.
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsNumberGroupDemo {
  private readonly width = signal<number | null>(120);
}
