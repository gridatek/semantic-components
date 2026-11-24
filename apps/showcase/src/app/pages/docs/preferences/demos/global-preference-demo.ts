import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScPreferencesApply,
  ScSegmentedControl,
  ScSegmentedControlIndicator,
  ScSegmentedControlItem,
  definePreference,
  injectPreference,
} from '@semantic-components/ui';

/** global: on <html>, for the whole page — data-density, styled anywhere (in-data-[density=compact]:). */
const density = definePreference({
  attribute: 'data-density',
  values: ['comfortable', 'compact'],
  defaultValue: 'comfortable',
  storageKey: 'demo-density',
  global: true,
});

@Component({
  selector: 'app-global-preference-demo',
  imports: [
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScPreferencesApply,
    ScSegmentedControl,
    ScSegmentedControlIndicator,
    ScSegmentedControlItem,
  ],
  template: `
    <div class="grid w-full max-w-sm gap-4" [scPreferences]="[definition]">
      <div
        scSegmentedControl
        aria-label="Density"
        [value]="density.value()"
        (valueChange)="choose($event)"
      >
        <div scSegmentedControlIndicator></div>
        <button scSegmentedControlItem value="comfortable">Comfortable</button>
        <button scSegmentedControlItem value="compact">Compact</button>
      </div>
      <div
        scCard
        class="in-data-[density=compact]:gap-2 in-data-[density=compact]:py-3"
      >
        <div scCardHeader>
          <h3 scCardTitle>Monthly report</h3>
        </div>
        <div scCardBody class="text-muted-foreground text-sm">
          Spacing from the page's density.
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GlobalPreferenceDemo {
  private readonly definition = density;
  private readonly density = injectPreference(density);

  private choose(value: string | null): void {
    if (value === 'comfortable' || value === 'compact') this.density.set(value);
  }
}
