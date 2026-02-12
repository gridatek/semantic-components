import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import type { AvatarGroupItem, AvatarGroupSize } from './avatar-group-types';

@Component({
  selector: 'sc-avatar-group',
  template: `
    <div
      [class]="containerClass()"
      role="group"
      [attr.aria-label]="ariaLabel()"
    >
      @for (avatar of visibleAvatars(); track avatar.id; let i = $index) {
        <button
          type="button"
          [class]="avatarClass()"
          [style.z-index]="visibleAvatars().length - i"
          [attr.aria-label]="avatar.name || avatar.alt || 'Avatar ' + (i + 1)"
          (click)="onAvatarClick(avatar, i)"
        >
          @if (avatar.src) {
            <img
              [src]="avatar.src"
              [alt]="avatar.alt || avatar.name || ''"
              class="h-full w-full object-cover"
              (error)="onImageError($event)"
            />
          } @else {
            <span [class]="fallbackClass()">
              {{ getInitials(avatar) }}
            </span>
          }
        </button>
      }

      @if (overflowCount() > 0) {
        <button
          type="button"
          [class]="overflowClass()"
          [style.z-index]="0"
          [attr.aria-label]="'+' + overflowCount() + ' more'"
          (click)="onOverflowClick()"
        >
          <span [class]="fallbackClass()">+{{ overflowCount() }}</span>
        </button>
      }
    </div>
  `,
  styles: `
    :host {
      display: inline-block;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAvatarGroup {
  readonly avatars = input<AvatarGroupItem[]>([]);
  readonly max = input(4);
  readonly size = input<AvatarGroupSize>('md');
  readonly spacing = input<'tight' | 'normal' | 'loose'>('normal');
  readonly ariaLabel = input<string>('Avatar group');
  readonly class = input<string>('');

  readonly avatarClick = output<{ avatar: AvatarGroupItem; index: number }>();
  readonly overflowClick = output<AvatarGroupItem[]>();

  protected readonly visibleAvatars = computed(() => {
    const all = this.avatars();
    const maxCount = this.max();
    return all.slice(0, maxCount);
  });

  protected readonly overflowCount = computed(() => {
    const all = this.avatars();
    const maxCount = this.max();
    return Math.max(0, all.length - maxCount);
  });

  protected readonly overflowAvatars = computed(() => {
    const all = this.avatars();
    const maxCount = this.max();
    return all.slice(maxCount);
  });

  protected readonly containerClass = computed(() =>
    cn('flex items-center', this.class()),
  );

  protected readonly avatarClass = computed(() =>
    cn(
      'relative inline-flex items-center justify-center rounded-full',
      'bg-muted border-2 border-background',
      'overflow-hidden cursor-pointer',
      'transition-transform hover:scale-110 hover:z-50',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.sizeClass(),
      this.spacingClass(),
    ),
  );

  protected readonly overflowClass = computed(() =>
    cn(
      'relative inline-flex items-center justify-center rounded-full',
      'bg-muted border-2 border-background',
      'cursor-pointer',
      'transition-transform hover:scale-110 hover:z-50',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.sizeClass(),
      this.spacingClass(),
    ),
  );

  protected readonly fallbackClass = computed(() =>
    cn(
      'flex h-full w-full items-center justify-center rounded-full',
      'bg-muted text-muted-foreground font-medium',
      this.fallbackTextSize(),
    ),
  );

  private sizeClass(): string {
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-14 w-14',
    };
    return sizes[this.size()];
  }

  private spacingClass(): string {
    const spacings = {
      tight: '-ml-3 first:ml-0',
      normal: '-ml-2 first:ml-0',
      loose: '-ml-1 first:ml-0',
    };
    return spacings[this.spacing()];
  }

  private fallbackTextSize(): string {
    const sizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    };
    return sizes[this.size()];
  }

  getInitials(avatar: AvatarGroupItem): string {
    const name = avatar.fallback || avatar.name || avatar.alt || '?';
    if (avatar.fallback) return avatar.fallback.slice(0, 2).toUpperCase();
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  onAvatarClick(avatar: AvatarGroupItem, index: number): void {
    this.avatarClick.emit({ avatar, index });
  }

  onOverflowClick(): void {
    this.overflowClick.emit(this.overflowAvatars());
  }
}
