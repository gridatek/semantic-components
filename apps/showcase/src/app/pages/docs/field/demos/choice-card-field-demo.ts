import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldBody,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldTitle,
  ScFieldset,
  ScLabel,
  ScLegend,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

/** Radios as cards: a label around each field — the whole card picks. */
@Component({
  selector: 'app-choice-card-field-demo',
  imports: [
    FormField,
    ScField,
    ScFieldBody,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldTitle,
    ScFieldset,
    ScLabel,
    ScLegend,
    ScRadio,
    ScRadioField,
    ScRadioGroup,
  ],
  template: `
    <div scFieldGroup class="w-full max-w-xs">
      <fieldset scFieldset>
        <legend scLegend variant="label">Compute Environment</legend>
        <p scFieldDescription>
          Select the compute environment for your cluster.
        </p>
        <div scRadioGroup [formField]="envForm.environment">
          <label scLabel>
            <div scField orientation="horizontal">
              <div scFieldBody>
                <div scFieldTitle>Kubernetes</div>
                <p scFieldDescription>Run GPU workloads on a K8s cluster.</p>
              </div>
              <div scRadioField>
                <input scRadio value="kubernetes" />
              </div>
            </div>
          </label>
          <label scLabel>
            <div scField orientation="horizontal">
              <div scFieldBody>
                <div scFieldTitle>Virtual Machine</div>
                <p scFieldDescription>Access a cluster to run GPU workloads.</p>
              </div>
              <div scRadioField>
                <input scRadio value="vm" />
              </div>
            </div>
          </label>
        </div>
      </fieldset>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardFieldDemo {
  protected readonly envForm = form(signal({ environment: 'kubernetes' }));
}
