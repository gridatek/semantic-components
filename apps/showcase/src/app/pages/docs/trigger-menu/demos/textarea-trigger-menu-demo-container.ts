import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TextareaTriggerMenuDemo } from './textarea-trigger-menu-demo';

@Component({
  selector: 'app-textarea-trigger-menu-demo-container',
  imports: [DemoContainer, TextareaTriggerMenuDemo],
  template: `
    <app-demo-container
      title="In a textarea"
      [code]="code"
      demoUrl="/demos/trigger-menu/textarea-trigger-menu-demo"
    >
      <app-textarea-trigger-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TextareaTriggerMenuDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScTextarea,
  type ScTrigger,
  ScTriggerMenu,
  ScTriggerMenuEmpty,
  ScTriggerMenuInput,
  ScTriggerMenuItem,
  ScTriggerMenuList,
  ScTriggerMenuPopup,
  ScTriggerMenuPortal,
  ScTriggerMenuStatus,
} from '@semantic-components/ui';

interface Person {
  readonly value: string;
  readonly label: string;
  readonly username: string;
}

/** On a textarea (scTriggerMenuInput): the value stays plain text — insert writes @username — and the items are yours, here with initials. */
@Component({
  selector: 'app-textarea-trigger-menu-demo',
  imports: [
    ScField,
    ScLabel,
    ScTextarea,
    ScTriggerMenu,
    ScTriggerMenuEmpty,
    ScTriggerMenuInput,
    ScTriggerMenuItem,
    ScTriggerMenuList,
    ScTriggerMenuPopup,
    ScTriggerMenuPortal,
    ScTriggerMenuStatus,
  ],
  template: \`
    <div class="grid w-full max-w-md gap-2">
      <div scField>
        <label scLabel>Comment</label>
        <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
          <textarea
            scTextarea
            scTriggerMenuInput
            placeholder="Type @ to mention someone…"
            [value]="comment()"
            (input)="onInput($event)"
          ></textarea>
          <ng-template scTriggerMenuPortal>
            <div scTriggerMenuPopup>
              <div scTriggerMenuEmpty>No one found.</div>
              <div scTriggerMenuList aria-label="People">
                @for (person of menu.items(); track person.value) {
                  <div scTriggerMenuItem [item]="person">
                    <span
                      aria-hidden="true"
                      class="bg-muted flex size-6 items-center justify-center rounded-full text-xs font-medium"
                    >
                      {{ person.label.charAt(0) }}
                    </span>
                    <span class="flex flex-col">
                      {{ person.label }}
                      <span class="text-muted-foreground text-xs">
                        &#64;{{ person.username }}
                      </span>
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
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ comment() }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextareaTriggerMenuDemo {
  private readonly triggers: readonly ScTrigger<Person>[] = [
    {
      char: '@',
      type: 'mention',
      insert: (person) => \`@\${person.username}\`,
      items: [
        { value: 'u1', label: 'Hollis Grant', username: 'hollis' },
        { value: 'u2', label: 'Amara Diallo', username: 'amara' },
        { value: 'u3', label: 'Kenji Watanabe', username: 'kenji' },
        { value: 'u4', label: 'Lucía Romero', username: 'lucia' },
      ],
    },
  ];
  private readonly comment = signal('');

  private onInput(event: Event): void {
    this.comment.set((event.target as HTMLTextAreaElement).value);
  }
}`;
}
