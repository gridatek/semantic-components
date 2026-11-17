import { Component, ViewEncapsulation, input } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
} from '@semantic-components/ui';
import {
  ScDataTableSortButton,
  type ScDataTableSortableColumn,
} from '@semantic-components/ui/data-table';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronsUpDownIcon,
} from '@semantic-icons/lucide-icons';
import { type StaffMember, statusBadge } from '../../data/staff';
import { day, initials, money } from '../../shared/format';
import { label } from '../../shared/labels';

/** A column's header that sorts it: its name and an arrow for the direction. */
@Component({
  selector: 'app-sort-header',
  imports: [
    ScDataTableSortButton,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiChevronsUpDownIcon,
  ],
  template: `
    <button
      scDataTableSortButton
      #sort="scDataTableSortButton"
      [column]="column()"
    >
      {{ label() }}
      @switch (sort.direction()) {
        @case ('asc') {
          <svg siArrowUpIcon></svg>
        }
        @case ('desc') {
          <svg siArrowDownIcon></svg>
        }
        @default {
          <svg siChevronsUpDownIcon></svg>
        }
      }
    </button>
  `,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class SortHeader {
  private readonly labelOf = label;
  readonly column = input.required<ScDataTableSortableColumn>();
  readonly label = input.required<string>();
}

/** A staff member's cell, by column: the person, money, a date, a status. */
@Component({
  selector: 'app-staff-cell',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarImage, ScBadge],
  template: `
    @switch (column()) {
      @case ('name') {
        <span class="flex items-center gap-3">
          <span scAvatar class="size-8">
            <img scAvatarImage [src]="member().avatar" alt="" />
            <span scAvatarFallback>{{ initialsOf(member().name) }}</span>
          </span>
          <span class="flex flex-col">
            <span class="font-medium">{{ member().name }}</span>
            <span class="text-muted-foreground text-xs">{{
              member().email
            }}</span>
          </span>
        </span>
      }
      @case ('salary') {
        <span class="tabular-nums">{{ moneyOf(member().salary) }}</span>
      }
      @case ('joined') {
        {{ dayOf(member().joined) }}
      }
      @case ('status') {
        <span scBadge [variant]="badgeOf(member().status)">{{
          labelOf(member().status)
        }}</span>
      }
      @default {
        {{ labelOf(text()) }}
      }
    }
  `,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class StaffCell {
  private readonly labelOf = label;
  readonly column = input.required<string>();
  readonly member = input.required<StaffMember>();

  private readonly initialsOf = initials;
  private readonly moneyOf = money;
  private readonly dayOf = day;
  private readonly badgeOf = statusBadge;

  private text(): string {
    const value = this.member()[this.column() as keyof StaffMember];
    return typeof value === 'string' || typeof value === 'number'
      ? String(value)
      : '';
  }
}
