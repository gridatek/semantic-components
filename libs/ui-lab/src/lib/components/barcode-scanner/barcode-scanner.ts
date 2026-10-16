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
import { cn } from '@semantic-components/ui';
import {
  type ScBarcode,
  type ScBarcodeDetector,
  type ScBarcodeFormat,
  type ScBarcodeScannerState,
  barcodeDetector,
} from './barcode';

/** The same code, seen again within this time, is the same reading. */
const SEEN_FOR = 1500;

/**
 * Reads barcodes — from the camera (`active`), or a picture (`scan()`,
 * `scBarcodeScannerFile`). Each new code comes out of `(detected)`; to
 * scan once, turn it off there. Written against the standard BarcodeDetector:
 * where the browser has none, the app adds it (a polyfill).
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

  readonly classInput = input<string>('', { alias: 'class' });

  /** The camera on, scanning. */
  readonly active = model(false);
  /** The formats to read; none, all the browser can. */
  readonly formats = input<readonly ScBarcodeFormat[]>([]);
  /** The camera: the one at the back (`environment`) or the front (`user`). */
  readonly camera = model<'environment' | 'user'>('environment');
  /** The camera's light, where it has one. */
  readonly torch = model(false);

  /** Each new code read. */
  readonly detected = output<ScBarcode>();

  readonly state = signal<ScBarcodeScannerState>(
    barcodeDetector() ? 'idle' : 'unsupported',
  );
  /** The codes in the camera's frame now. */
  readonly codes = signal<readonly ScBarcode[]>([]);
  /** The camera has a light. */
  readonly hasTorch = signal(false);
  /** More than one camera: one to switch to. */
  readonly canSwitchCamera = signal(false);

  /** The video: set by `video[scBarcodeScannerVideo]`. */
  readonly ɵvideo = signal<HTMLVideoElement | null>(null);
  /** The camera's picture size. */
  readonly ɵsize = signal({ width: 0, height: 0 });

  protected readonly class = computed(() => cn('block', this.classInput()));

  private stream: MediaStream | null = null;
  private detector: ScBarcodeDetector | null = null;
  private readonly seen = new Map<string, number>();
  /** Each start; a stale one stops itself. */
  private run = 0;

  constructor() {
    // The detector, for the formats.
    effect(() => {
      const formats = this.formats();
      const Detector = barcodeDetector();
      this.detector = Detector
        ? new Detector(formats.length ? { formats } : undefined)
        : null;
    });
    // The camera, on and off (and again for the other one).
    effect(() => {
      const active = this.active();
      const video = this.ɵvideo();
      const camera = this.camera();
      untracked(() => {
        this.stop();
        if (active && video) void this.start(video, camera);
      });
    });
    effect(() => {
      const torch = this.torch();
      const track = this.stream?.getVideoTracks()[0];
      if (!track || !this.hasTorch()) return;
      void track
        .applyConstraints({
          advanced: [{ torch } as MediaTrackConstraintSet],
        })
        .catch(() => undefined);
    });
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  /** The other camera. */
  switchCamera(): void {
    this.camera.update((camera) =>
      camera === 'environment' ? 'user' : 'environment',
    );
  }

  /** Reads the codes in a picture (a file, a blob, an image…); each comes out of `(detected)` too. */
  async scan(source: Blob | ImageBitmapSource): Promise<ScBarcode[]> {
    if (!this.detector) return [];
    const image =
      source instanceof Blob ? await createImageBitmap(source) : source;
    try {
      const codes = await this.detector.detect(image);
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

  private async start(
    video: HTMLVideoElement,
    camera: 'environment' | 'user',
  ): Promise<void> {
    if (!this.detector) return;
    const run = ++this.run;
    const media = this.document.defaultView?.navigator.mediaDevices;
    if (!media?.getUserMedia) {
      this.state.set('unavailable');
      return;
    }
    this.state.set('starting');
    try {
      const stream = await media.getUserMedia({
        video: { facingMode: camera },
        audio: false,
      });
      if (run !== this.run) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      this.stream = stream;
      video.srcObject = stream;
      await video.play();
      const track = stream.getVideoTracks()[0];
      const capabilities = track?.getCapabilities?.() as
        (MediaTrackCapabilities & { torch?: boolean }) | undefined;
      this.hasTorch.set(!!capabilities?.torch);
      const devices = await media.enumerateDevices();
      this.canSwitchCamera.set(
        devices.filter((device) => device.kind === 'videoinput').length > 1,
      );
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
      if (run !== this.run || !this.detector) return;
      this.ɵsize.set({ width: video.videoWidth, height: video.videoHeight });
      try {
        const codes = await this.detector.detect(video);
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
    this.hasTorch.set(false);
    const state = this.state();
    if (state === 'starting' || state === 'scanning') this.state.set('idle');
  }
}
