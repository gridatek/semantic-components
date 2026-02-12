import {
  afterNextRender,
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { cn } from '../../utils';

const checkSvgLight = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")`;
const indeterminateSvgLight = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='5' x2='19' y1='12' y2='12'/%3E%3C/svg%3E")`;

const checkSvgDark = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")`;
const indeterminateSvgDark = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='5' x2='19' y1='12' y2='12'/%3E%3C/svg%3E")`;

@Directive({
  selector: 'input[scNativeCheckbox]',
  host: {
    type: 'checkbox',
    'data-slot': 'checkbox',
    '[class]': 'class()',
    '[style.background-image]': 'backgroundImage()',
    '[style.background-size]': '"100% 100%"',
    '[style.background-position]': '"center"',
    '[style.background-repeat]': '"no-repeat"',
    '(change)': 'onChange()',
    '(input)': 'onChange()',
  },
})
export class ScNativeCheckbox {
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);
  private readonly platformId = inject(PLATFORM_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly checkedInput = input<boolean | undefined>(undefined, {
    alias: 'checked',
  });
  readonly indeterminate = input<boolean>(false);

  protected readonly internalChecked = signal(false);
  protected readonly isDarkMode = signal(false);

  constructor() {
    // Set indeterminate state on the native element
    effect(() => {
      this.elementRef.nativeElement.indeterminate = this.indeterminate();
    });

    // Sync checked state from input to both internal signal and native element
    effect(() => {
      const checked = this.checkedInput();
      if (checked !== undefined) {
        this.internalChecked.set(checked);
        this.elementRef.nativeElement.checked = checked;
      }
    });

    // Detect dark mode and watch for changes
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        // Initial detection
        this.updateDarkMode();

        // Watch for class changes on document element
        const observer = new MutationObserver(() => {
          this.updateDarkMode();
        });

        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class'],
        });

        // Sync initial checked state from native element
        if (this.checkedInput() === undefined) {
          this.internalChecked.set(this.elementRef.nativeElement.checked);
        }
      });
    }
  }

  private updateDarkMode(): void {
    this.isDarkMode.set(document.documentElement.classList.contains('dark'));
  }

  protected readonly class = computed(() =>
    cn(
      'peer h-4 w-4 shrink-0 appearance-none rounded-sm border border-primary bg-background ring-offset-background transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'checked:bg-primary checked:border-primary',
      'indeterminate:bg-primary indeterminate:border-primary',
      this.classInput(),
    ),
  );

  protected readonly backgroundImage = computed(() => {
    const isDark = this.isDarkMode();
    if (this.indeterminate()) {
      return isDark ? indeterminateSvgDark : indeterminateSvgLight;
    }
    if (this.internalChecked()) {
      return isDark ? checkSvgDark : checkSvgLight;
    }
    return 'none';
  });

  protected onChange(): void {
    this.internalChecked.set(this.elementRef.nativeElement.checked);
  }
}
