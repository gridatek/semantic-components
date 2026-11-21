import {
  Component,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  viewChildren,
} from '@angular/core';
import { cn } from 'cn';
import type { ScTimeInputPart } from '../time-input';
import { ScTimePickerNext } from './time-picker-next';
import { ScTimePickerNextColumn } from './time-picker-next-column';

/**
 * The columns, in the popover: hour | minute (| second) | AM/PM, in the
 * locale's order — the clock's columns left to right in any page, as the time
 * input's parts. It opens on the value, focus on the hour.
 *
 * It writes its columns itself (`scTimePickerNextColumn`): which there are and
 * in what order comes from the locale, which the consumer can't know ahead.
 */
@Component({
  selector: 'div[scTimePickerNextColumns]',
  imports: [ScTimePickerNextColumn],
  template: `
    @for (group of groups(); track $index) {
      @if (group.clock) {
        <div dir="ltr" class="flex gap-px">
          @for (type of group.types; track type) {
            <div [scTimePickerNextColumn]="type"></div>
          }
        </div>
      } @else {
        @for (type of group.types; track type) {
          <div [scTimePickerNextColumn]="type"></div>
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
export class ScTimePickerNextColumns {
  private readonly picker = inject(ScTimePickerNext);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly columns = viewChildren(ScTimePickerNextColumn);

  /** The columns in the locale's order: the clock's together, AM/PM before or after. */
  private readonly groups = computed(() => {
    const types = this.picker
      .timeInput()
      .segments()
      .filter((segment) => segment.type !== 'literal')
      .map((segment) => segment.type as ScTimeInputPart);
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
      columns.find((column) => column.type() === 'hour')?.focus();
    });
  }
}
