import { ActiveDescendantKeyManager, _IdGenerator } from '@angular/cdk/a11y';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  forwardRef,
  inject,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

import { ScAutocompleteMultiInput } from '../autocomplete/autocomplete-multi-input';
import { ScAutocompleteOption } from '../autocomplete/autocomplete-option';
import { ScAutocompletePanel } from '../autocomplete/autocomplete-panel';
import { ScAutocompleteItem } from '../autocomplete/autocomplete-types';

@Component({
  selector: 'sc-multi-select',
  imports: [OverlayModule, ScAutocompleteMultiInput, ScAutocompletePanel],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScMultiSelect),
      multi: true,
    },
  ],
  template: `
    <div class="multi-select-container" #container>
      <div class="relative">
        <!-- Multi Select Input with Chips -->
        <sc-autocomplete-multi-input
          #multiInput
          #trigger="cdkOverlayOrigin"
          [inputId]="id()"
          [placeholder]="placeholder()"
          [selectedValues]="selectedValues"
          [items]="items()"
          [isOpen]="isOpen"
          [listboxId]="listboxId"
          [activeItemId]="activeItemId"
          (inputChange)="handleInput($event)"
          (focusChange)="open()"
          (blurChange)="handleBlur()"
          (keydownChange)="handleKeydown($event)"
          (chipRemoved)="removeChip($event)"
          cdkOverlayOrigin
        />

        <!-- Dropdown Panel using CDK Overlay -->
        <ng-template
          [cdkConnectedOverlayOrigin]="triggerElement()"
          [cdkConnectedOverlayOpen]="isOpen"
          [cdkConnectedOverlayWidth]="triggerWidth + 'px'"
          [cdkConnectedOverlayMinWidth]="triggerWidth + 'px'"
          [cdkConnectedOverlayHasBackdrop]="true"
          [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
          [cdkConnectedOverlayPositions]="positions"
          (backdropClick)="close()"
          (detach)="close()"
          cdkConnectedOverlay
        >
          <sc-autocomplete-panel
            #panel
            [listboxId]="listboxId"
            [filteredItems]="filteredItems"
            [multiple]="true"
            [grouped]="grouped()"
            [selectedValue]="null"
            [selectedValues]="selectedValues"
            [isLoading]="isLoading"
            [style.width.px]="triggerWidth"
            [style.min-width.px]="triggerWidth"
            [style.max-width.px]="triggerWidth"
            (itemSelected)="selectItem($event)"
            (itemActiveChange)="setActiveItem($event)"
          />
        </ng-template>
      </div>

      <!-- Status Display -->
      @if (showStatus()) {
        <p class="mt-2 text-sm text-gray-500">
          Selected count:
          <span class="font-medium">{{ selectedValues.size }}</span>
        </p>
      }
      @if (async() && showStatus()) {
        <p class="mt-2 text-sm text-gray-500">
          Status:
          <span class="font-medium">{{ isLoading ? 'Loading...' : 'Ready' }}</span>
        </p>
      }
    </div>
  `,
  host: {
    'data-slot': 'control',
    class: 'block',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiSelect implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  readonly idInput = input<string>(inject(_IdGenerator).getId('sc-multi-select-'), {
    alias: 'id',
  });

  readonly id = linkedSignal(() => this.idInput());

  readonly placeholderInput = input<string>('Type to search...', {
    alias: 'placeholder',
  });
  readonly placeholder = linkedSignal(() => this.placeholderInput());
  readonly items = input<(string | ScAutocompleteItem)[]>([]);
  readonly async = input<boolean>(false);
  readonly grouped = input<boolean>(false);
  readonly showStatus = input<boolean>(true);
  readonly asyncSearchFn = input<(query: string) => Promise<ScAutocompleteItem[]>>();

  readonly selectionChange = output<string[]>();
  readonly searchChange = output<string>();

  readonly multiInput = viewChild<ScAutocompleteMultiInput>('multiInput');
  readonly panel = viewChild<ScAutocompletePanel>('panel');
  readonly containerElement = viewChild.required<ElementRef<HTMLDivElement>>('container');
  readonly triggerElement = viewChild.required('trigger', { read: ElementRef });

  selectedValues: Set<string> = new Set();
  filteredItems: (string | ScAutocompleteItem)[] = [];
  isOpen = false;
  isLoading = false;
  listboxId = `listbox-${Math.random().toString(36).substr(2, 9)}`;
  activeItemId: string | null = null;
  triggerWidth = 0;

  keyManager!: ActiveDescendantKeyManager<ScAutocompleteOption>;
  private searchSubject = new BehaviorSubject<string>('');
  private destroy$ = new Subject<void>();
  private onChange: any = () => {};
  private onTouched: any = () => {};

  // CDK Overlay positions
  positions: ConnectedPosition[] = [
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

  ngOnInit() {
    this.filteredItems = [...this.items()];
    this.setupSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.updateTriggerWidth();
    this.setupKeyManager();
  }

  private setupSearch() {
    this.searchSubject
      .pipe(debounceTime(200), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(async (searchTerm) => {
        this.searchChange.emit(searchTerm);

        if (this.async() && this.asyncSearchFn()) {
          this.isLoading = true;
          try {
            const results = await this.asyncSearchFn()!(searchTerm);
            this.filteredItems = results;
          } catch (error) {
            console.error('Search failed:', error);
            this.filteredItems = [];
          } finally {
            this.isLoading = false;
          }
        } else {
          this.filteredItems = this.filterItems(searchTerm);
        }

        this.setupKeyManager();
      });
  }

  private filterItems(searchTerm: string): (string | ScAutocompleteItem)[] {
    if (!searchTerm) return [...this.items()];

    const lowerSearchTerm = searchTerm.toLowerCase();
    return this.items().filter((item) => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(lowerSearchTerm);
      }
      return (
        item.label.toLowerCase().includes(lowerSearchTerm) ||
        item.value.toLowerCase().includes(lowerSearchTerm) ||
        item.subtitle?.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }

  private setupKeyManager() {
    if (this.panel()) {
      const options = this.panel()!.options;
      if (options.length > 0) {
        this.keyManager = new ActiveDescendantKeyManager<ScAutocompleteOption>(options).withWrap();
        this.keyManager.change.pipe(takeUntil(this.destroy$)).subscribe((activeIndex) => {
          const activeOption = options.toArray()[activeIndex];
          this.activeItemId = activeOption ? this.getItemValue(activeOption.item()) : null;
        });
      }
    }
  }

  private updateTriggerWidth() {
    const triggerEl = this.triggerElement()?.nativeElement;
    if (triggerEl) {
      this.triggerWidth = triggerEl.offsetWidth;
    }
  }

  open() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.updateTriggerWidth();
      setTimeout(() => this.setupKeyManager(), 0);
    }
  }

  close() {
    this.isOpen = false;
    this.activeItemId = null;
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  handleBlur() {
    this.onTouched();
    // Small delay to allow for option selection
    setTimeout(() => {
      if (!this.isOpen) {
        this.close();
      }
    }, 150);
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.isOpen) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter') {
        this.open();
      }
      return;
    }

    if (this.keyManager) {
      if (event.key === 'ArrowDown') {
        this.keyManager.setNextItemActive();
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        this.keyManager.setPreviousItemActive();
        event.preventDefault();
      } else if (event.key === 'Enter') {
        const activeItem = this.keyManager.activeItem;
        if (activeItem) {
          this.selectItem(activeItem.item());
        }
        event.preventDefault();
      } else if (event.key === 'Escape') {
        this.close();
        event.preventDefault();
      }
    }
  }

  selectItem(item: string | ScAutocompleteItem) {
    const value = this.getItemValue(item);
    if (this.selectedValues.has(value)) {
      this.selectedValues.delete(value);
    } else {
      this.selectedValues.add(value);
    }

    const selectedArray = Array.from(this.selectedValues);
    this.onChange(selectedArray);
    this.selectionChange.emit(selectedArray);
  }

  removeChip(value: string) {
    this.selectedValues.delete(value);
    const selectedArray = Array.from(this.selectedValues);
    this.onChange(selectedArray);
    this.selectionChange.emit(selectedArray);
  }

  setActiveItem(item: string | ScAutocompleteItem) {
    this.activeItemId = this.getItemValue(item);
  }

  getItemValue(item: string | ScAutocompleteItem): string {
    return typeof item === 'string' ? item : item.value;
  }

  getItemLabel(value: string): string {
    const item = this.items().find((i) => {
      if (typeof i === 'string') return i === value;
      return i.value === value;
    });

    if (item) {
      return typeof item === 'string' ? item : item.label;
    }

    return value;
  }

  // ControlValueAccessor implementation
  writeValue(value: string[] | null): void {
    if (value && Array.isArray(value)) {
      this.selectedValues = new Set(value);
    } else {
      this.selectedValues = new Set();
    }
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if needed
  }
}
