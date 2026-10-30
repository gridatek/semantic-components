import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-rtl-input-demo',
  imports: [ScField, ScFieldDescription, ScFieldGroup, ScInput, ScLabel],
  template: `
    <div dir="rtl" lang="ar" scFieldGroup class="w-full max-w-xs">
      <div scField>
        <label scLabel>الاسم</label>
        <input scInput placeholder="جوردان لي" />
      </div>
      <div scField>
        <label scLabel>البريد الإلكتروني</label>
        <input
          scInput
          type="email"
          dir="ltr"
          placeholder="name&#64;example.com"
        />
        <p scFieldDescription>سنرسل التحديثات إلى هذا العنوان.</p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlInputDemo {}
