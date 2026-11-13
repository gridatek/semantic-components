import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScMenu,
  ScMenuContent,
  ScMenuItemIndicator,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuTrigger,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiArrowUpIcon,
  SiCheckIcon,
  SiChevronDownIcon,
} from '@semantic-icons/lucide-icons';

/** Right to left: the menus at the field's left end, opening from their start. */
@Component({
  selector: 'app-rtl-model-selector-demo',
  imports: [
    Dir,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScMenu,
    ScMenuContent,
    ScMenuItemIndicator,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuTrigger,
    ScTextarea,
    SiArrowUpIcon,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="mx-auto w-full max-w-lg py-6">
      <div scInputGroup>
        <textarea
          scTextarea
          class="p-3"
          placeholder="اطلب من الوكيل تعديل الشيفرة..."
          aria-label="الرسالة"
        ></textarea>
        <div scInputGroupAddon side="bottom">
          <div scMenuProvider alignment="start" class="ms-auto">
            <button
              scInputGroupButton
              scMenuTrigger
              type="button"
              size="sm"
              variant="outline"
            >
              <span class="sr-only">الجهد: </span>
              {{ effort() }}
              <svg siChevronDownIcon></svg>
            </button>
            <ng-template scMenuPortal>
              <div scMenu dir="rtl" lang="ar" class="w-36">
                <ng-template scMenuContent>
                  <div scMenuRadioGroup [(value)]="effort">
                    @for (item of efforts; track item) {
                      <div scMenuRadioItem closeOnClick [value]="item">
                        <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                        {{ item }}
                      </div>
                    }
                  </div>
                </ng-template>
              </div>
            </ng-template>
          </div>
          <button
            scInputGroupButton
            type="button"
            size="icon-sm"
            variant="default"
            class="rounded-full"
          >
            <svg siArrowUpIcon></svg>
            <span class="sr-only">إرسال</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlModelSelectorDemo {
  protected readonly efforts = ['منخفض', 'متوسط', 'مرتفع'];
  protected readonly effort = signal<string | null>('متوسط');
}
