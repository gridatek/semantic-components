import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScPage } from '@semantic-components/ui';

import { Combobox2Demo } from './combobox2-demo';

@Component({
  selector: 'app-combobox2-demo-page',
  imports: [ScPage, Combobox2Demo],
  template: `
    <sc-page>
      <h1 class="text-3xl font-bold tracking-tight">ScCombobox2</h1>
      <p class="text-muted-foreground text-lg mt-2">
        A versatile combo box component with custom templates, perfect for country pickers, timezone
        selectors, and more.
      </p>

      <div class="mt-8">
        <h2 class="text-2xl font-semibold mb-6">Examples</h2>
        <app-combobox2-demo />
      </div>
    </sc-page>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Combobox2DemoPage {}
