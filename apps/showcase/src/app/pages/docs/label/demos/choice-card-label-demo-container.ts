import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ChoiceCardLabelDemo } from './choice-card-label-demo';

@Component({
  selector: 'app-choice-card-label-demo-container',
  imports: [DemoContainer, ChoiceCardLabelDemo],
  template: `
    <app-demo-container
      title="Choice card"
      demoUrl="/demos/label/choice-card-label-demo"
      [code]="code"
    >
      <app-choice-card-label-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardLabelDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCheckbox,
  ScCheckboxField,
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldTitle,
  ScLabel,
} from '@semantic-components/ui';

/** A label around a field: the whole card picks — bordered, tinted when checked, ringed when focused. */
@Component({
  selector: 'app-choice-card-label-demo',
  imports: [
    ScCheckbox,
    ScCheckboxField,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldTitle,
    ScLabel,
  ],
  template: \`
    <label scLabel class="w-full max-w-sm">
      <div scField orientation="horizontal">
        <div scFieldContentWrapper>
          <div scFieldTitle>Enable notifications</div>
          <p scFieldDescription>
            You can enable or disable notifications at any time.
          </p>
        </div>
        <div scCheckboxField>
          <input scCheckbox />
        </div>
      </div>
    </label>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardLabelDemo {}`;
}
