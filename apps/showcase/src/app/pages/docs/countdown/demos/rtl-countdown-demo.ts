import { Dir } from '@angular/cdk/bidi';
import {
  Component,
  DestroyRef,
  LOCALE_ID,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ScFrame, ScNumberTicker } from '@semantic-components/ui';

/**
 * In a right-to-left page: the units run from the right, their names the
 * locale's (Intl.DisplayNames), the numbers written in Arabic.
 */
@Component({
  selector: 'app-rtl-countdown-demo',
  imports: [Dir, ScFrame, ScNumberTicker],
  template: `
    <div dir="rtl" lang="ar">
      <div
        role="timer"
        aria-label="الوقت المتبقي حتى الإطلاق"
        class="flex flex-wrap justify-center gap-3"
      >
        @for (unit of units(); track unit.name) {
          <div scFrame class="flex w-20 flex-col items-center gap-1 py-3">
            <span
              scNumberTicker
              effect="roll"
              class="text-3xl font-semibold tabular-nums"
              [value]="unit.value"
              [format]="{ minimumIntegerDigits: 2 }"
              [duration]="400"
            ></span>
            <span class="text-muted-foreground text-xs">{{ unit.name }}</span>
          </div>
        }
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCountdownDemo {
  private readonly names = new Intl.DisplayNames(inject(LOCALE_ID), {
    type: 'dateTimeField',
  });
  private readonly now = signal(Temporal.Now.instant());
  private readonly target = this.now().add({ hours: 12 * 24 + 5, minutes: 30 });

  private readonly units = computed(() => {
    const left = Math.max(
      0,
      Math.floor(
        (this.target.epochMilliseconds - this.now().epochMilliseconds) / 1000,
      ),
    );
    return [
      { name: this.names.of('day'), value: Math.floor(left / 86_400) },
      {
        name: this.names.of('hour'),
        value: Math.floor((left % 86_400) / 3_600),
      },
      { name: this.names.of('minute'), value: Math.floor((left % 3_600) / 60) },
      { name: this.names.of('second'), value: left % 60 },
    ];
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const timer = setInterval(
        () => this.now.set(Temporal.Now.instant()),
        1000,
      );
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }
}
