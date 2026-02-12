import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'sc-speed-dial-action',
  template: `
    <button
      type="button"
      [class]="buttonClass()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel() || label()"
      [title]="label()"
      (click)="actionClick.emit()"
    >
      <span [class]="iconClass()" [innerHTML]="icon()"></span>
      @if (showLabel()) {
        <span class="sr-only">{{ label() }}</span>
      }
    </button>
    @if (showLabel() && labelVisible()) {
      <span [class]="labelClass()">{{ label() }}</span>
    }
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    :host(.direction-up),
    :host(.direction-down) {
      flex-direction: row;
    }

    :host(.direction-left) {
      flex-direction: row-reverse;
    }

    :host(.direction-right) {
      flex-direction: row;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSpeedDialAction {
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly disabled = input(false);
  readonly ariaLabel = input<string>();
  readonly showLabel = input(true);
  readonly labelVisible = input(true);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly class = input<string>('');

  readonly actionClick = output<void>();

  protected readonly buttonClass = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-full',
      'bg-secondary text-secondary-foreground',
      'shadow-md hover:shadow-lg',
      'transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md',
      this.sizeClasses(),
      this.class(),
    ),
  );

  protected readonly iconClass = computed(() =>
    cn('inline-flex items-center justify-center', '[&>svg]:w-5 [&>svg]:h-5'),
  );

  protected readonly labelClass = computed(() =>
    cn(
      'text-sm font-medium whitespace-nowrap',
      'bg-popover text-popover-foreground',
      'px-2 py-1 rounded shadow-sm',
    ),
  );

  private sizeClasses(): string {
    const sizes = {
      sm: 'h-10 w-10',
      md: 'h-12 w-12',
      lg: 'h-14 w-14',
    };
    return sizes[this.size()];
  }
}
