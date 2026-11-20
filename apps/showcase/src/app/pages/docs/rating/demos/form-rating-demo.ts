import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScFrame,
  ScLabel,
  ScRating,
  ScRatingIcon,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** A Signal Forms field: not rated is null, so required asks for a score; named by its label. */
@Component({
  selector: 'app-form-rating-demo',
  imports: [
    FormField,
    JsonPipe,
    ScField,
    ScFieldErrors,
    ScFrame,
    ScLabel,
    ScRating,
    ScRatingIcon,
    SiStarIcon,
  ],
  template: `
    <div class="flex w-full max-w-xs flex-col gap-4">
      <div scField>
        <label scLabel>Your rating</label>
        <div
          scRating
          [formField]="reviewForm.stars"
          valueText="{value} out of {max} stars"
        >
          <ng-template scRatingIcon>
            <svg siStarIcon></svg>
          </ng-template>
        </div>
        <div scFieldErrors></div>
      </div>
      <pre scFrame class="bg-muted p-4 text-xs">{{ model() | json }}</pre>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormRatingDemo {
  private readonly model = signal<{ stars: number | null }>({ stars: null });
  private readonly reviewForm = form(this.model, (path) =>
    required(path.stars, { message: 'Pick at least one star.' }),
  );
}
