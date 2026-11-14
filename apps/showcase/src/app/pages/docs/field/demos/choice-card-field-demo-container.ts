import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ChoiceCardFieldDemo } from './choice-card-field-demo';

@Component({
  selector: 'app-choice-card-field-demo-container',
  imports: [DemoContainer, ChoiceCardFieldDemo],
  template: `
    <app-demo-container
      title="Choice card"
      demoUrl="/demos/field/choice-card-field-demo"
      [code]="code"
    >
      <app-choice-card-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldTitle,
  ScFieldset,
  ScLabel,
  ScLegend,
  ScRadio,
  ScRadioGroup,
} from '@semantic-components/ui';

/** Radios as cards: a label around each field — the whole card picks. */
@Component({
  selector: 'app-choice-card-field-demo',
  imports: [
    FormField,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldTitle,
    ScFieldset,
    ScLabel,
    ScLegend,
    ScRadio,
    ScRadioGroup,
  ],
  template: \`
    <div scFieldGroup class="w-full max-w-xs">
      <fieldset scFieldset>
        <legend scLegend variant="label">Compute Environment</legend>
        <p scFieldDescription>
          Select the compute environment for your cluster.
        </p>
        <div scRadioGroup [formField]="envForm.environment">
          <label scLabel>
            <div scField orientation="horizontal">
              <div scFieldContentWrapper>
                <div scFieldTitle>Kubernetes</div>
                <p scFieldDescription>Run GPU workloads on a K8s cluster.</p>
              </div>
              <input scRadio value="kubernetes" />
            </div>
          </label>
          <label scLabel>
            <div scField orientation="horizontal">
              <div scFieldContentWrapper>
                <div scFieldTitle>Virtual Machine</div>
                <p scFieldDescription>Access a cluster to run GPU workloads.</p>
              </div>
              <input scRadio value="vm" />
            </div>
          </label>
        </div>
      </fieldset>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardFieldDemo {
  protected readonly envForm = form(signal({ environment: 'kubernetes' }));
}`;
}
