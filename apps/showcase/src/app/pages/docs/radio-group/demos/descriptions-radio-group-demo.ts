import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScRadio, ScRadioField, ScRadioGroup } from '@semantic-components/ui';

interface PlanFormModel {
  plan: string;
}

@Component({
  selector: 'app-descriptions-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: `
    <div scRadioGroup class="gap-4">
      <label scRadioField class="flex items-start space-x-3">
        <input
          type="radio"
          scRadio
          value="free"
          [formField]="planForm.plan"
          id="plan-free"
          class="mt-1"
        />
        <div class="grid gap-1">
          <span class="text-sm leading-none font-medium">Free</span>
          <p class="text-muted-foreground text-sm">
            Get started with basic features
          </p>
        </div>
      </label>
      <label scRadioField class="flex items-start space-x-3">
        <input
          type="radio"
          scRadio
          value="pro"
          [formField]="planForm.plan"
          id="plan-pro"
          class="mt-1"
        />
        <div class="grid gap-1">
          <span class="text-sm leading-none font-medium">Pro</span>
          <p class="text-muted-foreground text-sm">
            Advanced features for professionals
          </p>
        </div>
      </label>
      <label scRadioField class="flex items-start space-x-3">
        <input
          type="radio"
          scRadio
          value="enterprise"
          [formField]="planForm.plan"
          id="plan-enterprise"
          class="mt-1"
        />
        <div class="grid gap-1">
          <span class="text-sm leading-none font-medium">Enterprise</span>
          <p class="text-muted-foreground text-sm">
            Custom solutions for large teams
          </p>
        </div>
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
