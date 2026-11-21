import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScBarcodeScanner } from './barcode-scanner';

/** Your `video`: the camera, filling its frame. */
@Directive({
  selector: 'video[scBarcodeScannerVideo]',
  host: {
    'data-slot': 'barcode-scanner-video',
    playsinline: '',
    muted: '',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScBarcodeScannerVideo {
  private readonly scanner = inject(ScBarcodeScanner);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('block size-full bg-black object-cover', this.classInput()),
  );

  constructor() {
    const video =
      inject<ElementRef<HTMLVideoElement>>(ElementRef).nativeElement;
    video.muted = true;
    this.scanner.ɵvideo.set(video);
  }
}
