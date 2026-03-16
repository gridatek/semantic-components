import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScQrCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-use-cases-qr-code-demo',
  imports: [ScQrCode],
  template: `
    <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
      @for (item of useCases; track item.label) {
        <div class="flex flex-col items-center gap-1">
          <div scQrCode [value]="item.value" class="size-28"></div>
          <p class="text-muted-foreground text-xs">{{ item.label }}</p>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseCasesQrCodeDemo {
  readonly useCases = [
    { value: 'https://angular.dev', label: 'Website URL' },
    { value: 'tel:+1234567890', label: 'Phone Number' },
    { value: 'mailto:hello@example.com', label: 'Email' },
    { value: 'WIFI:T:WPA;S:MyNetwork;P:password123;;', label: 'WiFi' },
  ];
}
