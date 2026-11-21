import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import {
  SC_BARCODE_SCANNER_CONFIG,
  type ScBarcode,
  type ScBarcodeDetector,
  type ScBarcodeFormat,
  type ScBarcodeScannerState,
  loadBarcodeDetector,
} from './barcode';

/** The same code, seen again within this time, is the same reading. */
const SEEN_FOR = 1500;

/**
 * Reads barcodes — from the camera (`active`), or a picture (`scan()`,
 * `scBarcodeScannerFile`). Each new code comes out of `(detected)`; to
 * scan once, turn it off there. It reads with the browser's BarcodeDetector —
 * or, where there is none, barcode-detector's (an optional peer), loaded on
 * the first scan.
 */
@Directive({
  selector: '[scBarcodeScanner]',
  exportAs: 'scBarcodeScanner',
  host: {
    'data-slot': 'barcode-scanner',
    '[attr.data-state]': 'state()',
    '[class]': 'class()',
  },
})
export class ScBarcodeScanner {
  private readonly document = inject(DOCUMENT);
  private readonly wasmUrl = inject(SC_BARCODE_SCANNER_CONFIG, {
    optional: true,
  })?.wasmUrl;

  readonly classInput = input<string>('', { alias: 'class' });

  /** The camera on, scanning. */
  readonly active = model(false);
  /** The formats to read; none, all the browser can. */
  readonly formats = input<readonly ScBarcodeFormat[]>([]);

  /** Each new code read. */
  readonly detected = output<ScBarcode>();

  readonly state = signal<ScBarcodeScannerState>('idle');
  /** The codes in the camera's frame now. */
  readonly codes = signal<readonly ScBarcode[]>([]);

  /** The video: set by `video[scBarcodeScannerVideo]`. */
  readonly ɵvideo = signal<HTMLVideoElement | null>(null);
  /** The camera's picture size. */
  readonly ɵsize = signal({ width: 0, height: 0 });

  private readonly class = computed(() => cn('block', this.classInput()));

  private stream: MediaStream | null = null;
  /** For the formats: made on the first scan, again when they change. */
  private detector: Promise<ScBarcodeDetector | null> | null = null;
  private readonly seen = new Map<string, number>();
  /** Each start; a stale one stops itself. */
  private run = 0;

  constructor() {
    // Other formats: another detector, on the next frame.
    effect(() => {
      this.formats();
      this.detector = null;
    });
    // The camera, on and off.
    effect(() => {
      const active = this.active();
      const video = this.ɵvideo();
      untracked(() => {
        this.stop();
        if (active && video) void this.start(video);
      });
    });
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  /** Reads the codes in a picture (a file, a blob, an image…); each comes out of `(detected)` too. */
  async scan(source: Blob | ImageBitmapSource): Promise<ScBarcode[]> {
    const detector = await this.getDetector();
    if (!detector) return [];
    const image =
      source instanceof Blob ? await createImageBitmap(source) : source;
    try {
      const codes = await detector.detect(image);
      codes.forEach((code) => this.detected.emit(code));
      return codes;
    } catch {
      return [];
    } finally {
      if (image instanceof ImageBitmap && source instanceof Blob) {
        image.close();
      }
    }
  }

  private async start(video: HTMLVideoElement): Promise<void> {
    const run = ++this.run;
    this.state.set('starting');
    // Nothing to read with: unsupported (getDetector says so).
    if (!(await this.getDetector()) || run !== this.run) return;
    const media = this.document.defaultView?.navigator.mediaDevices;
    if (!media?.getUserMedia) {
      this.state.set('unavailable');
      this.active.set(false);
      return;
    }
    try {
      const stream = await media.getUserMedia({
        // The one at the back, where there is one.
        video: { facingMode: 'environment' },
        audio: false,
      });
      if (run !== this.run) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      this.stream = stream;
      video.srcObject = stream;
      await video.play();
      this.state.set('scanning');
      this.watch(video, run);
    } catch (error) {
      if (run !== this.run) return;
      this.state.set(
        (error as DOMException).name === 'NotAllowedError'
          ? 'denied'
          : 'unavailable',
      );
      this.active.set(false);
    }
  }

  /** Reads the video's frames, one at a time. */
  private watch(video: HTMLVideoElement, run: number): void {
    const next = () => {
      if (run !== this.run) return;
      video.requestVideoFrameCallback(() => void read());
    };
    const read = async () => {
      const detector = await this.getDetector();
      if (run !== this.run || !detector) return;
      this.ɵsize.set({ width: video.videoWidth, height: video.videoHeight });
      try {
        const codes = await detector.detect(video);
        if (run !== this.run) return;
        this.codes.set(codes);
        this.report(codes);
      } catch {
        // A frame not ready: the next one.
      }
      next();
    };
    next();
  }

  /** The detector for the formats: the browser's, or barcode-detector's, loaded once. */
  private getDetector(): Promise<ScBarcodeDetector | null> {
    this.detector ??= this.makeDetector(untracked(this.formats));
    return this.detector;
  }

  private async makeDetector(
    formats: readonly ScBarcodeFormat[],
  ): Promise<ScBarcodeDetector | null> {
    const Detector = await loadBarcodeDetector(this.wasmUrl);
    if (!Detector) {
      this.state.set('unsupported');
      this.active.set(false);
      return null;
    }
    return new Detector(formats.length ? { formats } : undefined);
  }

  /** New codes out; a code seen again (within a moment) is not new. */
  private report(codes: readonly ScBarcode[]): void {
    const now = performance.now();
    for (const code of codes) {
      const key = `${code.format}:${code.rawValue}`;
      const last = this.seen.get(key);
      this.seen.set(key, now);
      if (last === undefined || now - last > SEEN_FOR) this.detected.emit(code);
    }
  }

  private stop(): void {
    this.run++;
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    const video = this.ɵvideo();
    if (video) video.srcObject = null;
    this.codes.set([]);
    this.seen.clear();
    const state = this.state();
    if (state === 'starting' || state === 'scanning') this.state.set('idle');
  }
}
