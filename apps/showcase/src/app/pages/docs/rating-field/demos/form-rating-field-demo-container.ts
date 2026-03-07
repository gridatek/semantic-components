import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormRatingFieldDemo } from './form-rating-field-demo';

@Component({
  selector: 'app-form-rating-field-demo-container',
  imports: [DemoContainer, FormRatingFieldDemo],
  template: `
    <app-demo-container title="Form Integration" [code]="code">
      <app-form-rating-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRatingFieldDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScLabel,
  ScRatingField,
  ScRatingFieldGroup,
  ScRatingFieldIcon,
  ScRatingFieldItem,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

interface ReviewForm {
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-form-rating-field-demo',
  imports: [
    ScRatingField,
    ScRatingFieldGroup,
    ScRatingFieldItem,
    ScRatingFieldIcon,
    ScButton,
    ScLabel,
    SiStarIcon,
    JsonPipe,
  ],
  template: \`
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label scLabel>Product Rating</label>
        <div scRatingField [(value)]="formModel().rating">
          <div scRatingFieldGroup>
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <span scRatingFieldItem [value]="i">
                <svg siStarIcon scRatingFieldIcon></svg>
              </span>
            }
          </div>
        </div>
      </div>

      <button scButton (click)="onSubmit()" class="w-fit">Submit Rating</button>

      @if (submitted) {
        <div class="bg-muted rounded-md p-4">
          <p class="text-sm font-medium">Form Value:</p>
          <pre class="mt-2 text-xs">{{ formModel() | json }}</pre>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRatingFieldDemo {
  readonly formModel = signal<ReviewForm>({
    rating: 0,
    comment: '',
  });

  submitted = false;

  onSubmit(): void {
    this.submitted = true;
    console.log('Form submitted:', this.formModel());
  }
}`;
}
