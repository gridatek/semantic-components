import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ChoiceCardSwitchNextDemo } from './choice-card-switch-next-demo';

@Component({
  selector: 'app-choice-card-switch-next-demo-container',
  imports: [DemoContainer, ChoiceCardSwitchNextDemo],
  template: `
    <app-demo-container
      title="Choice card"
      demoUrl="/demos/switch-next/choice-card-switch-next-demo"
      [code]="code"
    >
      <app-choice-card-switch-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardSwitchNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldBody,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldTitle,
  ScLabel,
  ScSwitchNext,
} from '@semantic-components/ui';

/** A whole card as the label: a press anywhere on it switches. */
@Component({
  selector: 'app-choice-card-switch-next-demo',
  imports: [
    FormField,
    ScField,
    ScFieldBody,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldTitle,
    ScLabel,
    ScSwitchNext,
  ],
  template: \`
    <div scFieldGroup class="w-full max-w-sm">
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldBody>
            <div scFieldTitle>Share across devices</div>
            <p scFieldDescription>
              Focus is shared across devices, and turns off when you leave the
              app.
            </p>
          </div>
          <input type="checkbox" scSwitchNext [formField]="focusForm.share" />
        </div>
      </label>
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldBody>
            <div scFieldTitle>Enable notifications</div>
            <p scFieldDescription>
              Receive notifications when focus mode is enabled or disabled.
            </p>
          </div>
          <input
            type="checkbox"
            scSwitchNext
            [formField]="focusForm.notifications"
          />
        </div>
      </label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardSwitchNextDemo {
  protected readonly focusForm = form(
    signal({ share: false, notifications: true }),
  );
}`;
}
