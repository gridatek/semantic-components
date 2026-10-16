import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScBarcodeScannerNext } from './barcode-scanner-next';

/** Your `video`: the camera, filling the scanner (the front one, mirrored). */
@Directive({
  selector: 'video[scBarcodeScannerNextVideo]',
  host: {
    'data-slot': 'barcode-scanner-video',
    playsinline: '',
    muted: '',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScBarcodeScannerNextVideo {
  private readonly scanner = inject(ScBarcodeScannerNext);

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
