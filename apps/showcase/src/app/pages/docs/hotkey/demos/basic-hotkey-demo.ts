import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScHotkey, ScKbd } from '@semantic-components/ui';

/** A button and its shortcut: both save; the key is written for the platform. */
@Component({
  selector: 'app-basic-hotkey-demo',
  imports: [ScButton, ScHotkey, ScKbd],
  template: `
    <div class="flex flex-col items-center gap-3">
      <button
        scButton
        variant="outline"
        scHotkey="mod+s"
        #hotkey="scHotkey"
        (scHotkeyPressed)="save()"
        (click)="save()"
      >
        Save
        <kbd scKbd>{{ hotkey.displayKey() }}</kbd>
      </button>
      <p class="text-muted-foreground text-sm" role="status">
        Saved {{ saves() }} times.
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicHotkeyDemo {
  protected readonly saves = signal(0);

  protected save(): void {
    this.saves.update((saves) => saves + 1);
  }
}
