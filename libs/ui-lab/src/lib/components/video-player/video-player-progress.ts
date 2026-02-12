import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'div[sc-video-player-progress]',
  template: `
    <!-- Buffered -->
    <div
      class="absolute inset-y-0 left-0 bg-white/50 rounded-full pointer-events-none"
      [style.width.%]="player.bufferedPercent()"
    ></div>
    <!-- Progress -->
    <div
      class="absolute inset-y-0 left-0 bg-white rounded-full pointer-events-none"
      [style.width.%]="player.progressPercent()"
    ></div>
    <!-- Thumb -->
    <div
      class="absolute top-1/2 -translate-y-1/2 size-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      [style.left.%]="player.progressPercent()"
      [style.transform]="'translate(-50%, -50%)'"
    ></div>
  `,
  host: {
    '[class]': 'class()',
    '(click)': 'onClick($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerProgress {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative h-1 bg-white/30 rounded-full cursor-pointer group',
      this.classInput(),
    ),
  );

  protected onClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    this.player.seek(percent);
  }
}
