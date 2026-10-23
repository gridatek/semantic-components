import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScBarcodeScanner } from './barcode-scanner';

/** Your `video`: the camera, filling the scanner (the front one, mirrored). */
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

  protected readonly class = computed(() =>
    cn(
      'block size-full bg-black object-cover',
      this.scanner.camera() === 'user' && '-scale-x-100',
      this.classInput(),
    ),
  );

  constructor() {
    const video =
      inject<ElementRef<HTMLVideoElement>>(ElementRef).nativeElement;
    video.muted = true;
    this.scanner.ɵvideo.set(video);
  }
}
