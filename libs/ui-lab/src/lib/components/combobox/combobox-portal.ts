import {
  Combobox,
  ComboboxDialog,
  ComboboxInput,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-combobox-portal]',
  imports: [ComboboxPopupContainer, ComboboxDialog, Combobox, ComboboxInput],
  template: `
    <ng-template ngComboboxPopupContainer>
      <dialog #dialog ngComboboxDialog [class]="dialogClass()">
        <div ngCombobox filterMode="manual" [alwaysExpanded]="true">
          <div [class]="searchContainerClass()">
            <svg
              class="mr-2 size-4 shrink-0 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ngComboboxInput
              type="text"
              [class]="searchInputClass()"
              [placeholder]="searchPlaceholder()"
              [(value)]="searchValue"
            />
          </div>
          <ng-template ngComboboxPopupContainer>
            <ng-content />
          </ng-template>
        </div>
      </dialog>
    </ng-template>
  `,
  host: {
    'data-slot': 'combobox-portal',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComboboxPortal {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly searchPlaceholder = input<string>('Search...');
  readonly searchValue = model<string>('');

  private readonly parentCombobox = inject(Combobox);
  private readonly dialogRef =
    viewChild<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly dialogClass = computed(() =>
    cn(
      'bg-popover text-popover-foreground m-0 w-full overflow-hidden rounded-md border p-0 shadow-md',
    ),
  );

  protected readonly searchContainerClass = computed(() =>
    cn('flex items-center border-b px-3'),
  );

  protected readonly searchInputClass = computed(() =>
    cn(
      'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none',
      'placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ),
  );

  constructor() {
    afterRenderEffect(() => {
      const dialogEl = this.dialogRef()?.nativeElement;
      if (!dialogEl) return;

      const inputEl = this.parentCombobox.inputElement();
      if (!inputEl) return;

      const rect = inputEl.getBoundingClientRect();
      dialogEl.style.position = 'fixed';
      dialogEl.style.top = `${rect.bottom + 4}px`;
      dialogEl.style.left = `${rect.left}px`;
      dialogEl.style.width = `${rect.width}px`;
    });
  }
}
