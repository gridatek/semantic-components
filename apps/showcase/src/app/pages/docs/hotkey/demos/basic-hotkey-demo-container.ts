import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicHotkeyDemo } from './basic-hotkey-demo';

@Component({
  selector: 'app-basic-hotkey-demo-container',
  imports: [DemoContainer, BasicHotkeyDemo],
  template: `
    <app-demo-container
      title="A button's shortcut"
      demoUrl="/demos/hotkey/basic-hotkey-demo"
      [code]="code"
    >
      <app-basic-hotkey-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class BasicHotkeyDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScHotkey, ScKbd } from '@semantic-components/ui';

/** A button and its shortcut: both save; the key is written for the platform. */
@Component({
  selector: 'app-basic-hotkey-demo',
  imports: [ScButton, ScHotkey, ScKbd],
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicHotkeyDemo {
  protected readonly saves = signal(0);

  protected save(): void {
    this.saves.update((saves) => saves + 1);
  }
}`;
}
