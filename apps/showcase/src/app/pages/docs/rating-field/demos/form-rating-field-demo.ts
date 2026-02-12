import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScRatingField,
  ScRatingItemGroup,
  ScRatingFieldItem,
  ScButton,
} from '@semantic-components/ui-lab';
import { SiStarIcon } from '@semantic-icons/lucide-icons';
import { JsonPipe } from '@angular/common';

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
    ScButton,
    SiStarIcon,
    JsonPipe,
  ],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Product Rating</label>
        <div sc-rating-field [(value)]="formModel().rating">
          <div sc-rating-item-group class="flex gap-0.5">
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <span
                sc-rating-item
                [value]="i"
                class="cursor-pointer transition-transform hover:scale-110"
              >
                <svg
                  si-star-icon
                  class="size-6 transition-colors"
                  [class.fill-yellow-400]="i <= formModel().rating"
                  [class.text-yellow-400]="i <= formModel().rating"
                  [class.text-gray-300]="i > formModel().rating"
                ></svg>
              </span>
            }
          </div>
        </div>
      </div>

      <button sc-button (click)="onSubmit()" class="w-fit">
        Submit Rating
      </button>

      @if (submitted) {
        <div class="rounded-md bg-muted p-4">
          <p class="text-sm font-medium">Form Value:</p>
          <pre class="mt-2 text-xs">{{ formModel() | json }}</pre>
        </div>
      }
    </div>
  `,
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
