import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  contentChildren,
  forwardRef,
  input,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { ScOption } from './option';

@Component({
  selector: 'sc-select',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScSelect),
      multi: true,
    },
  ],
  template: `
    <div class="relative w-full">
      <!-- Select Trigger -->
      <div
        class="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        #trigger
        [class.border-blue-500]="isOpen"
        [attr.aria-expanded]="isOpen"
        [attr.aria-haspopup]="true"
        [attr.aria-controls]="'dropdown-' + componentId"
        [attr.aria-activedescendant]="activeDescendant"
        (click)="toggle()"
        role="combobox"
        tabindex="0"
      >
        <span class="truncate" [class.text-gray-400]="!selectedOption">
          {{ selectedOption ? selectedOption.getLabel() : placeholder() }}
        </span>
        <svg
          class="w-5 h-5 text-gray-400 transition-transform duration-200"
          [class.rotate-180]="isOpen"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <!-- Dropdown Panel -->
      @if (isOpen) {
        <div
          class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-in slide-in-from-top-2"
          [id]="'dropdown-' + componentId"
          [attr.aria-labelledby]="'trigger-' + componentId"
          role="listbox"
        >
          <div class="max-h-60 overflow-y-auto py-1">
            <ng-content />
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      @keyframes animate-in {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-in {
        animation: animate-in 0.2s ease-out;
      }

      @keyframes slide-in-from-top-2 {
        from {
          transform: translateY(-0.5rem);
        }
        to {
          transform: translateY(0);
        }
      }

      .slide-in-from-top-2 {
        animation: slide-in-from-top-2 0.2s ease-out;
      }
    `,
  ],
})
export class ScSelect implements AfterContentInit, ControlValueAccessor, OnDestroy {
  readonly placeholder = input('Select an option');
  readonly options = contentChildren(ScOption);
  readonly trigger = viewChild.required<ElementRef>('trigger');

  isOpen = false;
  selectedOption: ScOption | null = null;
  keyManager!: ActiveDescendantKeyManager<ScOption>;
  activeDescendant: string | null = null;
  componentId = Math.random().toString(36).substr(2, 9);

  private destroy$ = new Subject<void>();
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterContentInit() {
    this.keyManager = new ActiveDescendantKeyManager(this.options()).withWrap().withTypeAhead();

    // Set up option click handlers
    this.options().forEach((option) => {
      option.element.nativeElement.addEventListener('click', () => {
        this.selectOption(option);
      });
    });

    // Update active descendant for screen readers and scroll to active item
    this.keyManager.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const activeItem = this.keyManager.activeItem;
      this.activeDescendant = activeItem ? activeItem.id() : null;

      // Scroll active item into view
      if (activeItem) {
        this.scrollToOption(activeItem);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private scrollToOption(option: ScOption) {
    const optionEl = option.element.nativeElement;
    const panel = optionEl.parentElement;

    if (!panel) return;

    const panelTop = panel.scrollTop;
    const panelBottom = panelTop + panel.clientHeight;
    const optionTop = optionEl.offsetTop;
    const optionBottom = optionTop + optionEl.clientHeight;

    if (optionTop < panelTop) {
      // Option is above visible area
      panel.scrollTop = optionTop;
    } else if (optionBottom > panelBottom) {
      // Option is below visible area
      panel.scrollTop = optionBottom - panel.clientHeight;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.isOpen && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')) {
      event.preventDefault();
      this.open();
      return;
    }

    if (this.isOpen) {
      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (this.keyManager.activeItem) {
            this.selectOption(this.keyManager.activeItem);
          }
          break;
        case 'Escape':
          event.preventDefault();
          this.close();
          this.trigger().nativeElement.focus();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          event.preventDefault();
          this.keyManager.onKeydown(event);
          break;
        case 'Tab':
          this.close();
          break;
        default:
          this.keyManager.onKeydown(event);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.trigger().nativeElement.contains(event.target) && this.isOpen) {
      this.close();
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    // Set initial active item
    if (this.selectedOption) {
      const index = this.options().indexOf(this.selectedOption);
      if (index >= 0) {
        this.keyManager.setActiveItem(index);
        // Scroll to selected option after a tick to ensure DOM is updated
        setTimeout(() => this.scrollToOption(this.selectedOption!), 0);
      }
    } else {
      this.keyManager.setFirstItemActive();
    }
  }

  close() {
    this.isOpen = false;
    this.keyManager.setActiveItem(-1);
    this.activeDescendant = null;
  }

  selectOption(option: ScOption) {
    if (option.disabled) return;

    // Update selection state
    this.options().forEach((opt) => opt.selected.set(false));
    option.selected.set(true);
    this.selectedOption = option;

    // Emit value
    this.onChange(option.value());
    this.onTouched();

    // Close dropdown
    this.close();
    this.trigger().nativeElement.focus();
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    const option = this.options()?.find((opt) => opt.value() === value);
    if (option) {
      this.selectedOption = option;
      option.selected.set(true);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle disabled state if needed
  }
}
