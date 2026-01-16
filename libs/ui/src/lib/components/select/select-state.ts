import { Listbox, Option } from '@angular/aria/listbox';
import { computed, signal } from '@angular/core';

/**
 * Shared state service for ScSelect components.
 * This service is provided at the ScSelect level and injected by child components.
 */
export class ScSelectState<T = unknown> {
  /** The placeholder text to display when no value is selected. */
  readonly placeholder = signal('Select an option');

  /** Reference to the Listbox directive. */
  readonly listbox = signal<Listbox<T> | undefined>(undefined);

  /** Collection of Option directives. */
  readonly options = signal<readonly Option<T>[]>([]);

  /** The computed display value based on selected values. */
  readonly displayValue = computed(() => {
    const values = this.listbox()?.values() ?? [];
    return values.length ? String(values[0]) : this.placeholder();
  });

  /** Register the listbox with the state. */
  registerListbox(listbox: Listbox<T>): void {
    this.listbox.set(listbox);
  }

  /** Register an option with the state. */
  registerOption(option: Option<T>): void {
    this.options.update((opts) => [...opts, option]);
  }

  /** Unregister an option from the state. */
  unregisterOption(option: Option<T>): void {
    this.options.update((opts) => opts.filter((o) => o !== option));
  }

  /** Find the active option. */
  findActiveOption(): Option<T> | undefined {
    return this.options().find((opt) => opt.active());
  }

  /** Scroll to the active option. */
  scrollToActiveOption(): void {
    const option = this.findActiveOption();
    if (option) {
      setTimeout(() => option.element.scrollIntoView({ block: 'nearest' }), 50);
    }
  }

  /** Reset the listbox scroll position. */
  resetScrollPosition(): void {
    const listbox = this.listbox();
    if (listbox) {
      setTimeout(() => listbox.element.scrollTo(0, 0), 150);
    }
  }
}
