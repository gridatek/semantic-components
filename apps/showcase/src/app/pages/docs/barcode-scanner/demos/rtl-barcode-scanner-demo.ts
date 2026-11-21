import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import {
  ScBarcodeScanner,
  ScBarcodeScannerOverlay,
  ScBarcodeScannerToggle,
  ScBarcodeScannerVideo,
} from '@semantic-components/ui/barcode-scanner';
import { SiCameraIcon, SiCameraOffIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: your words, and the row, follow it; the camera's picture is never mirrored. */
@Component({
  selector: 'app-rtl-barcode-scanner-demo',
  imports: [
    Dir,
    ScBarcodeScanner,
    ScBarcodeScannerVideo,
    ScBarcodeScannerOverlay,
    ScBarcodeScannerToggle,
    ScFrame,
    SiCameraIcon,
    SiCameraOffIcon,
  ],
  template: `
    <div
      dir="rtl"
      lang="ar"
      scBarcodeScanner
      #scanner="scBarcodeScanner"
      (detected)="last.set($event.rawValue)"
      class="w-full max-w-md space-y-3"
    >
      <div scFrame class="relative aspect-4/3 overflow-hidden bg-black">
        <video scBarcodeScannerVideo></video>
        <svg scBarcodeScannerOverlay></svg>
        @switch (scanner.state()) {
          @case ('idle') {
            <p
              class="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white"
            >
              الكاميرا متوقفة.
            </p>
          }
          @case ('denied') {
            <p
              class="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white"
            >
              رُفض الوصول إلى الكاميرا: اسمح به في متصفحك للمسح.
            </p>
          }
          @case ('unavailable') {
            <p
              class="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white"
            >
              لا توجد كاميرا: امسح صورة بدلًا من ذلك.
            </p>
          }
          @case ('unsupported') {
            <p
              class="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white"
            >
              لا يستطيع هذا المتصفح قراءة الرموز.
            </p>
          }
        }
      </div>
      <div class="flex items-center gap-3">
        <button scBarcodeScannerToggle>
          @if (scanner.active()) {
            <svg siCameraOffIcon></svg>
            إيقاف
          } @else {
            <svg siCameraIcon></svg>
            مسح
          }
        </button>
        <p
          class="text-muted-foreground min-w-0 truncate text-sm"
          aria-live="polite"
        >
          {{ last() ? 'تمت القراءة: ' + last() : 'وجّه الكاميرا نحو رمز.' }}
        </p>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlBarcodeScannerDemo {
  private readonly last = signal('');
}
