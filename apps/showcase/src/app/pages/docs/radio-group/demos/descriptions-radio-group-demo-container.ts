import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DescriptionsRadioGroupDemo } from './descriptions-radio-group-demo';

@Component({
  selector: 'app-descriptions-radio-group-demo-container',
  imports: [DemoContainer, DescriptionsRadioGroupDemo],
  template: `
    <app-demo-container title="With Descriptions" [code]="code">
      <app-descriptions-radio-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionsRadioGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScRadioGroup, ScRadioField, ScRadio } from '@semantic-components/ui-lab';

interface PlanFormModel {
  plan: string;
}

@Component({
  selector: 'app-descriptions-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: \`
    <div sc-radio-group class="gap-4">
      <label sc-radio-field class="flex items-start space-x-3">
        <input
          type="radio"
          sc-radio
          value="free"
          [formField]="planForm.plan"
          id="plan-free"
          class="mt-1"
        />
        <div class="grid gap-1">
          <span class="text-sm font-medium leading-none">Free</span>
          <p class="text-sm text-muted-foreground">
            Get started with basic features
          </p>
        </div>
      </label>
      <label sc-radio-field class="flex items-start space-x-3">
        <input
          type="radio"
          sc-radio
          value="pro"
          [formField]="planForm.plan"
          id="plan-pro"
          class="mt-1"
        />
        <div class="grid gap-1">
          <span class="text-sm font-medium leading-none">Pro</span>
          <p class="text-sm text-muted-foreground">
            Advanced features for professionals
          </p>
        </div>
      </label>
      <label sc-radio-field class="flex items-start space-x-3">
        <input
          type="radio"
          sc-radio
          value="enterprise"
          [formField]="planForm.plan"
          id="plan-enterprise"
          class="mt-1"
        />
        <div class="grid gap-1">
          <span class="text-sm font-medium leading-none">Enterprise</span>
          <p class="text-sm text-muted-foreground">
            Custom solutions for large teams
          </p>
        </div>
      </label>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionsRadioGroupDemo {
  readonly formModel = signal<PlanFormModel>({
    plan: 'pro',
  });

  readonly planForm = form(this.formModel);
}`;
}
