import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormRatingDemo } from './form-rating-demo';

@Component({
  selector: 'app-form-rating-demo-container',
  imports: [DemoContainer, FormRatingDemo],
  template: `
    <app-demo-container title="Form Integration" [code]="code">
      <app-form-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormRatingDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScField,
  ScLabel,
  ScRating,
  ScRatingGroup,
  ScRatingIcon,
  ScRatingItem,
  ScTextarea,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

interface ReviewForm {
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-form-rating-demo',
  imports: [
    ScRating,
    ScRatingGroup,
    ScRatingItem,
    ScRatingIcon,
    ScButton,
    ScField,
    ScLabel,
    ScTextarea,
    SiStarIcon,
    JsonPipe,
  ],
  template: \`
    <div class="flex flex-col gap-4">
      <div scField>
        <label scLabel>Product Rating</label>
        <div scRating [(value)]="formModel().rating">
          <div scRatingGroup>
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <span scRatingItem [value]="i">
                <svg siStarIcon scRatingIcon></svg>
              </span>
            }
          </div>
        </div>
      </div>

      <div scField>
        <label scLabel>Comment</label>
        <textarea
          scTextarea
          placeholder="Write your review..."
          [value]="formModel().comment"
          (input)="onCommentChange($event)"
        ></textarea>
      </div>

      <button scButton (click)="onSubmit()" class="w-fit">Submit Review</button>

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
})
export class FormRatingDemo {
  readonly formModel = signal<ReviewForm>({
    rating: 0,
    comment: '',
  });

  submitted = false;

  onCommentChange(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.formModel.update((m) => ({ ...m, comment: value }));
  }

  onSubmit(): void {
    this.submitted = true;
    console.log('Form submitted:', this.formModel());
  }
}`;
}
