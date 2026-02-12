import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import type { SearchSuggestion } from './search-input-types';
import { DEFAULT_SEARCH_OPTIONS } from './search-input-types';

@Component({
  selector: 'sc-search-input',
  imports: [],
  template: `
    <div
      [class]="containerClass()"
      role="combobox"
      [attr.aria-expanded]="isOpen()"
    >
      <div [class]="inputWrapperClass()">
        <span
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          [innerHTML]="searchIcon"
        ></span>
        <input
          #inputRef
          type="text"
          [class]="inputClass()"
          [placeholder]="placeholder()"
          [value]="query()"
          [attr.aria-label]="placeholder()"
          [attr.aria-autocomplete]="'list'"
          [attr.aria-controls]="'search-suggestions'"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (keydown)="onKeydown($event)"
        />
        @if (query() && !loading()) {
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
            (click)="clear()"
          >
            <span [innerHTML]="clearIcon"></span>
          </button>
        }
        @if (loading()) {
          <span class="absolute right-3 top-1/2 -translate-y-1/2">
            <span
              class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            ></span>
          </span>
        }
      </div>

      @if (isOpen() && filteredSuggestions().length > 0) {
        <div
          id="search-suggestions"
          [class]="suggestionsClass()"
          role="listbox"
        >
          @for (
            suggestion of filteredSuggestions();
            track suggestion.id;
            let i = $index
          ) {
            <button
              type="button"
              role="option"
              [class]="suggestionClass(i)"
              [attr.aria-selected]="highlightedIndex() === i"
              (click)="selectSuggestion(suggestion)"
              (mouseenter)="highlightedIndex.set(i)"
            >
              @if (suggestion.icon) {
                <span
                  class="inline-flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4 text-muted-foreground"
                  [innerHTML]="suggestion.icon"
                ></span>
              }
              <div class="flex-1 text-left">
                <div class="font-medium">{{ suggestion.label }}</div>
                @if (suggestion.description) {
                  <div class="text-xs text-muted-foreground">
                    {{ suggestion.description }}
                  </div>
                }
              </div>
              @if (suggestion.category) {
                <span class="text-xs text-muted-foreground">
                  {{ suggestion.category }}
                </span>
              }
            </button>
          }
        </div>
      }

      @if (
        isOpen() &&
        query().length >= minChars() &&
        filteredSuggestions().length === 0 &&
        !loading()
      ) {
        <div [class]="suggestionsClass()">
          <div class="px-3 py-6 text-center text-sm text-muted-foreground">
            No results found
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSearchInput {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('inputRef');

  readonly suggestions = input<SearchSuggestion[]>([]);
  readonly placeholder = input(DEFAULT_SEARCH_OPTIONS.placeholder);
  readonly debounceMs = input(DEFAULT_SEARCH_OPTIONS.debounceMs);
  readonly minChars = input(DEFAULT_SEARCH_OPTIONS.minChars);
  readonly maxSuggestions = input(DEFAULT_SEARCH_OPTIONS.maxSuggestions);
  readonly loading = input(false);
  readonly class = input<string>('');

  readonly search = output<string>();
  readonly suggestionSelect = output<SearchSuggestion>();
  readonly queryChange = output<string>();

  protected readonly query = signal('');
  protected readonly isOpen = signal(false);
  protected readonly highlightedIndex = signal(-1);

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  readonly searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;
  readonly clearIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

  protected readonly filteredSuggestions = computed(() => {
    const q = this.query().toLowerCase();
    if (q.length < this.minChars()) return [];

    return this.suggestions()
      .filter(
        (s) =>
          s.label.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q) ||
          s.category?.toLowerCase().includes(q),
      )
      .slice(0, this.maxSuggestions());
  });

  protected readonly containerClass = computed(() =>
    cn('relative', this.class()),
  );

  protected readonly inputWrapperClass = computed(() => 'relative');

  protected readonly inputClass = computed(() =>
    cn(
      'w-full h-10 pl-10 pr-10',
      'rounded-md border border-input bg-background',
      'text-sm placeholder:text-muted-foreground',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ),
  );

  protected readonly suggestionsClass = computed(() =>
    cn(
      'absolute top-full left-0 right-0 z-50 mt-1',
      'max-h-[300px] overflow-auto',
      'rounded-md border bg-popover shadow-md',
      'animate-in fade-in-0 zoom-in-95',
    ),
  );

  protected suggestionClass(index: number): string {
    return cn(
      'flex w-full items-center gap-3 px-3 py-2',
      'cursor-pointer transition-colors',
      'focus:outline-none',
      this.highlightedIndex() === index
        ? 'bg-accent text-accent-foreground'
        : 'hover:bg-accent hover:text-accent-foreground',
    );
  }

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
    });
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.queryChange.emit(value);
    this.highlightedIndex.set(-1);

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    if (value.length >= this.minChars()) {
      this.isOpen.set(true);
      this.debounceTimer = setTimeout(() => {
        this.search.emit(value);
      }, this.debounceMs());
    } else {
      this.isOpen.set(false);
    }
  }

  onFocus(): void {
    if (this.query().length >= this.minChars()) {
      this.isOpen.set(true);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    const suggestions = this.filteredSuggestions();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.isOpen.set(true);
        } else {
          this.highlightedIndex.update((i) =>
            Math.min(i + 1, suggestions.length - 1),
          );
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex.update((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        const index = this.highlightedIndex();
        if (index >= 0 && index < suggestions.length) {
          this.selectSuggestion(suggestions[index]);
        } else if (this.query().length >= this.minChars()) {
          this.search.emit(this.query());
        }
        break;
      case 'Escape':
        this.isOpen.set(false);
        this.highlightedIndex.set(-1);
        break;
    }
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen.set(false);
    }
  }

  selectSuggestion(suggestion: SearchSuggestion): void {
    this.query.set(suggestion.label);
    this.queryChange.emit(suggestion.label);
    this.suggestionSelect.emit(suggestion);
    this.isOpen.set(false);
    this.highlightedIndex.set(-1);
  }

  clear(): void {
    this.query.set('');
    this.queryChange.emit('');
    this.isOpen.set(false);
    this.highlightedIndex.set(-1);
    this.inputRef()?.nativeElement.focus();
  }

  focus(): void {
    this.inputRef()?.nativeElement.focus();
  }
}
