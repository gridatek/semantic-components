import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiArrowRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-link-demo',
  imports: [ScLink, SiArrowLeftIcon, SiArrowRightIcon],
  template: `
    <div dir="rtl" lang="ar" class="flex flex-wrap items-center gap-2">
      <a scLink href="/docs/components/button">الأزرار</a>
      <a scLink variant="outline" href="/docs/components/badge">
        <svg
          siArrowLeftIcon
          data-icon="inline-start"
          class="rtl:-scale-x-100"
        ></svg>
        السابق
      </a>
      <a scLink variant="outline" href="/docs/components/card">
        التالي
        <svg
          siArrowRightIcon
          data-icon="inline-end"
          class="rtl:-scale-x-100"
        ></svg>
      </a>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlLinkDemo {}
