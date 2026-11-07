import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui';

/** In a right-to-left page: its text from the right. */
@Component({
  selector: 'app-rtl-textarea-demo',
  imports: [ScField, ScFieldDescription, ScLabel, ScTextarea],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scField class="w-full max-w-xs">
        <label scLabel>التعليقات</label>
        <textarea
          scTextarea
          placeholder="تعليقاتك تساعدنا على التحسين..."
          rows="4"
        ></textarea>
        <p scFieldDescription>شاركنا أفكارك حول خدمتنا.</p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTextareaDemo {}
