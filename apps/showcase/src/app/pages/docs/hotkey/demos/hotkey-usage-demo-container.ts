import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { HotkeyUsageDemo } from './hotkey-usage-demo';

@Component({
  selector: 'app-hotkey-usage-demo-container',
  imports: [UsageCode, HotkeyUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-hotkey-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HotkeyUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScHotkey, ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-hotkey-usage-demo',
  imports: [ScHotkey, ScKbd],
  template: \`
    <p class="text-sm">
      Press
      <kbd
        scKbd
        scHotkey="alt+k"
        #hotkey="scHotkey"
        (scHotkeyPressed)="count.set(count() + 1)"
      >
        {{ hotkey.displayKey() }}
      </kbd>
      : pressed {{ count() }} times.
    </p>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HotkeyUsageDemo {
  protected readonly count = signal(0);
}`;
}
