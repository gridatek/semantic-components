import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DeletionTokenInputDemo } from './deletion-token-input-demo';

@Component({
  selector: 'app-deletion-token-input-demo-container',
  imports: [DemoContainer, DeletionTokenInputDemo],
  template: `
    <app-demo-container
      title="Deleting tokens"
      [code]="code"
      demoUrl="/demos/token-input/deletion-token-input-demo"
    >
      <app-deletion-token-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DeletionTokenInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  type ScTokenDeletion,
  ScTokenInput,
  ScTokenInputEditor,
  ScTokenInputToken,
  type ScTokenInputValue,
  type ScTrigger,
  ScTriggerMenu,
  ScTriggerMenuItem,
  ScTriggerMenuList,
  ScTriggerMenuPopup,
  ScTriggerMenuPortal,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** tokenDeletion: Backspace removes the token (whole), selects it first (select), or turns it back into its text with the menu open on it (revert). */
@Component({
  selector: 'app-deletion-token-input-demo',
  imports: [
    ScField,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
    ScTokenInput,
    ScTokenInputEditor,
    ScTokenInputToken,
    ScTriggerMenu,
    ScTriggerMenuItem,
    ScTriggerMenuList,
    ScTriggerMenuPopup,
    ScTriggerMenuPortal,
  ],
  template: \`
    <div class="grid w-full max-w-md gap-4">
      <div scField class="w-40">
        <label scLabel>Backspace on a token</label>
        <div scNativeSelectContainer class="w-full">
          <select scNativeSelect [value]="mode()" (change)="setMode($event)">
            <option scNativeSelectOption value="whole">Whole</option>
            <option scNativeSelectOption value="select">Select</option>
            <option scNativeSelectOption value="revert">Revert</option>
          </select>
          <svg siChevronDownIcon scNativeSelectIcon></svg>
        </div>
      </div>
      <div scField>
        <label scLabel>Message</label>
        <div scTokenInput [tokenDeletion]="mode()" [(value)]="message">
          <div scTokenInputEditor></div>
          <ng-template scTokenInputToken let-token>
            &#64;{{ token.label }}
          </ng-template>
          <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
            <ng-template scTriggerMenuPortal>
              <div scTriggerMenuPopup>
                <div scTriggerMenuList aria-label="People">
                  @for (person of menu.items(); track person.value) {
                    <div scTriggerMenuItem [item]="person">
                      {{ person.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DeletionTokenInputDemo {
  private readonly triggers: readonly ScTrigger[] = [
    {
      char: '@',
      type: 'mention',
      items: [
        { value: 'u1', label: 'Hollis Grant' },
        { value: 'u2', label: 'Amara Diallo' },
        { value: 'u3', label: 'Kenji Watanabe' },
      ],
    },
  ];
  private readonly mode = signal<ScTokenDeletion>('whole');
  private readonly message = signal<ScTokenInputValue>([
    'Thanks ',
    { type: 'mention', value: 'u1', label: 'Hollis Grant' },
  ]);

  private setMode(event: Event): void {
    this.mode.set((event.target as HTMLSelectElement).value as ScTokenDeletion);
  }
}`;
}
