import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import type { ScTimeInputPart } from '../time-input';
import {
  ScTimePickerNext,
  type ScTimePickerNextValue,
} from './time-picker-next';

/**
 * One column of a time picker — its hours, minutes, seconds or AM/PM: a
 * listbox named in the locale's words, its value selected and scrolled to.
 * The arrows move through it and pick (the time input's part, at once);
 * Left / Right go to the next column, as they show; Enter closes.
 *
 * The time picker's own part, not one to place: `div[scTimePickerNextColumns]`
 * writes one per part, because the parts — their order, AM/PM or not — come
 * from the locale. So it can't be styled from the consumer's markup either:
 * the look of an option is the style's (`timePicker.option`).
 */
@Component({
  selector: 'div[scTimePickerNextColumn]',
  exportAs: 'scTimePickerNextColumn',
  template: `
    @for (value of values(); track value) {
      <div
        role="option"
        data-slot="time-picker-option"
        [attr.aria-selected]="value === selected()"
        [attr.aria-disabled]="!picker.enabled(type(), value) || null"
        [attr.tabindex]="value === active() ? 0 : -1"
        [class]="optionClass()"
        (click)="choose(value)"
      >
        {{ label(value) }}
      </div>
    }
  `,
  host: {
    role: 'listbox',
    'data-slot': 'time-picker-column',
    '[attr.data-type]': 'type()',
    '[attr.aria-label]': 'name()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTimePickerNextColumn {
  private readonly picker = inject(ScTimePickerNext);
  private readonly styles = injectStyle().timePicker;
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The part it picks. */
  readonly type = input.required<ScTimeInputPart>({
    alias: 'scTimePickerNextColumn',
  });

  private readonly values = computed(() => this.picker.values()[this.type()]);
  /** The time input's part: selected. */
  readonly selected = computed(
    () => this.picker.timeInput().parts()[this.type()],
  );
  /** The option in the tab order: the selected one, else the first that can be picked. */
  private readonly active = linkedSignal(
    () =>
      this.values().find(
        (value) => value === this.selected() && this.enabled(value),
      ) ?? this.values().find((value) => this.enabled(value)),
  );
  private readonly name = computed(() =>
    this.picker.timeInput().ɵname(this.type()),
  );

  private readonly optionClass = computed(() =>
    cn(
      'flex cursor-default items-center justify-center tabular-nums outline-none select-none',
      'hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground',
      'aria-selected:bg-primary aria-selected:text-primary-foreground',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.styles.option,
    ),
  );

  private readonly class = computed(() =>
    cn(
      'bg-popover relative flex max-h-56 min-w-14 flex-col gap-0.5 overflow-y-auto overscroll-contain p-1 outline-none',
      this.classInput(),
    ),
  );

  /** Focus on its active option, scrolled into view. */
  focus(): void {
    const option = this.activeOption();
    option?.focus({ preventScroll: true });
    this.scrollTo(option);
  }

  /** Its selected option (or active one) at the top, as it opens. */
  scrollToActive(): void {
    const option = this.activeOption();
    if (option) this.host.scrollTop = option.offsetTop - 4;
  }

  /** The active option's element (the active value read now, before the view updates). */
  private activeOption(): HTMLElement | undefined {
    const active = this.active();
    return active === undefined
      ? undefined
      : this.options()[this.values().indexOf(active)];
  }

  private label(value: ScTimePickerNextValue): string {
    return this.picker.timeInput().ɵpartText(this.type(), value);
  }

  private enabled(value: ScTimePickerNextValue): boolean {
    return this.picker.enabled(this.type(), value);
  }

  private choose(value: ScTimePickerNextValue): void {
    if (!this.enabled(value)) return;
    this.active.set(value);
    this.picker.pick(this.type(), value);
  }

  private onKeydown(event: KeyboardEvent): void {
    const values = this.values().filter((value) => this.enabled(value));
    const active = this.active();
    const at = active === undefined ? -1 : values.indexOf(active);
    let next: ScTimePickerNextValue | undefined;
    switch (event.key) {
      case 'ArrowDown':
        next = values[Math.min(values.length - 1, at + 1)];
        break;
      case 'ArrowUp':
        next = values[Math.max(0, at - 1)];
        break;
      case 'Home':
        next = values[0];
        break;
      case 'End':
        next = values[values.length - 1];
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        this.neighbour(event.key === 'ArrowRight' ? 1 : -1)?.focus();
        event.preventDefault();
        return;
      case ' ':
        if (active !== undefined) this.choose(active);
        event.preventDefault();
        return;
      case 'Enter':
        if (active !== undefined) this.choose(active);
        this.picker.close();
        event.preventDefault();
        return;
      default:
        return;
    }
    event.preventDefault();
    if (next === undefined) return;
    // Selection follows focus: the part is set as the option is reached.
    this.choose(next);
    this.focus();
  }

  /** The column to the left or right, as they show (right to left too). */
  private neighbour(by: 1 | -1): HTMLElement | undefined {
    const root = this.host.closest('[data-slot="time-picker-columns"]');
    if (!root) return undefined;
    const columns = [
      ...root.querySelectorAll<HTMLElement>('[data-slot="time-picker-column"]'),
    ].sort(
      (a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left,
    );
    const column = columns[columns.indexOf(this.host) + by];
    return (
      column?.querySelector<HTMLElement>('[role="option"][tabindex="0"]') ??
      undefined
    );
  }

  private options(): HTMLElement[] {
    return [
      ...this.host.querySelectorAll<HTMLElement>(
        '[data-slot="time-picker-option"]',
      ),
    ];
  }

  /** The column scrolled to an option — the column only, not the page. */
  private scrollTo(option: HTMLElement | undefined): void {
    if (!option) return;
    const top = option.offsetTop;
    if (
      top < this.host.scrollTop ||
      top + option.offsetHeight > this.host.scrollTop + this.host.clientHeight
    )
      this.host.scrollTop = top - 4;
  }
}
