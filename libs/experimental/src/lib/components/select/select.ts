import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

import { ScOption } from './option';

@Component({
  selector: 'lib-select',
  imports: [],
  template: `
    <div class="relative w-full max-w-xs">
      <div
        class="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        [attr.aria-expanded]="isOpen"
        [attr.aria-activedescendant]="activeItemId"
        (click)="toggle()"
        (keydown)="onKeydown($event)"
        role="combobox"
        aria-haspopup="listbox"
        tabindex="0"
        aria-controls=""
      >
        <span class="block truncate">{{ displayValue }}</span>
        <svg
          class="w-5 h-5 ml-2 -mr-1 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      @if (isOpen) {
        <div
          class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
          role="listbox"
        >
          <ng-content />
        </div>
      }
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelect implements AfterContentInit {
  readonly placeholder = input('Select an option');
  readonly displayWith = input<(value: any) => string>((value) => value?.toString() || '');

  readonly selectionChange = output<any>();

  @ContentChildren(ScOption) options!: QueryList<ScOption>;

  selectedValue: any = null;
  isOpen = false;
  activeItemId: string | null = null;

  private keyManager!: ActiveDescendantKeyManager<ScOption>;

  get displayValue(): string {
    return this.selectedValue !== null
      ? this.displayWith()(this.selectedValue)
      : this.placeholder();
  }

  ngAfterContentInit() {
    this.initKeyManager();

    // Listen for option changes (e.g., *ngFor items being added)
    this.options.changes.subscribe(() => {
      this.initKeyManager();
    });

    // Set up option click listeners
    this.options.forEach((option, index) => {
      this.setupOptionListeners(option, index);
    });
  }

  private setupOptionListeners(option: ScOption, index: number) {
    option.setInactiveStyles();

    // Use renderer to add click event listener
    const element = option['elementRef']?.nativeElement;
    if (element) {
      element.addEventListener('click', () => {
        this.selectOption(option.value(), option.label(), index);
      });
    }
  }

  private initKeyManager() {
    if (this.options?.length) {
      this.keyManager = new ActiveDescendantKeyManager(this.options)
        .withWrap()
        .withTypeAhead()
        .withHorizontalOrientation(null);

      this.keyManager.change.subscribe((index) => {
        if (index !== -1) {
          this.activeItemId = `option-${index}`;
        } else {
          this.activeItemId = null;
        }
      });
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => {
        this.initKeyManager();

        // Find and activate the currently selected option
        if (this.selectedValue !== null) {
          const selectedIndex = this.options
            .toArray()
            .findIndex((option) => option.value() === this.selectedValue);
          if (selectedIndex !== -1) {
            this.keyManager.setActiveItem(selectedIndex);
          }
        }
      });
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (!this.isOpen) {
      if (
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === ' ' ||
        event.key === 'Enter'
      ) {
        this.isOpen = true;
        event.preventDefault();
        return;
      }
    } else {
      //TODO maybe an error here
      this.keyManager?.onKeydown(event);
      event.preventDefault();

      if (event.key === 'Enter' || event.key === ' ') {
        const activeItem = this.keyManager?.activeItem;
        const activeIndex = this.keyManager?.activeItemIndex;
        if (activeItem && activeIndex !== null && activeIndex !== -1) {
          this.selectOption(activeItem.value(), activeItem.label(), activeIndex);
          event.preventDefault();
        }
      }

      if (event.key === 'Escape') {
        this.isOpen = false;
        event.preventDefault();
      }
    }
  }

  selectOption(value: any, label: string, index: number) {
    this.selectedValue = value;
    this.isOpen = false;
    this.selectionChange.emit(value);
  }
}
