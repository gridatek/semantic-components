import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiArrowRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-button-demo',
  imports: [ScButton, SiArrowLeftIcon, SiArrowRightIcon],
  template: `
    <div dir="rtl" lang="ar" class="flex flex-wrap items-center gap-2">
      <button scButton>إرسال</button>
      <button scButton variant="outline">
        <svg
          siArrowLeftIcon
          data-icon="inline-start"
          class="rtl:-scale-x-100"
        ></svg>
        السابق
      </button>
      <button scButton variant="outline">
        التالي
        <svg
          siArrowRightIcon
          data-icon="inline-end"
          class="rtl:-scale-x-100"
        ></svg>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlButtonDemo {}
