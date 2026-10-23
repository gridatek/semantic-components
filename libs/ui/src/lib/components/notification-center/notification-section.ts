import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  InjectionToken,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';

export const SC_NOTIFICATION_SECTION =
  new InjectionToken<ScNotificationSection>('SC_NOTIFICATION_SECTION');

/**
 * A section of the notifications — by day (Today, Yesterday, Earlier) or by
 * source, as you split `visible()`: a `group` named by its
 * `scNotificationSectionTitle`.
 */
@Directive({
  selector: '[scNotificationSection]',
  providers: [
    {
      provide: SC_NOTIFICATION_SECTION,
      useExisting: ScNotificationSection,
    },
  ],
  host: {
    role: 'group',
    'data-slot': 'notification-section',
    '[attr.aria-labelledby]': 'titleId',
    '[class]': 'class()',
  },
})
export class ScNotificationSection {
  readonly classInput = input<string>('', { alias: 'class' });

  /** The id of its title, which names it. */
  readonly titleId = inject(_IdGenerator).getId('sc-notification-section-');

  protected readonly class = computed(() =>
    cn('flex flex-col gap-1', this.classInput()),
  );
}
