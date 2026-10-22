import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  InjectionToken,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

export const SC_NOTIFICATION_NEXT_SECTION =
  new InjectionToken<ScNotificationNextSection>('SC_NOTIFICATION_NEXT_SECTION');

/**
 * A section of the notifications — by day (Today, Yesterday, Earlier) or by
 * source, as you split `visible()`: a `group` named by its
 * `scNotificationNextSectionTitle`.
 */
@Directive({
  selector: '[scNotificationNextSection]',
  providers: [
    {
      provide: SC_NOTIFICATION_NEXT_SECTION,
      useExisting: ScNotificationNextSection,
    },
  ],
  host: {
    role: 'group',
    'data-slot': 'notification-section',
    '[attr.aria-labelledby]': 'titleId',
    '[class]': 'class()',
  },
})
export class ScNotificationNextSection {
  readonly classInput = input<string>('', { alias: 'class' });

  /** The id of its title, which names it. */
  readonly titleId = inject(_IdGenerator).getId('sc-notification-section-');

  protected readonly class = computed(() =>
    cn('flex flex-col gap-1', this.classInput()),
  );
}
