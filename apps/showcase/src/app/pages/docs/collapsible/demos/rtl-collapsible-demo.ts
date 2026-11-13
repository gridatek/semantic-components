import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScFrame,
} from '@semantic-components/ui';
import { SiChevronsUpDownIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page. */
@Component({
  selector: 'app-rtl-collapsible-demo',
  imports: [
    Dir,
    ScButton,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScFrame,
    SiChevronsUpDownIcon,
  ],
  template: `
    <div dir="rtl" lang="ar">
      <div scCollapsible [(open)]="open" class="flex w-[350px] flex-col gap-2">
        <div class="flex items-center justify-between gap-4 ps-4">
          <h3 class="text-sm font-semibold">الطلب #4189</h3>
          <button scButton scCollapsibleTrigger variant="ghost" size="icon-sm">
            <svg siChevronsUpDownIcon></svg>
            <span class="sr-only">إظهار التفاصيل</span>
          </button>
        </div>
        <div
          scFrame
          class="flex items-center justify-between px-4 py-2 text-sm"
        >
          <span class="text-muted-foreground">الحالة</span>
          <span class="font-medium">تم الشحن</span>
        </div>
        <div scCollapsiblePanel class="-m-px flex flex-col gap-2 p-px">
          <div scFrame class="px-4 py-2 text-sm">
            <p class="font-medium">عنوان الشحن</p>
            <p class="text-muted-foreground">100 Market St, San Francisco</p>
          </div>
          <div scFrame class="px-4 py-2 text-sm">
            <p class="font-medium">العناصر</p>
            <p class="text-muted-foreground">2x سماعات الاستوديو</p>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCollapsibleDemo {
  protected readonly open = signal(false);
}
