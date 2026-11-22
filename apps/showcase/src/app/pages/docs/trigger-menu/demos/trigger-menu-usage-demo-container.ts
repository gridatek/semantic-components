import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TriggerMenuUsageDemo } from './trigger-menu-usage-demo';

@Component({
  selector: 'app-trigger-menu-usage-demo-container',
  imports: [DemoContainer, TriggerMenuUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/trigger-menu/trigger-menu-usage-demo"
    >
      <app-trigger-menu-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TriggerMenuUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
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

interface Person {
  readonly value: string;
  readonly label: string;
  readonly email: string;
  readonly keywords?: readonly string[];
}

/** In a Token Input: @ opens the list at the character, what follows filters it (labels and keywords); the person chosen becomes a token. */
@Component({
  selector: 'app-trigger-menu-usage-demo',
  imports: [
    ScField,
    ScLabel,
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
    <div scField class="w-full max-w-md">
      <label scLabel>Message</label>
      <div scTokenInput>
        <div scTokenInputEditor placeholder="Type @ to mention someone…"></div>
        <ng-template scTokenInputToken let-token>
          &#64;{{ token.label }}
        </ng-template>
        <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
          <ng-template scTriggerMenuPortal>
            <div scTriggerMenuPopup>
              <div scTriggerMenuEmpty>No one found.</div>
              <div scTriggerMenuList aria-label="People">
                @for (person of menu.items(); track person.value) {
                  <div scTriggerMenuItem [item]="person">
                    {{ person.label }}
                    <span class="text-muted-foreground ms-auto text-xs">
                      {{ person.email }}
                    </span>
                  </div>
                }
              </div>
              <div scTriggerMenuStatus>
                {{ menu.items().length }} people found.
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TriggerMenuUsageDemo {
  private readonly triggers: readonly ScTrigger<Person>[] = [
    {
      char: '@',
      type: 'mention',
      items: [
        { value: 'u1', label: 'Hollis Grant', email: 'hollis@example.com' },
        { value: 'u2', label: 'Amara Diallo', email: 'amara@example.com' },
        { value: 'u3', label: 'Kenji Watanabe', email: 'kenji@example.com' },
        { value: 'u4', label: 'Lucía Romero', email: 'lucia@example.com' },
        {
          value: 'u5',
          label: 'Design team',
          email: 'design@example.com',
          keywords: ['group'],
        },
      ],
    },
  ];
}`;
}
