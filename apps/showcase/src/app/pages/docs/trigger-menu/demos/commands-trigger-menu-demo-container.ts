import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CommandsTriggerMenuDemo } from './commands-trigger-menu-demo';

@Component({
  selector: 'app-commands-trigger-menu-demo-container',
  imports: [DemoContainer, CommandsTriggerMenuDemo],
  template: `
    <app-demo-container
      title="Commands"
      [code]="code"
      demoUrl="/demos/trigger-menu/commands-trigger-menu-demo"
    >
      <app-commands-trigger-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CommandsTriggerMenuDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTokenInput,
  ScTokenInputEditor,
  ScTokenInputToken,
  type ScTrigger,
  ScTriggerMenu,
  ScTriggerMenuEmpty,
  ScTriggerMenuItem,
  ScTriggerMenuList,
  ScTriggerMenuPopup,
  ScTriggerMenuPortal,
  ScTriggerMenuStatus,
} from '@semantic-components/ui';

/** Two triggers: @ anywhere for people, / only at the start of a line (boundary: 'start') for commands — each its own token type; a disabled command is skipped. */
@Component({
  selector: 'app-commands-trigger-menu-demo',
  imports: [
    ScTokenInput,
    ScTokenInputEditor,
    ScTokenInputToken,
    ScTriggerMenu,
    ScTriggerMenuEmpty,
    ScTriggerMenuItem,
    ScTriggerMenuList,
    ScTriggerMenuPopup,
    ScTriggerMenuPortal,
    ScTriggerMenuStatus,
  ],
  template: \`
    <div scTokenInput class="max-w-md">
      <div
        scTokenInputEditor
        aria-label="Message"
        placeholder="/ for a command, @ for someone"
      ></div>
      <ng-template scTokenInputToken let-token>
        {{ token.type === 'command' ? '/' : '&#64;' }}{{ token.label }}
      </ng-template>
      <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
        <ng-template scTriggerMenuPortal>
          <div scTriggerMenuPopup>
            <div scTriggerMenuEmpty>Nothing found.</div>
            <div
              scTriggerMenuList
              [attr.aria-label]="
                menu.match()?.trigger?.type === 'command'
                  ? 'Commands'
                  : 'People'
              "
            >
              @for (item of menu.items(); track item.value) {
                <div scTriggerMenuItem [item]="item">{{ item.label }}</div>
              }
            </div>
            <div scTriggerMenuStatus>{{ menu.items().length }} found.</div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CommandsTriggerMenuDemo {
  private readonly triggers: readonly ScTrigger[] = [
    {
      char: '/',
      type: 'command',
      boundary: 'start',
      items: [
        { value: 'remind', label: 'remind' },
        { value: 'poll', label: 'poll' },
        { value: 'giphy', label: 'giphy', disabled: true },
        { value: 'status', label: 'status' },
      ],
    },
    {
      char: '@',
      type: 'mention',
      items: [
        { value: 'u1', label: 'Hollis Grant' },
        { value: 'u2', label: 'Amara Diallo' },
      ],
    },
  ];
}`;
}
