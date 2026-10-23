import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { SC_NOTIFICATION } from './notification';

/**
 * A notification's icon (or avatar): write it inside. Its colour follows the
 * notification's `type`.
 */
@Directive({
  selector: '[scNotificationIcon]',
  host: {
    'data-slot': 'notification-icon',
    'aria-hidden': 'true',
    '[attr.data-type]': 'item.notification().type ?? null',
    '[class]': 'class()',
  },
})
export class ScNotificationIcon {
  protected readonly item = inject(SC_NOTIFICATION);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full [&_svg]:size-4 [&_img]:size-full [&_img]:object-cover',
      'data-[type=success]:bg-success/10 data-[type=success]:text-success',
      'data-[type=warning]:bg-warning/10 data-[type=warning]:text-warning',
      'data-[type=error]:bg-destructive/10 data-[type=error]:text-destructive',
      'data-[type=message]:bg-primary/10 data-[type=message]:text-primary',
      this.classInput(),
    ),
  );
}
