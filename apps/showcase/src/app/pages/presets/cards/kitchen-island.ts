import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, disabled, form } from '@angular/forms/signals';
import {
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemGroup,
  ScItemMedia,
  ScItemTitle,
  ScSlider,
  ScSwitch,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  SiSunIcon,
  SiThermometerIcon,
  SiTimerIcon,
  SiVolume2Icon,
} from '@semantic-icons/lucide-icons';

type ScLightLevel = 'brightness' | 'colorTemp' | 'volume' | 'fade';

const SCENES: Record<string, Record<ScLightLevel, number>> = {
  cooking: { brightness: 90, colorTemp: 70, volume: 30, fade: 0 },
  dining: { brightness: 50, colorTemp: 40, volume: 20, fade: 60 },
  nightlight: { brightness: 15, colorTemp: 20, volume: 0, fade: 80 },
  focus: { brightness: 100, colorTemp: 85, volume: 0, fade: 0 },
};

/** A light: on or off, a scene, and four sliders the scene sets. */
@Component({
  selector: 'app-preview-kitchen-island',
  imports: [
    FormField,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemGroup,
    ScItemMedia,
    ScItemTitle,
    ScSlider,
    ScSwitch,
    ScToggleGroup,
    ScToggleGroupItem,
    SiSunIcon,
    SiThermometerIcon,
    SiTimerIcon,
    SiVolume2Icon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Kitchen Island</h2>
        <p scCardDescription>Hue Color Ambient</p>
        <div scCardAction>
          <input
            scSwitch
            aria-label="Kitchen Island"
            [formField]="light.enabled"
          />
        </div>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <div
          scToggleGroup
          variant="outline"
          aria-label="Scenes"
          class="flex-wrap"
          [spacing]="1"
          [disabled]="!light.enabled().value()"
          [value]="[scene()]"
          (valueChange)="chooseScene($event[0])"
        >
          <button scToggleGroupItem value="cooking">Cooking</button>
          <button scToggleGroupItem value="dining">Dining</button>
          <button scToggleGroupItem value="nightlight">Nightlight</button>
          <button scToggleGroupItem value="focus">Focus</button>
        </div>
        <div scItemGroup>
          @for (level of levels; track level.key) {
            <div scItem size="sm" variant="outline">
              <div scItemMedia variant="icon">
                @switch (level.key) {
                  @case ('brightness') {
                    <svg siSunIcon></svg>
                  }
                  @case ('colorTemp') {
                    <svg siThermometerIcon></svg>
                  }
                  @case ('volume') {
                    <svg siVolume2Icon></svg>
                  }
                  @default {
                    <svg siTimerIcon></svg>
                  }
                }
              </div>
              <div scItemBody class="flex-row items-center gap-3">
                <div scItemTitle class="shrink-0">{{ level.label }}</div>
              </div>
              <div scItemActions class="flex-1">
                <input
                  scSlider
                  class="w-full"
                  [attr.aria-label]="level.label"
                  [formField]="light[level.key]"
                />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewKitchenIsland {
  private readonly model = signal({ enabled: true, ...SCENES['cooking'] });
  protected readonly light = form(this.model, (path) => {
    for (const key of ['brightness', 'colorTemp', 'volume', 'fade'] as const)
      disabled(path[key], ({ valueOf }) => !valueOf(path.enabled));
  });
  protected readonly scene = signal('cooking');
  protected readonly levels: { key: ScLightLevel; label: string }[] = [
    { key: 'brightness', label: 'Brightness' },
    { key: 'colorTemp', label: 'Color Temp' },
    { key: 'volume', label: 'Volume' },
    { key: 'fade', label: 'Fade' },
  ];

  protected chooseScene(value: string | undefined): void {
    if (!value || !(value in SCENES)) return;
    this.scene.set(value);
    this.model.update((m) => ({ ...m, ...SCENES[value] }));
  }
}
