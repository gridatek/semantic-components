import { ActiveDescendantKeyManager, _IdGenerator } from '@angular/cdk/a11y';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn } from '@semantic-components/utils';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';
import { Subject, takeUntil } from 'rxjs';

import { DropdownBehavior } from '../shared/dropdown-behavior';
import { ScOptionLegacy } from './option-legacy';
import { ScSelectContentLegacy } from './select-content-legacy';
import { ScSelectDropdownPanelLegacy } from './select-dropdown-panel-legacy';
import { ScSelectTriggerLegacy } from './select-trigger-legacy';
import { ScSelectValueLegacy } from './select-value-legacy';

@Component({
  selector: 'sc-select-legacy',
  imports: [
    ScSelectTriggerLegacy,
    ScSelectValueLegacy,
    ScSelectDropdownPanelLegacy,
    ScSelectContentLegacy,
    SiChevronDownIcon,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScSelectLegacy),
      multi: true,
    },
  ],
  template: `
    <!-- Select Trigger -->
    <button
      #trigger
      [isOpen]="isOpen()"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-haspopup]="true"
      [attr.aria-controls]="'dropdown-' + id()"
      [attr.aria-activedescendant]="activeDescendant"
      (click)="toggle()"
      sc-select-trigger-legacy
    >
      <span [placeholder]="placeholder()" sc-select-value-legacy>
        {{ selectedOption ? selectedOption.getLabel() : placeholder() }}
      </span>
      <svg class="h-4 w-4 opacity-50" [class.rotate-180]="isOpen()" si-chevron-down-icon></svg>
    </button>

    <!-- Dropdown Panel Template -->
    <ng-template #dropdownPanel>
      <div
        [id]="'dropdown-' + id()"
        [attr.aria-labelledby]="'trigger-' + id()"
        sc-select-dropdown-legacy
      >
        <div sc-select-content-legacy>
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
  host: {
    '[class]': 'class()',
    'data-slot': 'control',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectLegacy
  implements AfterContentInit, AfterViewInit, ControlValueAccessor, OnDestroy
{
  // Shared dropdown behavior
  protected readonly dropdownBehavior = new DropdownBehavior();

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('block relative w-full', this.classInput()));

  readonly placeholder = input('Select an option');
  readonly options = contentChildren(ScOptionLegacy);
  readonly trigger = viewChild.required<ScSelectTriggerLegacy>('trigger');
  readonly dropdownPanel = viewChild.required<TemplateRef<any>>('dropdownPanel');

  // Use dropdown behavior's state
  protected readonly isOpen = computed(() => this.dropdownBehavior.isOpen());
  selectedOption: ScOptionLegacy | null = null;
  keyManager!: ActiveDescendantKeyManager<ScOptionLegacy>;
  activeDescendant: string | null = null;

  readonly id = signal<string>(inject(_IdGenerator).getId('sc-select-legacy-'));

  private destroy$ = new Subject<void>();
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  private portal: TemplatePortal | null = null;

  constructor() {
    // React to dropdown state changes
    effect(() => {
      const isOpen = this.dropdownBehavior.isOpen();
      if (isOpen) {
        this.openOverlay();
      } else {
        this.closeOverlay();
      }
    });
  }

  ngAfterViewInit() {
    // View is now initialized, overlay can be created
  }

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
    this.closeOverlay();
  }

  private scrollToOption(option: ScOptionLegacy) {
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
    if (
      !this.isOpen() &&
      (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')
    ) {
      event.preventDefault();
      this.open();
      return;
    }

    if (this.isOpen()) {
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
          this.trigger()?.elementRef?.nativeElement?.focus();
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

  toggle() {
    this.dropdownBehavior.toggle();
  }

  open() {
    this.dropdownBehavior.open();
  }

  private openOverlay() {
    if (this.isOpen()) {
      // Wait a tick to ensure ViewChild is available
      setTimeout(() => {
        this.createOverlay();

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
      }, 0);
    }
  }

  close() {
    this.dropdownBehavior.close();
    this.keyManager.setActiveItem(-1);
    this.activeDescendant = null;
  }

  private createOverlay() {
    if (this.overlayRef) {
      return;
    }

    const triggerEl = this.trigger()?.elementRef?.nativeElement;
    if (!triggerEl) {
      return;
    }

    const panelTemplate = this.dropdownPanel();
    if (!panelTemplate) {
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerEl)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4, // mt-1 equivalent (4px margin top)
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4, // negative margin when positioned above
        },
      ])
      .withFlexibleDimensions(false)
      .withPush(false);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    // Update dropdown behavior's trigger width
    this.dropdownBehavior.updateTriggerWidth(this.trigger().elementRef);

    const config: OverlayConfig = {
      positionStrategy,
      scrollStrategy,
      width: triggerEl.getBoundingClientRect().width,
      maxHeight: 256, // max-h-64 equivalent
      hasBackdrop: false,
    };

    this.overlayRef = this.overlay.create(config);
    this.portal = new TemplatePortal(panelTemplate, this.viewContainerRef);
    this.overlayRef.attach(this.portal);

    // Close on backdrop click using dropdown behavior
    this.overlayRef
      .outsidePointerEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.dropdownBehavior.handleBackdropClick();
      });
  }

  private closeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.portal = null;
    }
  }

  selectOption(option: ScOptionLegacy) {
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
    this.trigger()?.elementRef?.nativeElement?.focus();
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
