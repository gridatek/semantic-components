import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScTokenInput,
  ScTokenInputEditor,
  ScTokenInputStatus,
  ScTokenInputToken,
  ScTokenInputTokenRemove,
  type ScTokenInputValue,
  type ScTrigger,
  ScTriggerMenu,
  ScTriggerMenuEmpty,
  ScTriggerMenuItem,
  ScTriggerMenuList,
  ScTriggerMenuPopup,
  ScTriggerMenuPortal,
  ScTriggerMenuStatus,
  tokenInputToText,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

interface Person {
  readonly value: string;
  readonly label: string;
  readonly email: string;
  readonly keywords?: readonly string[];
}

/** Type @ and a name: the menu at the @, arrows and Enter (or a click) — the person becomes a token. */
@Component({
  selector: 'app-mentions-token-input-demo',
  imports: [
    ScField,
    ScLabel,
    ScTokenInput,
    ScTokenInputEditor,
    ScTokenInputStatus,
    ScTokenInputToken,
    ScTokenInputTokenRemove,
    ScTriggerMenu,
    ScTriggerMenuEmpty,
    ScTriggerMenuItem,
    ScTriggerMenuList,
    ScTriggerMenuPopup,
    ScTriggerMenuPortal,
    ScTriggerMenuStatus,
    SiXIcon,
  ],
  template: `
    <div scField class="w-full max-w-md">
      <label scLabel>Message</label>
      <div scTokenInput #input="scTokenInput" [(value)]="message">
        <div scTokenInputEditor placeholder="Type @ to mention someone…"></div>
        <ng-template scTokenInputToken let-token>
          &#64;{{ token.label }}
          <span scTokenInputTokenRemove><svg siXIcon></svg></span>
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
              <div scTriggerMenuStatus>{{ menu.items().length }} found</div>
            </div>
          </ng-template>
        </div>
        <div scTokenInputStatus>
          @if (input.lastChange(); as change) {
            @for (token of change.added; track $index) {
              {{ token.label }} mentioned.
            }
            @for (token of change.removed; track $index) {
              {{ token.label }} removed.
            }
          }
        </div>
      </div>
      <p class="text-muted-foreground font-mono text-xs" data-testid="picked">
        {{ text() }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MentionsTokenInputDemo {
  private readonly people: readonly Person[] = [
    { value: 'u1', label: 'Hollis Grant', email: 'hollis@example.com' },
    { value: 'u2', label: 'Amara Diallo', email: 'amara@example.com' },
    { value: 'u3', label: 'Kenji Watanabe', email: 'kenji@example.com' },
    { value: 'u4', label: 'Lucía Romero', email: 'lucia@example.com' },
    {
      value: 'u5',
      label: 'Design team',
      email: 'design@example.com',
      keywords: ['group', 'team'],
    },
  ];
  private readonly triggers: readonly ScTrigger<Person>[] = [
    { char: '@', type: 'mention', items: this.people },
  ];
  private readonly message = signal<ScTokenInputValue>([]);
  private readonly text = computed(() => tokenInputToText(this.message()));
}
