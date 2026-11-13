import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

const BAR_WIDTH = 3;
const BAR_GAP = 2;
const BAR_RADIUS = 1.5;
const MIN_BAR = 4;
const FADE_WIDTH = 24;
const HISTORY = 120;
const UPDATE_MS = 30;

/**
 * A live waveform on a canvas (the demo's own, as shadcn's preview has it,
 * from ElevenLabs UI): the microphone's levels while `active`, a calm wave
 * while `processing`, fading out when neither. `static` mirrors the spectrum
 * from the middle; `scrolling` moves the loudness leftwards.
 */
@Component({
  selector: 'app-live-waveform-canvas',
  template: `<canvas #canvas class="block size-full"></canvas>`,
  host: {
    class: 'relative block h-20 w-full text-muted-foreground',
    role: 'img',
    '[attr.aria-label]':
      'active() ? "Live audio waveform" : processing() ? "Processing audio" : "Audio waveform, idle"',
  },
  encapsulation: ViewEncapsulation.None,
})
export class LiveWaveformCanvas {
  readonly active = input(false);
  readonly processing = input(false);
  readonly mode = input<'static' | 'scrolling'>('static');
  /** The microphone couldn't be opened (no permission, no device). */
  readonly micError = output<void>();

  private readonly canvas =
    viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host = inject(ElementRef<HTMLElement>);

  private bars: number[] = [];
  private history: number[] = [];
  private time = 0;
  private lastUpdate = 0;
  private analyser: AnalyserNode | null = null;
  private audio: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private frame = 0;

  constructor() {
    // The microphone, opened while active.
    effect(() => {
      if (this.active()) void this.openMic();
      else this.closeMic();
    });
    // A new mode starts empty.
    effect(() => {
      this.mode();
      this.bars = [];
      this.history = [];
    });
    afterNextRender(() => {
      const loop = (now: number) => {
        this.draw(now);
        this.frame = requestAnimationFrame(loop);
      };
      this.frame = requestAnimationFrame(loop);
    });
    inject(DestroyRef).onDestroy(() => {
      // A frame only if one was asked for — never on the server, which has none.
      if (this.frame) cancelAnimationFrame(this.frame);
      this.closeMic();
    });
  }

  private async openMic(): Promise<void> {
    if (this.stream) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      if (!this.active()) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      const audio = new AudioContext();
      const analyser = audio.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      audio.createMediaStreamSource(stream).connect(analyser);
      this.stream = stream;
      this.audio = audio;
      this.analyser = analyser;
      this.history = [];
    } catch {
      this.micError.emit();
    }
  }

  private closeMic(): void {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    if (this.audio && this.audio.state !== 'closed') void this.audio.close();
    this.audio = null;
    this.analyser = null;
  }

  /** The levels for this frame, then the bars drawn. */
  private draw(now: number): void {
    const canvas = this.canvas().nativeElement;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(rect.width * dpr)) {
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }
    const ctx = canvas.getContext('2d');
    if (!ctx || rect.width === 0) return;

    const step = BAR_WIDTH + BAR_GAP;
    const count = Math.floor(rect.width / step);
    const half = Math.floor(count / 2);

    if (this.active() && this.analyser) {
      if (now - this.lastUpdate > UPDATE_MS) {
        this.lastUpdate = now;
        const data = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(data);
        const voice = data.slice(
          Math.floor(data.length * 0.05),
          Math.floor(data.length * 0.4),
        );
        if (this.mode() === 'static') {
          const side = Array.from({ length: half }, (_, i) =>
            Math.max(
              0.05,
              Math.min(1, voice[Math.floor((i / half) * voice.length)] / 255),
            ),
          );
          this.bars = [...side.slice().reverse(), ...side];
        } else {
          const average =
            voice.reduce((sum, v) => sum + v, 0) / voice.length / 255;
          this.history.push(Math.min(1, Math.max(0.05, average)));
          if (this.history.length > HISTORY) this.history.shift();
        }
      }
    } else if (this.processing()) {
      this.time += 0.03;
      const wave = Array.from({ length: count }, (_, i) => {
        const position = (i - half) / (half || 1);
        const weight = 1 - Math.abs(position) * 0.4;
        const t = this.time;
        const shape =
          this.mode() === 'static'
            ? Math.sin(t * 1.5 + position * 3) * 0.25 +
              Math.sin(t * 0.8 - position * 2) * 0.2 +
              Math.cos(t * 2 + position) * 0.15
            : Math.sin(t * 1.5 + i * 0.15) * 0.25 +
              Math.sin(t * 0.8 - i * 0.1) * 0.2 +
              Math.cos(t * 2 + i * 0.05) * 0.15;
        return Math.max(0.05, Math.min(1, (0.2 + shape) * weight));
      });
      if (this.mode() === 'static') this.bars = wave;
      else this.history = wave;
    } else {
      // Neither: what is there fades away.
      this.bars = this.bars.map((v) => v * 0.97);
      this.history = this.history.map((v) => v * 0.97);
      if (this.bars.every((v) => v < 0.01)) this.bars = [];
      if (this.history.every((v) => v < 0.01)) this.history = [];
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = getComputedStyle(this.host.nativeElement).color;
    const middle = rect.height / 2;
    const bar = (x: number, value: number) => {
      const height = Math.max(MIN_BAR, value * rect.height * 0.8);
      ctx.globalAlpha = 0.4 + value * 0.6;
      ctx.beginPath();
      ctx.roundRect(x, middle - height / 2, BAR_WIDTH, height, BAR_RADIUS);
      ctx.fill();
    };
    if (this.mode() === 'static') {
      for (let i = 0; i < count && i < this.bars.length; i++)
        bar(i * step, this.bars[i]);
    } else {
      for (let i = 0; i < count && i < this.history.length; i++)
        bar(
          rect.width - (i + 1) * step,
          this.history[this.history.length - 1 - i],
        );
    }

    // The edges fade out.
    const fade = Math.min(0.3, FADE_WIDTH / rect.width);
    const gradient = ctx.createLinearGradient(0, 0, rect.width, 0);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(fade, 'rgba(255,255,255,0)');
    gradient.addColorStop(1 - fade, 'rgba(255,255,255,0)');
    gradient.addColorStop(1, 'rgba(255,255,255,1)');
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.globalCompositeOperation = 'source-over';
  }
}
