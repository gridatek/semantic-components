import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckbox,
  ScCheckboxField,
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldTitle,
  ScLabel,
} from '@semantic-components/ui';

/** In a right-to-left page: the checkbox at the right. */
@Component({
  selector: 'app-rtl-checkbox-demo',
  imports: [
    Dir,
    FormField,
    ScCheckbox,
    ScCheckboxField,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldTitle,
    ScLabel,
  ],
  template: `
    <div dir="rtl" lang="ar" scFieldGroup class="max-w-sm">
      <div scCheckboxField>
        <input scCheckbox [formField]="termsForm.terms" />
        <label scLabel>قبول الشروط والأحكام</label>
      </div>
      <div scCheckboxField>
        <input scCheckbox [formField]="termsForm.agreed" />
        <label scLabel>قبول الشروط والأحكام</label>
        <p scFieldDescription>بالنقر على هذا المربع، فإنك توافق على الشروط.</p>
      </div>
      <div scCheckboxField>
        <input scCheckbox disabled />
        <label scLabel>تفعيل الإشعارات</label>
      </div>
      <label scLabel>
        <div scField orientation="horizontal">
          <input scCheckbox [formField]="termsForm.notifications" />
          <div scFieldContentWrapper>
            <div scFieldTitle>تفعيل الإشعارات</div>
            <p scFieldDescription>
              يمكنك تفعيل أو إلغاء تفعيل الإشعارات في أي وقت.
            </p>
          </div>
        </div>
      </label>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCheckboxDemo {
  protected readonly termsForm = form(
    signal({ terms: false, agreed: true, notifications: false }),
  );
}
