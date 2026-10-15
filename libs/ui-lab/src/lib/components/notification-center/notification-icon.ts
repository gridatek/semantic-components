import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
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
      'data-[type=success]:bg-green-500/10 data-[type=success]:text-green-700 dark:data-[type=success]:text-green-400',
      'data-[type=warning]:bg-amber-500/10 data-[type=warning]:text-amber-700 dark:data-[type=warning]:text-amber-400',
      'data-[type=error]:bg-destructive/10 data-[type=error]:text-destructive',
      'data-[type=message]:bg-primary/10 data-[type=message]:text-primary',
      this.classInput(),
    ),
  );
}
