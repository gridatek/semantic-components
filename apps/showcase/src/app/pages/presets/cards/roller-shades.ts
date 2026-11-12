import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScFrame,
  ScSlider,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';

const POSITIONS: Record<string, number> = { open: 0, half: 50, closed: 100 };

/** Roller shades: a slider for how far down, and three set positions. */
@Component({
  selector: 'app-preview-roller-shades',
  imports: [
    ScFrame,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScSlider,
    ScToggleGroup,
    ScToggleGroupItem,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Living Room</h2>
        <p scCardDescription>Roller Shades</p>
      </div>
      <div scCardContent class="flex flex-col gap-4">
        <div
          scFrame
          class="bg-muted flex h-32 flex-col overflow-hidden"
          aria-hidden="true"
        >
          <div
            class="bg-muted-foreground transition-all duration-300"
            [style.height.%]="position()"
          ></div>
        </div>
        <div class="flex items-center gap-3">
          <span
            class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
          >
            Open
          </span>
          <input
            scSlider
            aria-label="Shade position"
            class="flex-1"
            [max]="100"
            [(value)]="position"
          />
          <span
            class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
          >
            Close
          </span>
        </div>
      </div>
      <div scCardFooter>
        <div
          scToggleGroup
          variant="outline"
          aria-label="Set position"
          class="w-full"
          [spacing]="1"
          [value]="preset()"
          (valueChange)="choose($event)"
        >
          <button scToggleGroupItem value="open" class="flex-1">Open</button>
          <button scToggleGroupItem value="half" class="flex-1">Half</button>
          <button scToggleGroupItem value="closed" class="flex-1">
            Closed
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewRollerShades {
  protected readonly position = signal(50);
  protected readonly preset = computed(() => {
    const p = this.position();
    return [p <= 10 ? 'open' : p >= 90 ? 'closed' : 'half'];
  });

  protected choose(value: string[]): void {
    const v = value[0];
    if (v in POSITIONS) this.position.set(POSITIONS[v]);
  }
}
