import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNativeSelectNext,
  ScNativeSelectNextContainer,
  ScNativeSelectNextIcon,
  ScNativeSelectNextOption,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: its text from the right, the chevron at the left. */
@Component({
  selector: 'app-rtl-native-select-next-demo',
  imports: [
    ScField,
    ScLabel,
    ScNativeSelectNext,
    ScNativeSelectNextContainer,
    ScNativeSelectNextIcon,
    ScNativeSelectNextOption,
    SiChevronDownIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scField class="w-56">
        <label scLabel>الحالة</label>
        <div scNativeSelectNextContainer class="w-full">
          <select scNativeSelectNext>
            <option scNativeSelectNextOption value="">اختر الحالة</option>
            <option scNativeSelectNextOption value="todo">مهام</option>
            <option scNativeSelectNextOption value="in-progress">
              قيد التنفيذ
            </option>
            <option scNativeSelectNextOption value="done">منجز</option>
            <option scNativeSelectNextOption value="cancelled">ملغي</option>
          </select>
          <svg siChevronDownIcon scNativeSelectNextIcon></svg>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNativeSelectNextDemo {}
