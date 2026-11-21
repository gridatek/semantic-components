import { Dir } from '@angular/cdk/bidi';
import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScFrame,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemTitle,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

interface Notice {
  readonly id: string;
  readonly title: string;
  readonly at: Temporal.Instant;
}

/** In a right-to-left page: the list from the right, its times in Arabic words. */
@Component({
  selector: 'app-rtl-notification-center-demo',
  imports: [
    Dir,
    ScButton,
    ScFrame,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemTitle,
    SiXIcon,
  ],
  template: `
    <section
      dir="rtl"
      lang="ar"
      scFrame
      aria-labelledby="rtl-inbox-title"
      class="flex w-full max-w-md flex-col gap-3 p-4"
    >
      <h3 id="rtl-inbox-title" class="font-semibold">
        الإشعارات ({{ count() }})
      </h3>
      <div scItemGroup role="list">
        @for (notice of notifications(); track notice.id) {
          <div scItem size="sm" role="listitem">
            <div scItemBody>
              <div scItemTitle>{{ notice.title }}</div>
              <p scItemDescription>
                <time [attr.datetime]="notice.at.toString()">{{
                  ago(notice.at)
                }}</time>
              </p>
            </div>
            <div scItemActions>
              <button
                scButton
                variant="ghost"
                size="icon-sm"
                (click)="dismiss(notice.id)"
              >
                <svg siXIcon></svg>
                <span class="sr-only">تجاهل «{{ notice.title }}»</span>
              </button>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNotificationCenterDemo {
  private readonly relative = new Intl.RelativeTimeFormat(inject(LOCALE_ID), {
    numeric: 'auto',
  });
  private readonly now = Temporal.Now.instant();

  private readonly notifications = signal<readonly Notice[]>([
    { id: '1', title: 'تعليق جديد', at: this.now.subtract({ minutes: 5 }) },
    { id: '2', title: 'اكتمل النشر', at: this.now.subtract({ hours: 2 }) },
  ]);
  private readonly count = computed(() => this.notifications().length);

  private ago(at: Temporal.Instant): string {
    const minutes = Math.round(
      (at.epochMilliseconds - this.now.epochMilliseconds) / 60_000,
    );
    return Math.abs(minutes) < 60
      ? this.relative.format(minutes, 'minute')
      : this.relative.format(Math.round(minutes / 60), 'hour');
  }

  private dismiss(id: string): void {
    this.notifications.update((all) => all.filter((n) => n.id !== id));
  }
}
