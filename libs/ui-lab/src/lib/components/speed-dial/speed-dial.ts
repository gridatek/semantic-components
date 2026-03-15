import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  contentChildren,
  inject,
  input,
  model,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpeedDialAction } from './speed-dial-action';
import {
  SC_SPEED_DIAL,
  SpeedDialDirection,
  SpeedDialSize,
} from './speed-dial-types';

@Directive({
  selector: '[scSpeedDial]',
  exportAs: 'scSpeedDial',
  providers: [{ provide: SC_SPEED_DIAL, useExisting: ScSpeedDial }],
  host: {
    'data-slot': 'speed-dial',
    '[class]': 'class()',
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class ScSpeedDial {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<SpeedDialDirection>('up');
  readonly size = input<SpeedDialSize>('md');

  readonly open = model(false);

  readonly actions = contentChildren(ScSpeedDialAction);

  protected readonly class = computed(() => {
    const dir = this.direction();
    return cn(
      'relative inline-flex',
      dir === 'up' && 'flex-col-reverse items-center',
      dir === 'down' && 'flex-col items-center',
      dir === 'left' && 'flex-row-reverse items-center',
      dir === 'right' && 'flex-row items-center',
      this.classInput(),
    );
  });

  constructor() {
    afterNextRender(() => {
      this.setupOutsideClickHandler();
    });
  }

  toggle(): void {
    this.open.update((v) => !v);
  }

  close(): void {
    if (this.open()) {
      this.open.set(false);
    }
  }

  onEscape(): void {
    this.close();
  }

  private setupOutsideClickHandler(): void {
    const handler = (event: MouseEvent) => {
      if (!this.open()) return;

      const target = event.target as HTMLElement;
      if (!this.elementRef.nativeElement.contains(target)) {
        this.close();
      }
    };

    document.addEventListener('click', handler);

    this.destroyRef.onDestroy(() => {
      document.removeEventListener('click', handler);
    });
  }
}
