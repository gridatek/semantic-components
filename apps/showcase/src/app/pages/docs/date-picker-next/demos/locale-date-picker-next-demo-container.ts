import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LocaleDatePickerNextDemo } from './locale-date-picker-next-demo';

@Component({
  selector: 'app-locale-date-picker-next-demo-container',
  imports: [DemoContainer, LocaleDatePickerNextDemo],
  template: `
    <app-demo-container
      title="Locale"
      [code]="code"
      demoUrl="/demos/date-picker-next/locale-date-picker-next-demo"
    >
      <app-locale-date-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDatePickerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScDatePickerNext,
  ScDatePickerNextInput,
  ScDatePickerNextTrigger,
  ScInputGroup,
  ScInputGroupAddon,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** locale="fr-FR" and a long format: the value, the calendar and the typed order (jj/mm/aaaa) in French. */
@Component({
  selector: 'app-locale-date-picker-next-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScDatePickerNext,
    ScDatePickerNextTrigger,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarPrevious,
    ScCalendarNext,
    ScDatePickerNextInput,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scDatePickerNext
      #dp="scDatePickerNext"
      locale="fr-FR"
      [format]="{ dateStyle: 'long' }"
      [(value)]="date"
      class="w-64"
    >
      <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
        <div scInputGroup>
          <input
            scDatePickerNextInput
            aria-label="Date d’arrivée"
            placeholder="jj/mm/aaaa"
          />
          <div scInputGroupAddon align="inline-end">
            <button scDatePickerNextTrigger #trigger="scDatePickerNextTrigger">
              <svg siCalendarIcon></svg>
              <span class="sr-only">Choisir une date</span>
            </button>
          </div>
        </div>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0" aria-label="Choisir une date">
            <div
              scCalendar
              #cal="scCalendar"
              initialFocus
              aria-label="Choisir une date"
              [mode]="dp.mode()"
              [value]="dp.value()"
              (valueChange)="dp.pick($event)"
              locale="fr-FR"
            >
              <div scCalendarHeader>
                <button scCalendarPrevious>
                  <svg siChevronLeftIcon></svg>
                  <span class="sr-only">Mois précédent</span>
                </button>
                <button scCalendarHeading>{{ cal.heading() }}</button>
                <button scCalendarNext>
                  <svg siChevronRightIcon></svg>
                  <span class="sr-only">Mois suivant</span>
                </button>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ dp.text() || 'Nothing picked.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDatePickerNextDemo {
  readonly date = signal<ScCalendarValue>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}`;
}
