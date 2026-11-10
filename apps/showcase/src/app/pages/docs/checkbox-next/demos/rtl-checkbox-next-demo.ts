import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckboxNext,
  ScCheckboxNextField,
  ScField,
  ScFieldBody,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldTitle,
  ScLabel,
} from '@semantic-components/ui';

/** In a right-to-left page: the checkbox at the right. */
@Component({
  selector: 'app-rtl-checkbox-next-demo',
  imports: [
    FormField,
    ScCheckboxNext,
    ScCheckboxNextField,
    ScField,
    ScFieldBody,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldTitle,
    ScLabel,
  ],
  template: `
    <div dir="rtl" lang="ar" scFieldGroup class="max-w-sm">
      <div scCheckboxNextField>
        <input type="checkbox" scCheckboxNext [formField]="termsForm.terms" />
        <label scLabel>قبول الشروط والأحكام</label>
      </div>
      <div scCheckboxNextField>
        <input type="checkbox" scCheckboxNext [formField]="termsForm.agreed" />
        <label scLabel>قبول الشروط والأحكام</label>
        <p scFieldDescription>بالنقر على هذا المربع، فإنك توافق على الشروط.</p>
      </div>
      <div scCheckboxNextField>
        <input type="checkbox" scCheckboxNext disabled />
        <label scLabel>تفعيل الإشعارات</label>
      </div>
      <label scLabel>
        <div scField orientation="horizontal">
          <input
            type="checkbox"
            scCheckboxNext
            [formField]="termsForm.notifications"
          />
          <div scFieldBody>
            <div scFieldTitle>تفعيل الإشعارات</div>
            <p scFieldDescription>
              يمكنك تفعيل أو إلغاء تفعيل الإشعارات في أي وقت.
            </p>
          </div>
        </div>
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCheckboxNextDemo {
  protected readonly termsForm = form(
    signal({ terms: false, agreed: true, notifications: false }),
  );
}
