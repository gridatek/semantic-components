import { Component, ViewEncapsulation } from '@angular/core';
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

const people = [
  'Hollis Grant',
  'Amara Diallo',
  'Kenji Watanabe',
  'Lucía Romero',
  'Noah Becker',
  'Priya Nair',
].map((label, i) => ({ value: `u${i + 1}`, label }));

/** items as a loader: given what is typed and an AbortSignal (aborted when it changes); the list is busy meanwhile, the empty text says so. */
@Component({
  selector: 'app-loading-trigger-menu-demo',
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
  template: `
    <div scTokenInput class="max-w-md">
      <div
        scTokenInputEditor
        aria-label="Message"
        placeholder="Type @ to search people"
      ></div>
      <ng-template scTokenInputToken let-token>
        &#64;{{ token.label }}
      </ng-template>
      <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
        <ng-template scTriggerMenuPortal>
          <div scTriggerMenuPopup>
            <div scTriggerMenuEmpty>
              {{ menu.loading() ? 'Searching…' : 'No one found.' }}
            </div>
            <div scTriggerMenuList aria-label="People">
              @for (person of menu.items(); track person.value) {
                <div scTriggerMenuItem [item]="person">{{ person.label }}</div>
              }
            </div>
            <div scTriggerMenuStatus>
              {{
                menu.loading()
                  ? 'Searching…'
                  : menu.items().length + ' people found.'
              }}
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LoadingTriggerMenuDemo {
  private readonly triggers: readonly ScTrigger[] = [
    {
      char: '@',
      type: 'mention',
      items: (query, signal) =>
        new Promise((resolve, reject) => {
          const timer = setTimeout(
            () =>
              resolve(
                people.filter((person) =>
                  person.label.toLowerCase().includes(query.toLowerCase()),
                ),
              ),
            600,
          );
          signal.addEventListener('abort', () => {
            clearTimeout(timer);
            reject(signal.reason);
          });
        }),
    },
  ];
}
