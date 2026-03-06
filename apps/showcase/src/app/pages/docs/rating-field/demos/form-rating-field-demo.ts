import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScRatingField,
  ScRatingFieldItem,
  ScRatingIcon,
  ScRatingItemGroup,
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
    ScRatingItemGroup,
    ScRatingFieldItem,
    ScRatingIcon,
    ScButton,
    SiStarIcon,
    JsonPipe,
  ],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Product Rating</label>
        <div scRatingField [(value)]="formModel().rating">
          <div scRatingItemGroup>
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <span scRatingItem [value]="i">
                <svg siStarIcon scRatingIcon></svg>
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
  `,
  host: { class: 'block w-full' },
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
}
