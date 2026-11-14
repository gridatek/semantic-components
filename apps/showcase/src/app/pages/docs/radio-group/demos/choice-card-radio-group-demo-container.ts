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
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldTitle,
  ScLabel,
  ScRadio,
  ScRadioGroup,
} from '@semantic-components/ui';

/** Choices as cards: a label around each field — the whole card picks. */
@Component({
  selector: 'app-choice-card-radio-group-demo',
  imports: [
    FormField,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldTitle,
    ScLabel,
    ScRadio,
    ScRadioGroup,
  ],
  template: \`
    <div
      scRadioGroup
      [formField]="planForm.plan"
      aria-label="Plan"
      class="w-full max-w-sm"
    >
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldContentWrapper>
            <div scFieldTitle>Plus</div>
            <p scFieldDescription>For individuals and small teams.</p>
          </div>
          <input scRadio value="plus" />
        </div>
      </label>
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldContentWrapper>
            <div scFieldTitle>Pro</div>
            <p scFieldDescription>For growing businesses.</p>
          </div>
          <input scRadio value="pro" />
        </div>
      </label>
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldContentWrapper>
            <div scFieldTitle>Enterprise</div>
            <p scFieldDescription>For large teams and enterprises.</p>
          </div>
          <input scRadio value="enterprise" />
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
