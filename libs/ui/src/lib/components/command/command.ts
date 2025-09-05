import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostListener,
  OnDestroy,
  QueryList,
  ViewEncapsulation,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { Subject } from 'rxjs';

import { ScCommandItem } from './command-item';

@Component({
  selector: 'sc-command',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    '[attr.role]': '"combobox"',
    '[attr.aria-expanded]': 'true',
    '[attr.aria-haspopup]': '"listbox"',
    '(keydown)': 'onKeyDown($event)',
    'data-slot': 'command',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommand implements AfterContentInit, OnDestroy {
  @ContentChildren(ScCommandItem, { descendants: true }) items!: QueryList<ScCommandItem>;

  private activeIndex = signal<number>(-1);
  private destroy$ = new Subject<void>();
  private visibleItems = signal<ScCommandItem[]>([]);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'relative',
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      '[&_[data-slot=command-input-wrapper]]:h-12 [&_[data-slot=command-input]]:h-12 [&_[data-slot=command-item]]:px-2 [&_[data-slot=command-item]]:py-3',
      this.classInput(),
    ),
  );

  readonly loading = input<boolean>(false);
  readonly empty = input<boolean>(false);
  readonly error = input<boolean>(false);
  readonly query = signal<string>('');
  readonly filter = input<(value: string, search: string) => boolean>();

  readonly commandSelect = output<string>();
  readonly queryChange = output<string>();

  constructor() {
    // Update filtering when query changes
    effect(() => {
      this.filterItems(this.query());
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const visibleItems = this.visibleItems();
    const currentIndex = this.activeIndex();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
      this.setActiveItem(nextIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
      this.setActiveItem(prevIndex);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (currentIndex >= 0 && visibleItems[currentIndex]) {
        visibleItems[currentIndex].onClick();
        const value =
          visibleItems[currentIndex].value() || this.getItemText(visibleItems[currentIndex]);
        this.commandSelect.emit(value);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.query.set('');
      this.queryChange.emit('');
      this.activeIndex.set(-1);
    }
  }

  private setActiveItem(index: number) {
    this.activeIndex.set(index);
    const visibleItems = this.visibleItems();
    const allItems = this.items?.toArray() || [];

    // Update selected state on all items
    allItems.forEach((item) => {
      item.selected.set(false);
    });

    // Set selected on the active visible item
    if (index >= 0 && visibleItems[index]) {
      visibleItems[index].selected.set(true);

      // Scroll active item into view
      setTimeout(() => {
        const activeElement = visibleItems[index].elementRef?.nativeElement;
        if (activeElement) {
          activeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });
        }
      });
    }
  }

  ngAfterContentInit() {
    // Initialize visible items and active index when items change
    this.items.changes.subscribe(() => {
      this.filterItems(this.query());
      this.activeIndex.set(-1);
      this.setupItemEventListeners();
    });

    // Initial filtering and setup
    this.filterItems(this.query());
    this.setupItemEventListeners();
  }

  private setupItemEventListeners() {
    // Set up mouse enter handlers for items
    this.items?.forEach((item, index) => {
      item.mouseEnter.subscribe(() => {
        const visibleItems = this.visibleItems();
        const visibleIndex = visibleItems.findIndex((visibleItem) => visibleItem === item);
        if (visibleIndex >= 0) {
          this.setActiveItem(visibleIndex);
        }
      });

      item.select.subscribe((value) => {
        this.commandSelect.emit(value);
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateQuery(query: string) {
    this.query.set(query);
    this.queryChange.emit(query);
  }

  private filterItems(search: string) {
    const allItems = this.items?.toArray() || [];

    if (!search.trim()) {
      // Show all items when no search query
      this.visibleItems.set(allItems);
      allItems.forEach((item) => item.setVisibility(true));
      return;
    }

    const filterFn = this.filter() || this.defaultFilter;
    const filtered = allItems.filter((item) => {
      const itemText = this.getItemText(item);
      const isVisible = filterFn(itemText, search);
      item.setVisibility(isVisible);
      return isVisible;
    });

    this.visibleItems.set(filtered);
    this.activeIndex.set(-1); // Reset selection when filtering
  }

  private getItemText(item: ScCommandItem): string {
    return item.value() || item.elementRef?.nativeElement?.textContent?.trim() || '';
  }

  private defaultFilter = (value: string, search: string): boolean => {
    return value.toLowerCase().includes(search.toLowerCase());
  };
}
