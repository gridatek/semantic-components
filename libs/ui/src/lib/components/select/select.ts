import { ActiveDescendantKeyManager, _IdGenerator } from '@angular/cdk/a11y';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  computed,
  contentChildren,
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

import { ScOption } from './option';
import { ScSelectContent } from './select-content';
import { ScSelectDropdownPanel } from './select-dropdown-panel';
import { ScSelectTrigger } from './select-trigger';
import { ScSelectValue } from './select-value';

@Component({
  selector: 'sc-select',
  imports: [
    ScSelectTrigger,
    ScSelectValue,
    ScSelectDropdownPanel,
    ScSelectContent,
    SiChevronDownIcon,
  ],
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
      [attr.aria-controls]="'dropdown-' + id()"
      [attr.aria-activedescendant]="activeDescendant"
      (click)="toggle()"
      sc-select-trigger
    >
      <span [placeholder]="placeholder()" sc-select-value>
        {{ selectedOption ? selectedOption.getLabel() : placeholder() }}
      </span>
      <svg class="h-4 w-4 opacity-50" [class.rotate-180]="isOpen" si-chevron-down-icon></svg>
    </button>

    <!-- Dropdown Panel Template -->
    <ng-template #dropdownPanel>
      <div [id]="'dropdown-' + id()" [attr.aria-labelledby]="'trigger-' + id()" sc-select-dropdown>
        <div sc-select-content>
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelect implements AfterContentInit, AfterViewInit, ControlValueAccessor, OnDestroy {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('block relative w-full', this.classInput()));

  readonly placeholder = input('Select an option');
  readonly options = contentChildren(ScOption);
  readonly trigger = viewChild.required<ElementRef>('trigger');
  readonly dropdownPanel = viewChild.required<TemplateRef<any>>('dropdownPanel');

  isOpen = false;
  selectedOption: ScOption | null = null;
  keyManager!: ActiveDescendantKeyManager<ScOption>;
  activeDescendant: string | null = null;

  readonly id = signal<string>(inject(_IdGenerator).getId('sc-select-'));

  private destroy$ = new Subject<void>();
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;
  private portal: TemplatePortal | null = null;

  ngAfterViewInit() {
    // View is now initialized, overlay can be created
    console.log('View initialized, trigger:', this.trigger()?.nativeElement);
    console.log('Dropdown panel template:', this.dropdownPanel());
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
          this.trigger()?.nativeElement?.focus();
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
    this.isOpen ? this.close() : this.open();
  }

  open() {
    console.log('Open called, isOpen:', this.isOpen);
    if (this.isOpen) return;

    this.isOpen = true;
    console.log('Calling createOverlay...');

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

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.keyManager.setActiveItem(-1);
    this.activeDescendant = null;
    this.closeOverlay();
  }

  private createOverlay() {
    console.log('createOverlay called');
    if (this.overlayRef) {
      console.log('Overlay already exists, returning');
      return;
    }

    const triggerEl = this.trigger()?.nativeElement;
    console.log('Trigger element:', triggerEl);
    if (!triggerEl) {
      console.error('Trigger element not found!');
      return;
    }

    const panelTemplate = this.dropdownPanel();
    console.log('Panel template:', panelTemplate);
    if (!panelTemplate) {
      console.error('Panel template not found!');
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
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ])
      .withFlexibleDimensions(false)
      .withPush(false);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const config: OverlayConfig = {
      positionStrategy,
      scrollStrategy,
      width: triggerEl.getBoundingClientRect().width,
      maxHeight: 256, // max-h-64 equivalent
      hasBackdrop: false,
    };

    console.log('Creating overlay with config:', config);
    this.overlayRef = this.overlay.create(config);
    console.log('Overlay created:', this.overlayRef);

    this.portal = new TemplatePortal(panelTemplate, this.viewContainerRef);
    console.log('Portal created:', this.portal);

    console.log('Attaching portal to overlay...');
    this.overlayRef.attach(this.portal);
    console.log('Portal attached successfully');

    // Close on backdrop click
    this.overlayRef
      .outsidePointerEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('Outside click detected, closing...');
        this.close();
      });
  }

  private closeOverlay() {
    console.log('closeOverlay called');
    if (this.overlayRef) {
      console.log('Disposing overlay...');
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.portal = null;
      console.log('Overlay disposed');
    } else {
      console.log('No overlay to close');
    }
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
    this.trigger()?.nativeElement?.focus();
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
