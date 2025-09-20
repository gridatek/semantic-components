import { CdkOverlayOrigin, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { ScCountry } from './types';

@Component({
  selector: 'sc-country-dropdown',
  imports: [OverlayModule],
  template: `
    <ng-template
      [cdkConnectedOverlayOrigin]="overlayOrigin()"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="overlayPositions()"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      (backdropClick)="backdropClick.emit()"
      cdkConnectedOverlay
      cdkConnectedOverlayPanelClass="z-50"
    >
      <div class="w-80 rounded-md border bg-popover p-0 text-popover-foreground shadow-md">
        <div class="p-2">
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            #searchInput
            [value]="searchTerm()"
            [attr.aria-expanded]="isOpen()"
            [attr.aria-activedescendant]="'country-option-' + activeIndex()"
            (input)="searchChange.emit($event)"
            (keydown)="keydown.emit($event)"
            type="text"
            placeholder="Search countries..."
            role="combobox"
            aria-label="Search countries"
          />
        </div>
        <div
          class="max-h-60 overflow-y-auto"
          #countryListContainer
          [attr.aria-label]="'Country selection'"
          role="listbox"
        >
          @for (country of countries(); track country.code; let i = $index) {
            <div
              class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer"
              [class.bg-accent]="i === activeIndex()"
              [class.text-accent-foreground]="i === activeIndex()"
              [attr.aria-selected]="i === activeIndex()"
              [id]="'country-option-' + i"
              (click)="countrySelect.emit(country)"
              role="option"
            >
              <div
                class="w-6 h-4 rounded-sm overflow-hidden bg-gray-200 flex items-center justify-center mr-3"
              >
                <img
                  class="w-full h-full object-cover"
                  [src]="'https://flagcdn.com/w20/' + country.code.toLowerCase() + '.png'"
                  [alt]="country.name + ' flag'"
                  loading="lazy"
                />
              </div>
              <span class="flex-1">{{ country.name }}</span>
              <span class="text-muted-foreground">{{ country.dialCode }}</span>
            </div>
          }
        </div>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCountryDropdown {
  readonly overlayOrigin = input.required<CdkOverlayOrigin>();
  readonly isOpen = input<boolean>(false);
  readonly countries = input.required<ScCountry[]>();
  readonly searchTerm = input<string>('');
  readonly activeIndex = input<number>(-1);
  readonly overlayPositions = input.required<ConnectedPosition[]>();

  readonly searchChange = output<Event>();
  readonly keydown = output<KeyboardEvent>();
  readonly countrySelect = output<ScCountry>();
  readonly backdropClick = output<void>();

  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly countryListContainer = viewChild<ElementRef<HTMLDivElement>>('countryListContainer');

  scrollToActiveCountry(): void {
    const container = this.countryListContainer()?.nativeElement;
    const activeIndex = this.activeIndex();

    if (!container || activeIndex < 0) return;

    const activeElement = container.querySelector(`#country-option-${activeIndex}`) as HTMLElement;

    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }

  focusSearchInput(): void {
    setTimeout(() => {
      this.searchInput()?.nativeElement.focus();
    }, 50);
  }
}
