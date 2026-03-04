import {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  viewChild,
  viewChildren,
} from '@angular/core';
import {
  SiBookOpenIcon,
  SiBriefcaseIcon,
  SiCheckIcon,
  SiChevronDownIcon,
  SiClockIcon,
  SiListChecksIcon,
  SiPlaneIcon,
  SiStarIcon,
  SiTagIcon,
  SiUserIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-multiselect-demo',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopup,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
    SiBookOpenIcon,
    SiBriefcaseIcon,
    SiCheckIcon,
    SiChevronDownIcon,
    SiClockIcon,
    SiListChecksIcon,
    SiPlaneIcon,
    SiStarIcon,
    SiTagIcon,
    SiUserIcon,
  ],
  template: `
    <div ngCombobox readonly class="flex justify-center">
      <div
        #origin
        class="bg-background text-foreground hover:bg-accent relative flex items-center rounded-lg border transition-colors"
      >
        <span
          class="pointer-events-none absolute start-3 flex items-center gap-2"
        >
          @switch (displayIcon()) {
            @case ('tag') {
              <svg siTagIcon class="size-4"></svg>
            }
            @case ('star') {
              <svg siStarIcon class="size-4"></svg>
            }
            @case ('briefcase') {
              <svg siBriefcaseIcon class="size-4"></svg>
            }
            @case ('user') {
              <svg siUserIcon class="size-4"></svg>
            }
            @case ('list-checks') {
              <svg siListChecksIcon class="size-4"></svg>
            }
            @case ('clock') {
              <svg siClockIcon class="size-4"></svg>
            }
            @case ('book-open') {
              <svg siBookOpenIcon class="size-4"></svg>
            }
            @case ('plane') {
              <svg siPlaneIcon class="size-4"></svg>
            }
          }
          <span class="text-sm">{{ displayValue() }}</span>
        </span>
        <input
          aria-label="Label dropdown"
          placeholder="Select a label"
          ngComboboxInput
          class="h-10 cursor-pointer border-none bg-transparent px-14 opacity-0 focus:outline-none"
        />
        <svg
          siChevronDownIcon
          class="text-muted-foreground pointer-events-none absolute end-3 size-4 transition-transform duration-150"
        ></svg>
      </div>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{
            origin,
            usePopover: 'inline',
            matchWidth: true,
          }"
          [cdkConnectedOverlayOpen]="true"
        >
          <div
            [class.invisible]="!combobox()?.expanded()"
            [class.max-h-0]="!combobox()?.expanded()"
            [class.overflow-hidden]="!combobox()?.expanded()"
            class="bg-popover text-popover-foreground mt-2 w-full rounded-lg border p-1 shadow-md transition-all duration-150"
          >
            <div
              ngListbox
              multi
              class="flex max-h-44 flex-col gap-0.5 overflow-auto"
            >
              @for (label of labels; track label.value) {
                <div
                  ngOption
                  [value]="label.value"
                  [label]="label.value"
                  class="hover:bg-accent data-[active=true]:bg-accent aria-selected:bg-primary/10 aria-selected:text-primary flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm outline-none"
                >
                  @switch (label.icon) {
                    @case ('tag') {
                      <svg siTagIcon class="me-2 size-4"></svg>
                    }
                    @case ('star') {
                      <svg siStarIcon class="me-2 size-4"></svg>
                    }
                    @case ('briefcase') {
                      <svg siBriefcaseIcon class="me-2 size-4"></svg>
                    }
                    @case ('user') {
                      <svg siUserIcon class="me-2 size-4"></svg>
                    }
                    @case ('list-checks') {
                      <svg siListChecksIcon class="me-2 size-4"></svg>
                    }
                    @case ('clock') {
                      <svg siClockIcon class="me-2 size-4"></svg>
                    }
                    @case ('book-open') {
                      <svg siBookOpenIcon class="me-2 size-4"></svg>
                    }
                    @case ('plane') {
                      <svg siPlaneIcon class="me-2 size-4"></svg>
                    }
                  }
                  <span class="flex-1">{{ label.value }}</span>
                  <svg
                    siCheckIcon
                    class="ms-2 size-4 [[ngOption]:not([aria-selected='true'])_&]:hidden"
                  ></svg>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMultiselectDemo {
  /** The combobox listbox popup. */
  listbox = viewChild<Listbox<string>>(Listbox);
  /** The options available in the listbox. */
  options = viewChildren<Option<string>>(Option);
  /** A reference to the ng aria combobox. */
  combobox = viewChild<Combobox<string>>(Combobox);

  /** The icon that is displayed in the combobox. */
  displayIcon = computed(() => {
    const values = this.listbox()?.values() || [];
    const label = this.labels.find((label) => label.value === values[0]);
    return label ? label.icon : '';
  });

  /** The string that is displayed in the combobox. */
  displayValue = computed(() => {
    const values = this.listbox()?.values() || [];
    if (values.length === 0) {
      return 'Select a label';
    }
    if (values.length === 1) {
      return values[0];
    }
    return `${values[0]} + ${values.length - 1} more`;
  });

  /** The labels that are available for selection. */
  labels = [
    { value: 'Important', icon: 'tag' },
    { value: 'Starred', icon: 'star' },
    { value: 'Work', icon: 'briefcase' },
    { value: 'Personal', icon: 'user' },
    { value: 'To Do', icon: 'list-checks' },
    { value: 'Later', icon: 'clock' },
    { value: 'Read', icon: 'book-open' },
    { value: 'Travel', icon: 'plane' },
  ];

  constructor() {
    // Scrolls to the active item when the active option changes.
    // The slight delay here is to ensure animations are done before scrolling.
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(
        () => option?.element.scrollIntoView({ block: 'nearest' }),
        50,
      );
    });
    // Resets the listbox scroll position when the combobox is closed.
    afterRenderEffect(() => {
      if (!this.combobox()?.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}
