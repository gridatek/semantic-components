import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import type {
  ConfettiOptions,
  ConfettiParticle,
  ConfettiShape,
} from './confetti-types';
import { DEFAULT_CONFETTI_OPTIONS } from './confetti-types';

@Component({
  selector: 'sc-confetti',
  template: `
    <canvas
      #canvas
      class="pointer-events-none fixed inset-0 z-50"
      [width]="canvasWidth()"
      [height]="canvasHeight()"
      [class.hidden]="!isActive()"
    ></canvas>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScConfetti {
  private readonly destroyRef = inject(DestroyRef);
  readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  readonly options = input<ConfettiOptions>({});

  readonly complete = output<void>();

  protected readonly isActive = signal(false);
  protected readonly canvasWidth = signal(0);
  protected readonly canvasHeight = signal(0);

  private particles: ConfettiParticle[] = [];
  private animationId: number | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() {
    afterNextRender(() => {
      this.updateCanvasSize();
      this.setupResizeHandler();
    });
  }

  private updateCanvasSize(): void {
    this.canvasWidth.set(window.innerWidth);
    this.canvasHeight.set(window.innerHeight);
  }

  private setupResizeHandler(): void {
    const handler = () => this.updateCanvasSize();
    window.addEventListener('resize', handler);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', handler);
      this.stop();
    });
  }

  fire(customOptions?: ConfettiOptions): void {
    const opts = {
      ...DEFAULT_CONFETTI_OPTIONS,
      ...this.options(),
      ...customOptions,
    };
    this.createParticles(opts);
    this.isActive.set(true);
    this.startAnimation(opts);
  }

  fireFromElement(element: HTMLElement, customOptions?: ConfettiOptions): void {
    const rect = element.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };
    this.fire({ ...customOptions, origin });
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.particles = [];
    this.isActive.set(false);
    this.clearCanvas();
  }

  private createParticles(opts: Required<ConfettiOptions>): void {
    this.particles = [];
    const originX = opts.origin.x * this.canvasWidth();
    const originY = opts.origin.y * this.canvasHeight();

    for (let i = 0; i < opts.particleCount; i++) {
      const angle =
        (Math.random() * opts.spread - opts.spread / 2) * (Math.PI / 180);
      const velocity = opts.startVelocity * (0.5 + Math.random() * 0.5);

      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.sin(angle) * velocity + opts.drift,
        vy: -Math.cos(angle) * velocity,
        color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
        size: 8 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: opts.shapes[Math.floor(Math.random() * opts.shapes.length)],
      });
    }
  }

  private startAnimation(opts: Required<ConfettiOptions>): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      if (elapsed >= opts.duration || this.particles.length === 0) {
        this.stop();
        this.complete.emit();
        return;
      }

      this.updateParticles(opts);
      this.drawParticles();

      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  }

  private updateParticles(opts: Required<ConfettiOptions>): void {
    const height = this.canvasHeight();

    this.particles = this.particles.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += opts.gravity * 0.5;
      p.vx *= opts.decay;
      p.vy *= opts.decay;
      p.rotation += p.rotationSpeed;

      return p.y < height + 50;
    });
  }

  private drawParticles(): void {
    if (!this.ctx) return;

    this.clearCanvas();

    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;

      this.drawShape(p.shape, p.size);

      this.ctx.restore();
    }
  }

  private drawShape(shape: ConfettiShape, size: number): void {
    if (!this.ctx) return;

    switch (shape) {
      case 'square':
        this.ctx.fillRect(-size / 2, -size / 2, size, size);
        break;
      case 'circle':
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        this.ctx.fill();
        break;
      case 'triangle':
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size / 2);
        this.ctx.lineTo(size / 2, size / 2);
        this.ctx.lineTo(-size / 2, size / 2);
        this.ctx.closePath();
        this.ctx.fill();
        break;
      case 'ribbon':
        this.ctx.fillRect(-size / 4, -size, size / 2, size * 2);
        break;
    }
  }

  private clearCanvas(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvasWidth(), this.canvasHeight());
  }
}
