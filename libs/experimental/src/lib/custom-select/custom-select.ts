import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import {
  CdkOverlayOrigin,
  Overlay,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  inject,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';

import { filter, takeUntil } from 'rxjs/operators';

import { Subject, fromEvent } from 'rxjs';

import { CustomOption } from './custom-option';

@Component({
  selector: 'sc-custom-select',
  imports: [OverlayModule],
  template: `
    <div
      class="flex justify-between items-center px-3 py-2 border border-gray-300 rounded cursor-pointer bg-white min-w-[120px] relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      #trigger="cdkOverlayOrigin"
      (click)="toggleDropdown()"
      (keydown)="onKeydown($event)"
      cdkOverlayOrigin
      tabindex="0"
    >
      <div class="select-value truncate">
        {{ selectedOption ? selectedOption.label : placeholder() }}
      </div>
      <div
        class="ml-2 text-gray-500 transition-transform duration-200"
        [class.transform]="isOpen"
        [class.rotate-180]="isOpen"
      >
        <svg
          class="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <ng-template #optionsTemplate>
      <div
        class="bg-white rounded shadow-lg max-h-60 overflow-y-auto z-50"
        [style.width.px]="selectWidth"
      >
        <div class="py-1">
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelect implements AfterContentInit, OnDestroy, AfterViewInit {
  private readonly overlay = inject(Overlay);
  private readonly viewportRuler = inject(ViewportRuler);
  private readonly elementRef = inject(ElementRef);

  readonly placeholder = input('Select an option');
  readonly valueInput = input<any>(null, {
    alias: 'value',
  });

  readonly value = linkedSignal<any>(() => this.valueInput());

  readonly valueChange = output<any>();
  readonly opened = output<void>();
  readonly closed = output<void>();

  @ContentChildren(CustomOption) optionComponents!: QueryList<CustomOption>;

  readonly trigger = viewChild.required<CdkOverlayOrigin>('trigger');

  readonly optionsTemplate = viewChild.required<TemplateRef<unknown>>('optionsTemplate');

  readonly optionsElement = viewChild.required('optionsTemplate', { read: ElementRef });

  selectedOption: CustomOption | null = null;
  isOpen = false;
  overlayRef: OverlayRef | null = null;
  selectWidth = 0;

  private readonly destroy$ = new Subject<void>();
  private currentIndex = -1;

  private readonly viewContainerRef = inject(ViewContainerRef);

  ngAfterContentInit() {
    // Update when options change (useful for dynamic options)
    this.optionComponents.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateSelectedOption();
    });

    // Set up option selection listener
    this.optionComponents.forEach((option) => {
      option.selected.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.selectOption(option);
      });
    });

    // Set initial selection
    this.updateSelectedOption();

    // Set up option highlighting/focus management
    setTimeout(() => {
      this.setActiveOption();
    });
  }

  ngAfterViewInit() {
    this.selectWidth =
      this.elementRef.nativeElement.querySelector('[cdkOverlayOrigin]').offsetWidth;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.closeDropdown();
  }

  updateSelectedOption() {
    const value = this.value();
    if (value !== null && value !== undefined) {
      this.selectedOption =
        this.optionComponents.find((option) => option.value() === this.value()) || null;
    } else {
      this.selectedOption = null;
    }

    // Update active state on all options
    this.optionComponents.forEach((option) => {
      option.isActive = option === this.selectedOption;
    });
  }

  toggleDropdown() {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    if (this.isOpen) return;

    this.isOpen = true;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger().elementRef)
      .withPositions([
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
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const config: OverlayConfig = {
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    };

    this.overlayRef = this.overlay.create(config);

    this.overlayRef.backdropClick().subscribe(() => this.closeDropdown());

    const portal = new TemplatePortal(this.optionsTemplate(), this.viewContainerRef);
    this.overlayRef.attach(portal);

    // Update current index
    this.currentIndex = this.getSelectedIndex();

    // Notify options that dropdown is open
    this.optionComponents.forEach((option) => {
      option.dropdownOpen = true;
    });

    // Scroll selected option into view
    setTimeout(() => {
      this.scrollToOption();
    });

    this.opened.emit();

    // Set up global keyboard event listener
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.isOpen),
      )
      .subscribe((event) => {
        if (event.keyCode === ESCAPE) {
          this.closeDropdown();
        }
      });
  }

  closeDropdown() {
    if (!this.isOpen) return;

    this.isOpen = false;

    // Notify options that dropdown is closed
    this.optionComponents.forEach((option) => {
      option.dropdownOpen = false;
    });

    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }

    this.closed.emit();
  }

  selectOption(option: CustomOption) {
    this.value.set(option.value());
    this.selectedOption = option;

    // Update active state on all options
    this.optionComponents.forEach((opt) => {
      opt.isActive = opt === option;
    });

    this.valueChange.emit(this.value());
    this.closeDropdown();
  }

  getSelectedIndex(): number {
    const options = this.optionComponents.toArray();
    return options.findIndex((option) => option === this.selectedOption);
  }

  onKeydown(event: KeyboardEvent) {
    const options = this.optionComponents.toArray();
    const optionsCount = options.length;

    if (event.keyCode === ENTER) {
      if (this.isOpen) {
        if (this.currentIndex >= 0 && this.currentIndex < optionsCount) {
          this.selectOption(options[this.currentIndex]);
        }
      } else {
        this.openDropdown();
      }
      event.preventDefault();
    } else if (event.keyCode === UP_ARROW) {
      if (this.isOpen) {
        this.currentIndex = (this.currentIndex - 1 + optionsCount) % optionsCount;
        this.setActiveOption();
        this.scrollToOption();
      } else {
        this.openDropdown();
      }
      event.preventDefault();
    } else if (event.keyCode === DOWN_ARROW) {
      if (this.isOpen) {
        this.currentIndex = (this.currentIndex + 1) % optionsCount;
        this.setActiveOption();
        this.scrollToOption();
      } else {
        this.openDropdown();
      }
      event.preventDefault();
    }
  }

  setActiveOption() {
    const options = this.optionComponents.toArray();
    options.forEach((option, index) => {
      option.isFocused = index === this.currentIndex;
    });
  }

  scrollToOption() {
    if (!this.overlayRef) return;

    setTimeout(() => {
      const options = this.optionComponents.toArray();
      if (this.currentIndex >= 0 && this.currentIndex < options.length) {
        const optionElement = options[this.currentIndex].elementRef.nativeElement;
        if (optionElement) {
          optionElement.scrollIntoView({ block: 'nearest' });
        }
      }
    });
  }
}
