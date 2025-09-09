import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewEncapsulation,
  computed,
  contentChildren,
  forwardRef,
  input,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn } from '@semantic-components/utils';
import { Subject, takeUntil } from 'rxjs';

import { ScOption } from './option';
import { ScSelectContent } from './select-content';
import { ScSelectDropdown } from './select-dropdown';
import { ScSelectTrigger } from './select-trigger';
import { ScSelectValue } from './select-value';

@Component({
  selector: 'sc-select',
  imports: [ScSelectTrigger, ScSelectValue, ScSelectDropdown, ScSelectContent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScSelect),
      multi: true,
    },
  ],
  template: `
    <!-- Select Trigger -->
    <button
      #trigger
      [isOpen]="isOpen"
      [attr.aria-expanded]="isOpen"
      [attr.aria-haspopup]="true"
      [attr.aria-controls]="'dropdown-' + componentId"
      [attr.aria-activedescendant]="activeDescendant"
      (click)="toggle()"
      sc-select-trigger
    >
      <span [placeholder]="placeholder()" sc-select-value>
        {{ selectedOption ? selectedOption.getLabel() : placeholder() }}
      </span>
      <svg
        class="h-4 w-4 opacity-50"
        [class.rotate-180]="isOpen"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <!-- Dropdown Panel -->
    @if (isOpen) {
      <div
        [id]="'dropdown-' + componentId"
        [attr.aria-labelledby]="'trigger-' + componentId"
        sc-select-dropdown
      >
        <div sc-select-content>
          <ng-content />
        </div>
      </div>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelect implements AfterContentInit, ControlValueAccessor, OnDestroy {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('block relative w-full', this.classInput()));

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
