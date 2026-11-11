import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlNativeSelectDemo } from './rtl-native-select-demo';

@Component({
  selector: 'app-rtl-native-select-demo-container',
  imports: [DemoContainer, RtlNativeSelectDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/native-select/rtl-native-select-demo"
      [code]="code"
    >
      <app-rtl-native-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNativeSelectDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: its text from the right, the chevron at the left. */
@Component({
  selector: 'app-rtl-native-select-demo',
  imports: [
    ScField,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scField class="w-56">
        <label scLabel>الحالة</label>
        <div scNativeSelectContainer class="w-full">
          <select scNativeSelect>
            <option scNativeSelectOption value="">اختر الحالة</option>
            <option scNativeSelectOption value="todo">مهام</option>
            <option scNativeSelectOption value="in-progress">
              قيد التنفيذ
            </option>
            <option scNativeSelectOption value="done">منجز</option>
            <option scNativeSelectOption value="cancelled">ملغي</option>
          </select>
          <svg siChevronDownIcon scNativeSelectIcon></svg>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNativeSelectDemo {}`;
}
