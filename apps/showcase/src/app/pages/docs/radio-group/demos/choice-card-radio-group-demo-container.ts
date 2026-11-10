import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ChoiceCardRadioGroupDemo } from './choice-card-radio-group-demo';

@Component({
  selector: 'app-choice-card-radio-group-demo-container',
  imports: [DemoContainer, ChoiceCardRadioGroupDemo],
  template: `
    <app-demo-container
      title="Choice card"
      demoUrl="/demos/radio-group/choice-card-radio-group-demo"
      [code]="code"
    >
      <app-choice-card-radio-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardRadioGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldBody,
  ScFieldDescription,
  ScFieldTitle,
  ScLabel,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

/** Choices as cards: a label around each field — the whole card picks. */
@Component({
  selector: 'app-choice-card-radio-group-demo',
  imports: [
    FormField,
    ScField,
    ScFieldBody,
    ScFieldDescription,
    ScFieldTitle,
    ScLabel,
    ScRadio,
    ScRadioField,
    ScRadioGroup,
  ],
  template: \`
    <div scRadioGroup aria-label="Plan" class="w-full max-w-sm">
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldBody>
            <div scFieldTitle>Plus</div>
            <p scFieldDescription>For individuals and small teams.</p>
          </div>
          <div scRadioField>
            <input
              type="radio"
              scRadio
              value="plus"
              [formField]="planForm.plan"
            />
          </div>
        </div>
      </label>
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldBody>
            <div scFieldTitle>Pro</div>
            <p scFieldDescription>For growing businesses.</p>
          </div>
          <div scRadioField>
            <input
              type="radio"
              scRadio
              value="pro"
              [formField]="planForm.plan"
            />
          </div>
        </div>
      </label>
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldBody>
            <div scFieldTitle>Enterprise</div>
            <p scFieldDescription>For large teams and enterprises.</p>
          </div>
          <div scRadioField>
            <input
              type="radio"
              scRadio
              value="enterprise"
              [formField]="planForm.plan"
            />
          </div>
        </div>
      </label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardRadioGroupDemo {
  protected readonly planForm = form(signal({ plan: 'plus' }));
}`;
}
