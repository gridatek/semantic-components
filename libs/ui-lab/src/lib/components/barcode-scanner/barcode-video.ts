import { Directive, ElementRef, inject } from '@angular/core';
import { SC_BARCODE_SCANNER } from './barcode-scanner';

@Directive({
  selector: 'video[scBarcodeVideo]',
  exportAs: 'scBarcodeVideo',
  host: {
    'data-slot': 'barcode-video',
    autoplay: '',
    playsinline: '',
    muted: '',
  },
})
export class ScBarcodeVideo {
  private readonly el = inject(ElementRef<HTMLVideoElement>);
  private readonly scanner = inject(SC_BARCODE_SCANNER);

  constructor() {
    this.scanner.setVideoElement(this.el.nativeElement);
  }
}
