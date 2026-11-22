import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScLabel,
  ScTextarea,
  type ScTrigger,
  ScTriggerMenu,
  ScTriggerMenuInput,
  ScTriggerMenuItem,
  ScTriggerMenuList,
  ScTriggerMenuPopup,
  ScTriggerMenuPortal,
} from '@semantic-components/ui';

/** A textarea with [formField]: a mention chosen is typed into the form's value, as text. */
@Component({
  selector: 'app-form-trigger-menu-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldErrors,
    ScLabel,
    ScTextarea,
    ScTriggerMenu,
    ScTriggerMenuInput,
    ScTriggerMenuItem,
    ScTriggerMenuList,
    ScTriggerMenuPopup,
    ScTriggerMenuPortal,
  ],
  template: `
    <form [formRoot]="commentForm" class="grid w-full max-w-md gap-3">
      <div scField>
        <label scLabel>Comment</label>
        <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
          <textarea
            scTextarea
            scTriggerMenuInput
            [formField]="commentForm.comment"
          ></textarea>
          <ng-template scTriggerMenuPortal>
            <div scTriggerMenuPopup>
              <div scTriggerMenuList aria-label="People">
                @for (person of menu.items(); track person.value) {
                  <div scTriggerMenuItem [item]="person">
                    {{ person.label }}
                  </div>
                }
              </div>
            </div>
          </ng-template>
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Post</button>
      @if (posted()) {
        <p class="text-sm" role="status">Posted: {{ posted() }}</p>
      }
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTriggerMenuDemo {
  private readonly triggers: readonly ScTrigger[] = [
    {
      char: '@',
      type: 'mention',
      items: [
        { value: 'u1', label: 'Hollis Grant' },
        { value: 'u2', label: 'Amara Diallo' },
        { value: 'u3', label: 'Kenji Watanabe' },
      ],
    },
  ];
  private readonly model = signal({ comment: '' });
  private readonly posted = signal('');
  private readonly commentForm = form(
    this.model,
    (s) => {
      required(s.comment, { message: 'Write a comment.' });
    },
    {
      submission: {
        action: async () => this.posted.set(this.model().comment.trim()),
      },
    },
  );
}
