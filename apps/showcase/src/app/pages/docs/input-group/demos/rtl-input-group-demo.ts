import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScInputGroupText,
  ScLabel,
  ScSpinner,
  ScTextarea,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-input-group-demo',
  imports: [
    Dir,
    ScField,
    ScFieldDescription,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScInputGroupText,
    ScLabel,
    ScSpinner,
    ScTextarea,
    SiLoaderCircleIcon,
    SiSearchIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="grid w-full max-w-sm gap-6">
      <div scInputGroup class="max-w-xs">
        <input scInput placeholder="ابحث..." aria-label="بحث" />
        <div scInputGroupAddon>
          <svg siSearchIcon></svg>
        </div>
        <div scInputGroupAddon side="inline-end">١٢ نتيجة</div>
      </div>
      <div scInputGroup>
        <input scInput placeholder="جارٍ البحث..." aria-label="بحث جارٍ" />
        <div scInputGroupAddon side="inline-end">
          <svg scSpinner siLoaderCircleIcon aria-label="جارٍ التحميل"></svg>
        </div>
      </div>
      <div scField>
        <label scLabel>تعليق</label>
        <div scInputGroup>
          <textarea scTextarea placeholder="اكتب تعليقًا..."></textarea>
          <div scInputGroupAddon side="bottom">
            <span scInputGroupText>٠/٢٨٠</span>
            <button
              scInputGroupButton
              variant="default"
              size="sm"
              class="ms-auto"
            >
              نشر
            </button>
          </div>
        </div>
        <p scFieldDescription>سيظهر تعليقك للجميع.</p>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlInputGroupDemo {}
