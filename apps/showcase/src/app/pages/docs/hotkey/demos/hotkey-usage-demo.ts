import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScHotkey, ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-hotkey-usage-demo',
  imports: [ScHotkey, ScKbd],
  template: `
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HotkeyUsageDemo {
  protected readonly count = signal(0);
}
