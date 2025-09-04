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
  @ContentChildren(ScCommandItem) items!: QueryList<ScCommandItem>;

  private activeIndex = signal<number>(-1);
  private destroy$ = new Subject<void>();

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      this.classInput(),
    ),
  );

  readonly loading = input<boolean>(false);
  readonly empty = input<boolean>(false);
  readonly query = signal<string>('');

  readonly commandSelect = output<string>();
  readonly queryChange = output<string>();

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const itemsArray = this.items?.toArray() || [];
    const currentIndex = this.activeIndex();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = currentIndex < itemsArray.length - 1 ? currentIndex + 1 : 0;
      this.setActiveItem(nextIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : itemsArray.length - 1;
      this.setActiveItem(prevIndex);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (currentIndex >= 0 && itemsArray[currentIndex]) {
        itemsArray[currentIndex].onClick();
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
    const itemsArray = this.items?.toArray() || [];

    // Update selected state on all items
    itemsArray.forEach((item, i) => {
      item.selected.set(i === index);
    });
  }

  ngAfterContentInit() {
    // Initialize active index when items change
    this.items.changes.subscribe(() => {
      this.activeIndex.set(-1);
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
}
