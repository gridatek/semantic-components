import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputTriggerMenuDemo } from './input-trigger-menu-demo';

@Component({
  selector: 'app-input-trigger-menu-demo-container',
  imports: [DemoContainer, InputTriggerMenuDemo],
  template: `
    <app-demo-container
      title="In an input"
      [code]="code"
      demoUrl="/demos/trigger-menu/input-trigger-menu-demo"
    >
      <app-input-trigger-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputTriggerMenuDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScInput,
  ScLabel,
  type ScTrigger,
  ScTriggerMenu,
  ScTriggerMenuInput,
  ScTriggerMenuItem,
  ScTriggerMenuList,
  ScTriggerMenuPopup,
  ScTriggerMenuPortal,
} from '@semantic-components/ui';

/** On an input, one line: # for a channel — no empty part, so the list closes when nothing matches. */
@Component({
  selector: 'app-input-trigger-menu-demo',
  imports: [
    ScField,
    ScInput,
    ScLabel,
    ScTriggerMenu,
    ScTriggerMenuInput,
    ScTriggerMenuItem,
    ScTriggerMenuList,
    ScTriggerMenuPopup,
    ScTriggerMenuPortal,
  ],
  template: \`
    <div scField class="w-full max-w-sm">
      <label scLabel>Share in</label>
      <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
        <input scInput scTriggerMenuInput placeholder="Type # for a channel" />
        <ng-template scTriggerMenuPortal>
          <div scTriggerMenuPopup>
            <div scTriggerMenuList aria-label="Channels">
              @for (channel of menu.items(); track channel.value) {
                <div scTriggerMenuItem [item]="channel">
                  #{{ channel.label }}
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputTriggerMenuDemo {
  private readonly triggers: readonly ScTrigger[] = [
    {
      char: '#',
      type: 'channel',
      items: [
        { value: 'c1', label: 'general' },
        { value: 'c2', label: 'design' },
        { value: 'c3', label: 'engineering' },
        { value: 'c4', label: 'random' },
      ],
    },
  ];
}`;
}
