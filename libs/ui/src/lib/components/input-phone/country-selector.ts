import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

import { ScCountry } from './types';

@Component({
  selector: 'sc-country-selector',
  imports: [OverlayModule],
  template: `
    <button
      class="inline-flex items-center whitespace-nowrap rounded-l-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-r-0 h-10"
      [class.border-destructive]="isInvalid()"
      [disabled]="disabled()"
      (click)="countryClick.emit()"
      (focus)="countryFocus.emit()"
      (blur)="countryBlur.emit()"
      type="button"
    >
      <div
        class="w-6 h-4 rounded-sm overflow-hidden bg-gray-200 flex items-center justify-center mr-2"
      >
        <img
          class="w-full h-full object-cover"
          [src]="'https://flagcdn.com/w20/' + selectedCountry().code.toLowerCase() + '.png'"
          [alt]="selectedCountry().name + ' flag'"
          loading="lazy"
        />
      </div>
      <span class="text-muted-foreground">{{ selectedCountry().dialCode }}</span>
      <svg class="ml-2 h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6" />
      </svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCountrySelector {
  readonly selectedCountry = input.required<ScCountry>();
  readonly isInvalid = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  readonly countryClick = output<void>();
  readonly countryFocus = output<void>();
  readonly countryBlur = output<void>();
}
