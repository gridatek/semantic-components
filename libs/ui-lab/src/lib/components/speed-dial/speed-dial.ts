import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Type,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiPlusIcon, SiXIcon } from '@semantic-icons/lucide-icons';
import { ScSpeedDialAction } from './speed-dial-action';
import type {
  SpeedDialAction,
  SpeedDialActionClickEvent,
  SpeedDialDirection,
} from './speed-dial-types';

@Component({
  selector: '[scSpeedDial]',
  imports: [ScSpeedDialAction, SiPlusIcon, SiXIcon, NgComponentOutlet],
  template: `
    <!-- Actions -->
    <div [class]="actionsContainerClass()" [attr.aria-hidden]="!open()">
      @for (action of actions(); track action.id; let i = $index) {
        <div
          [class]="actionWrapperClass(i)"
          [style.transition-delay]="
            open() ? i * 50 + 'ms' : (actions().length - 1 - i) * 30 + 'ms'
          "
        >
          <div
            scSpeedDialAction
            [icon]="action.icon"
            [label]="action.label"
            [disabled]="action.disabled ?? false"
            [ariaLabel]="action.ariaLabel"
            [showLabel]="showLabels()"
            [labelVisible]="open()"
            [size]="actionSize()"
            [direction]="direction()"
            (actionClick)="onActionClick(action, i)"
          ></div>
        </div>
      }
    </div>

    <!-- Main FAB button -->
    <button
      type="button"
      [class]="fabClass()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-expanded]="open()"
      [attr.aria-haspopup]="true"
      (click)="toggle()"
    >
      <span [class]="fabIconClass()">
        @if (open()) {
          @if (closeIcon()) {
            <ng-container *ngComponentOutlet="closeIcon()" />
          } @else {
            <svg siXIcon class="size-6"></svg>
          }
        } @else {
          @if (icon()) {
            <ng-container *ngComponentOutlet="icon()" />
          } @else {
            <svg siPlusIcon class="size-6"></svg>
          }
        }
      </span>
      @if (label() && !open()) {
        <span class="sr-only">{{ label() }}</span>
      }
    </button>
  `,
  host: {
    '[class]': 'hostClass()',
    '[attr.role]': '"menu"',
    '[attr.aria-expanded]': 'open()',
    '(document:keydown.escape)': 'onEscape()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSpeedDial {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly actions = input<SpeedDialAction[]>([]);
  readonly direction = input<SpeedDialDirection>('up');
  readonly icon = input<Type<unknown> | null>(null);
  readonly closeIcon = input<Type<unknown> | null>(null);
  readonly label = input<string>('Open actions');
  readonly ariaLabel = input<string>('Speed dial');
  readonly showLabels = input(true);
  readonly closeOnActionClick = input(true);
  readonly closeOnOutsideClick = input(true);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly actionSize = input<'sm' | 'md' | 'lg'>('md');

  readonly open = model(false);

  readonly actionClick = output<SpeedDialActionClickEvent>();
  readonly openChange = output<boolean>();

  protected readonly hostClass = computed(() => {
    const dir = this.direction();
    return cn(
      'relative inline-flex',
      dir === 'up' && 'flex-col-reverse items-center',
      dir === 'down' && 'flex-col items-center',
      dir === 'left' && 'flex-row-reverse items-center',
      dir === 'right' && 'flex-row items-center',
      this.classInput(),
    );
  });

  protected readonly actionsContainerClass = computed(() => {
    const dir = this.direction();
    return cn(
      'flex',
      dir === 'up' && 'flex-col-reverse items-center gap-3 mb-3',
      dir === 'down' && 'flex-col items-center gap-3 mt-3',
      dir === 'left' && 'flex-row-reverse items-center gap-3 mr-3',
      dir === 'right' && 'flex-row items-center gap-3 ml-3',
    );
  });

  protected readonly fabClass = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-full',
      'bg-primary text-primary-foreground',
      'shadow-lg hover:shadow-xl',
      'transition-all duration-300',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.open() && 'rotate-0',
      this.fabSizeClasses(),
    ),
  );

  protected readonly fabIconClass = computed(() =>
    cn(
      'inline-flex items-center justify-center',
      'transition-transform duration-300',
      '[&>svg]:w-6 [&>svg]:h-6',
    ),
  );

  protected actionWrapperClass(index: number): string {
    return cn(
      'transition-all duration-200 ease-out',
      this.open()
        ? 'opacity-100 scale-100 translate-y-0 translate-x-0'
        : 'opacity-0 scale-75 pointer-events-none',
      !this.open() && this.direction() === 'up' && 'translate-y-4',
      !this.open() && this.direction() === 'down' && '-translate-y-4',
      !this.open() && this.direction() === 'left' && 'translate-x-4',
      !this.open() && this.direction() === 'right' && '-translate-x-4',
    );
  }

  private fabSizeClasses(): string {
    const sizes = {
      sm: 'h-12 w-12',
      md: 'h-14 w-14',
      lg: 'h-16 w-16',
    };
    return sizes[this.size()];
  }

  constructor() {
    afterNextRender(() => {
      this.setupOutsideClickHandler();
    });
  }

  toggle(): void {
    this.open.update((v) => !v);
    this.openChange.emit(this.open());
  }

  close(): void {
    if (this.open()) {
      this.open.set(false);
      this.openChange.emit(false);
    }
  }

  onActionClick(action: SpeedDialAction, index: number): void {
    this.actionClick.emit({ action, index });
    if (this.closeOnActionClick()) {
      this.close();
    }
  }

  onEscape(): void {
    this.close();
  }

  private setupOutsideClickHandler(): void {
    const handler = (event: MouseEvent) => {
      if (!this.closeOnOutsideClick() || !this.open()) return;

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
}
