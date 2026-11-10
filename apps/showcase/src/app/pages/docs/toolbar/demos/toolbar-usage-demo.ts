import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScLink,
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
  ScToggle,
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronsUpDownIcon,
  SiTextAlignEndIcon,
  SiTextAlignStartIcon,
} from '@semantic-icons/lucide-icons';

/** Widgets of every kind in one toolbar: toggles in a group, buttons in a group, a select, a link. */
@Component({
  selector: 'app-toolbar-usage-demo',
  imports: [
    ScButton,
    ScLink,
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
    ScToggle,
    ScToolbar,
    ScToolbarSeparator,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    SiCheckIcon,
    SiChevronsUpDownIcon,
    SiTextAlignEndIcon,
    SiTextAlignStartIcon,
  ],
  template: `
    <div scToolbar aria-label="Spreadsheet formatting">
      <div scToolbarWidgetGroup aria-label="Alignment" [(value)]="alignment">
        <button scToolbarWidget scToggle size="sm" value="start">
          <svg siTextAlignStartIcon></svg>
          <span class="sr-only">Align start</span>
        </button>
        <button scToolbarWidget scToggle size="sm" value="end">
          <svg siTextAlignEndIcon></svg>
          <span class="sr-only">Align end</span>
        </button>
      </div>
      <div scToolbarSeparator></div>
      <div scToolbarWidgetGroup aria-label="Number format">
        <button scToolbarWidget scButton variant="ghost" size="sm">
          $<span class="sr-only">Format as currency</span>
        </button>
        <button scToolbarWidget scButton variant="ghost" size="sm">
          %<span class="sr-only">Format as percent</span>
        </button>
      </div>
      <div scToolbarSeparator></div>
      <div scSelect [(value)]="font" [items]="fonts">
        <div scToolbarWidget scSelectTrigger aria-label="Font" class="h-8 w-32">
          <span scSelectValue></span>
          <svg scSelectIcon siChevronsUpDownIcon></svg>
        </div>
        <ng-template scSelectPortal>
          <div scSelectPopup>
            <div scSelectList>
              @for (item of fonts; track item.value) {
                <div scSelectItem [value]="item.value">
                  <span scSelectItemText>{{ item.label }}</span>
                  <span scSelectItemIndicator>
                    <svg siCheckIcon></svg>
                  </span>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
      <div scToolbarSeparator></div>
      <a scToolbarWidget scLink size="sm" href="#">Edited 51m ago</a>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarUsageDemo {
  protected readonly alignment = signal(['start']);
  protected readonly fonts = [
    { value: 'helvetica', label: 'Helvetica' },
    { value: 'arial', label: 'Arial' },
  ];
  protected readonly font = signal('helvetica');
}
