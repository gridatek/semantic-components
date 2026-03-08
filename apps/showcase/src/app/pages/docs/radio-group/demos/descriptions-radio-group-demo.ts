import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScLabel,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

interface PlanFormModel {
  plan: string;
}

@Component({
  selector: 'app-descriptions-radio-group-demo',
  imports: [
    ScRadioGroup,
    ScRadioField,
    ScRadio,
    ScLabel,
    ScFieldDescription,
    FormField,
  ],
  template: `
    <div scRadioGroup>
      <label scRadioField>
        <input type="radio" scRadio value="free" [formField]="planForm.plan" />
        <label scLabel>Free</label>
        <p scFieldDescription>Get started with basic features</p>
      </label>
      <label scRadioField>
        <input type="radio" scRadio value="pro" [formField]="planForm.plan" />
        <label scLabel>Pro</label>
        <p scFieldDescription>Advanced features for professionals</p>
      </label>
      <label scRadioField>
        <input
          type="radio"
          scRadio
          value="enterprise"
          [formField]="planForm.plan"
        />
        <label scLabel>Enterprise</label>
        <p scFieldDescription>Custom solutions for large teams</p>
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionsRadioGroupDemo {
  readonly formModel = signal<PlanFormModel>({
    plan: 'pro',
  });

  readonly planForm = form(this.formModel);
}
