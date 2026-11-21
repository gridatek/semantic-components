import {
  Component,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
  viewChildren,
} from '@angular/core';
import { cn } from 'cn';
import type { ScTimeInputPart } from '../time-input';
import { SC_TIME_COLUMNS } from './time-columns';
import { ScTimePickerColumn } from './time-picker-column';

/**
 * The columns, in the popover: hour | minute (| second) | AM/PM, in the
 * locale's order — the clock's columns left to right in any page, as the time
 * input's parts. It opens on the value, focus on the hour.
 *
 * It writes its columns itself (`scTimePickerColumn`): which there are and
 * in what order comes from the locale, which the consumer can't know ahead.
 */
@Component({
  selector: 'div[scTimePickerColumns]',
  imports: [ScTimePickerColumn],
  template: `
    @for (group of groups(); track $index) {
      @if (group.clock) {
        <div dir="ltr" class="flex gap-px">
          @for (type of group.types; track type) {
            <div [scTimePickerColumn]="type"></div>
          }
        </div>
      } @else {
        @for (type of group.types; track type) {
          <div [scTimePickerColumn]="type"></div>
        }
      }
    }
  `,
  host: {
    'data-slot': 'time-picker-columns',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTimePickerColumns {
  private readonly picker = inject(SC_TIME_COLUMNS);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Focus on the hour as it opens; off where something else takes it (a date-time picker's calendar). */
  readonly initialFocus = input(true, { transform: booleanAttribute });

  private readonly columns = viewChildren(ScTimePickerColumn);

  /** The columns in the locale's order: the clock's together, AM/PM before or after. */
  private readonly groups = computed(() => {
    // The time's parts only: a date-time input's date is its calendar's.
    const types = this.picker
      .segmentedInput()
      .segments()
      .map((segment) => segment.type)
      .filter((type): type is ScTimeInputPart =>
        ['hour', 'minute', 'second', 'dayPeriod'].includes(type),
      );
    const groups: { clock: boolean; types: ScTimeInputPart[] }[] = [];
    for (const type of types) {
      const clock = type !== 'dayPeriod';
      const last = groups[groups.length - 1];
      if (last && last.clock === clock) last.types.push(type);
      else groups.push({ clock, types: [type] });
    }
    return groups;
  });

  private readonly class = computed(() =>
    // The lines between the columns: the border's colour, between them — in
    // either direction.
    cn('bg-border flex gap-px', this.classInput()),
  );

  constructor() {
    // Open on the value: each column at its option, focus on the hour.
    afterNextRender(() => {
      const columns = this.columns();
      for (const column of columns) column.scrollToActive();
      if (this.initialFocus())
        columns.find((column) => column.type() === 'hour')?.focus();
    });
  }
}
