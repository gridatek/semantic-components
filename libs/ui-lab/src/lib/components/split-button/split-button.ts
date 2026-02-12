import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import type {
  SplitButtonAction,
  SplitButtonSize,
  SplitButtonVariant,
} from './split-button-types';

@Component({
  selector: 'sc-split-button',
  template: `
    <div [class]="containerClass()" role="group">
      <!-- Main Button -->
      <button
        type="button"
        [class]="mainButtonClass()"
        [disabled]="disabled()"
        [attr.aria-label]="label()"
        (click)="onMainClick()"
      >
        @if (icon()) {
          <span
            class="inline-flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4"
            [innerHTML]="icon()"
          ></span>
        }
        <span>{{ label() }}</span>
      </button>

      <!-- Dropdown Toggle -->
      <button
        type="button"
        [class]="dropdownButtonClass()"
        [disabled]="disabled() || actions().length === 0"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="true"
        aria-label="More actions"
        (click)="toggleDropdown()"
      >
        <span
          class="inline-flex items-center justify-center transition-transform duration-200"
          [class.rotate-180]="isOpen()"
          [innerHTML]="chevronIcon"
        ></span>
      </button>

      <!-- Dropdown Menu -->
      @if (isOpen()) {
        <div [class]="dropdownMenuClass()" role="menu">
          @for (action of actions(); track action.id) {
            <button
              type="button"
              role="menuitem"
              [class]="menuItemClass(action)"
              [disabled]="action.disabled"
              (click)="onActionClick(action)"
            >
              @if (action.icon) {
                <span
                  class="inline-flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4"
                  [innerHTML]="action.icon"
                ></span>
              }
              <span>{{ action.label }}</span>
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: inline-block;
      position: relative;
    }
  `,
  host: {
    '(document:keydown.escape)': 'close()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSplitButton {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly label = input.required<string>();
  readonly actions = input<SplitButtonAction[]>([]);
  readonly icon = input<string>();
  readonly variant = input<SplitButtonVariant>('default');
  readonly size = input<SplitButtonSize>('md');
  readonly disabled = input(false);
  readonly class = input<string>('');

  readonly mainClick = output<void>();
  readonly actionClick = output<SplitButtonAction>();

  protected readonly isOpen = signal(false);

  readonly chevronIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;

  protected readonly containerClass = computed(() =>
    cn('inline-flex', this.class()),
  );

  protected readonly mainButtonClass = computed(() =>
    cn(
      'inline-flex items-center justify-center gap-2 font-medium',
      'transition-colors rounded-l-md',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      this.variantClasses(),
      this.sizeClasses(),
      'rounded-r-none border-r-0',
    ),
  );

  protected readonly dropdownButtonClass = computed(() =>
    cn(
      'inline-flex items-center justify-center font-medium',
      'transition-colors rounded-r-md',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      this.variantClasses(),
      this.dropdownSizeClasses(),
      'rounded-l-none border-l border-l-background/20',
    ),
  );

  protected readonly dropdownMenuClass = computed(() =>
    cn(
      'absolute right-0 mt-1 z-50',
      'min-w-[160px] p-1',
      'bg-popover text-popover-foreground',
      'border rounded-md shadow-md',
      'animate-in fade-in-0 zoom-in-95',
      this.size() === 'sm'
        ? 'top-8'
        : this.size() === 'lg'
          ? 'top-12'
          : 'top-10',
    ),
  );

  protected menuItemClass(action: SplitButtonAction): string {
    return cn(
      'flex w-full items-center gap-2 px-3 py-2 text-sm',
      'rounded-sm cursor-pointer',
      'transition-colors',
      'focus:outline-none focus:bg-accent focus:text-accent-foreground',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      action.destructive
        ? 'text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive'
        : 'hover:bg-accent hover:text-accent-foreground',
    );
  }

  private variantClasses(): string {
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    };
    return variants[this.variant()];
  }

  private sizeClasses(): string {
    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };
    return sizes[this.size()];
  }

  private dropdownSizeClasses(): string {
    const sizes = {
      sm: 'h-8 px-2',
      md: 'h-10 px-2',
      lg: 'h-12 px-3',
    };
    return sizes[this.size()];
  }

  constructor() {
    afterNextRender(() => {
      this.setupOutsideClickHandler();
    });
  }

  private setupOutsideClickHandler(): void {
    const handler = (event: MouseEvent) => {
      if (!this.isOpen()) return;
      const target = event.target as HTMLElement;
      if (!this.elementRef.nativeElement.contains(target)) {
        this.close();
      }
    };

    document.addEventListener('click', handler);

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('click', handler);
    });
  }

  toggleDropdown(): void {
    this.isOpen.update((v) => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

  onMainClick(): void {
    this.mainClick.emit();
  }

  onActionClick(action: SplitButtonAction): void {
    if (!action.disabled) {
      this.actionClick.emit(action);
      this.close();
    }
  }
}
