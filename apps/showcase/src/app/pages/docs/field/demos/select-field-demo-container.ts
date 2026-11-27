import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SelectFieldDemo } from './select-field-demo';

@Component({
  selector: 'app-select-field-demo-container',
  imports: [DemoContainer, SelectFieldDemo],
  template: `
    <app-demo-container
      title="Select"
      demoUrl="/demos/field/select-field-demo"
      [code]="code"
    >
      <app-select-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectFieldDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScSelect,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A select in a field: named by the field’s label, described by its description. */
@Component({
  selector: 'app-select-field-demo',
  imports: [
    ScLabel,
    ScField,
    ScFieldDescription,
    ScSelect,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div class="w-full max-w-xs">
      <div scField>
        <label scLabel>Department</label>
        <div scSelect [(value)]="department" [items]="departments">
          <button scSelectTrigger>
            <span scSelectValue></span>
            <svg scSelectIcon siChevronDownIcon></svg>
          </button>
          <ng-template scSelectPortal>
            <div scSelectPopup>
              <div scSelectList>
                @for (item of departments; track item.value) {
                  <div scSelectItem [value]="item.value">
                    <span scSelectItemText>{{ item.label }}</span>
                    <span scSelectItemIndicator><svg siCheckIcon></svg></span>
                  </div>
                }
              </div>
            </div>
          </ng-template>
        </div>
        <p scFieldDescription>Select your department or area of work.</p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectFieldDemo {
  private readonly departments = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
  ];
  private readonly department = signal('');
}`;
}
