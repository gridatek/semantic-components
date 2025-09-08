import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ConnectedPosition, Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ScOptionComponent } from './option';

@Component({
  selector: 'sc-select2',
  template: `
    <div class="relative">
      <!-- Select Trigger -->
      <button
        class="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
        #trigger
        [class.border-gray-400]="isOpen"
        (click)="toggle()"
        (keydown)="onTriggerKeydown($event)"
        type="button"
      >
        <span class="block truncate" [class.text-gray-500]="!selectedOption">
          {{ selectedOption ? selectedOption.content : placeholder }}
        </span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-400 transition-transform duration-200"
            [class.rotate-180]="isOpen"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </span>
      </button>

      <!-- Dropdown Template -->
      <ng-template #dropdownTemplate>
        <div
          class="py-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-50"
          style="min-width: 100%"
          role="listbox"
        >
          <sc-option2
            *ngFor="let option of options; trackBy: trackByValue"
            [value]="option.value"
            [attr.aria-selected]="option.value === value"
            (click)="selectOption(option)"
          >
            {{ option.content }}
          </sc-option2>
        </div>
      </ng-template>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, OverlayModule, ScOptionComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScSelectComponent),
      multi: true,
    },
  ],
})
export class ScSelectComponent implements AfterContentInit, ControlValueAccessor, OnDestroy {
  @Input() placeholder: string = 'Select an option';
  @Output() selectionChange = new EventEmitter<any>();

  @ContentChildren(ScOptionComponent) optionComponents!: QueryList<ScOptionComponent>;
  @ViewChild('trigger') triggerElement!: ElementRef;
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;

  options: ScOptionComponent[] = [];
  selectedOption: ScOptionComponent | null = null;
  value: any = null;
  isOpen = false;

  private overlayRef: OverlayRef | null = null;
  private onChange = (value: any) => {};
  private onTouched = () => {};
  public keyManager!: ActiveDescendantKeyManager<ScOptionComponent>;

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngAfterContentInit() {
    this.options = this.optionComponents.toArray();
    this.keyManager = new ActiveDescendantKeyManager(this.optionComponents)
      .withWrap()
      .withTypeAhead();

    // Subscribe to key manager changes to update active styles
    this.keyManager.change.subscribe(() => {
      // Clear all active states first
      this.options.forEach((option) => option.setInactiveStyles());
      // Set active state for current item
      if (this.keyManager.activeItem) {
        this.keyManager.activeItem.setActiveStyles();
      }
    });

    this.optionComponents.changes.subscribe(() => {
      this.options = this.optionComponents.toArray();
      this.keyManager.updateActiveItem(0);
    });
  }

  ngOnDestroy() {
    this.closeDropdown();
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value;
    this.selectedOption = this.options.find((option) => option.value === value) || null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggle() {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    if (this.isOpen) return;

    const positions: ConnectedPosition[] = [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 4,
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: -4,
      },
    ];

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.triggerElement)
      .withPositions(positions)
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    const portal = new TemplatePortal(this.dropdownTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeDropdown();
    });

    this.isOpen = true;

    // Initialize key manager after overlay is attached
    setTimeout(() => {
      this.keyManager.setFirstItemActive();
    }, 0);
  }

  closeDropdown() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.isOpen = false;
  }

  selectOption(option: ScOptionComponent) {
    this.value = option.value;
    this.selectedOption = option;
    this.onChange(this.value);
    this.onTouched();
    this.selectionChange.emit(this.value);
    this.closeDropdown();
  }

  onTriggerKeydown(event: KeyboardEvent) {
    if (this.isOpen) {
      // Handle keyboard navigation when dropdown is open
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const activeItem = this.keyManager.activeItem;
        if (activeItem) {
          this.selectOption(activeItem);
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        this.closeDropdown();
      } else {
        this.keyManager.onKeydown(event);
      }
    } else {
      // Open dropdown on Enter, Space, or Arrow keys
      if (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp'
      ) {
        event.preventDefault();
        this.openDropdown();
      }
    }
  }

  trackByValue(index: number, option: ScOptionComponent): any {
    return option.value;
  }
}
