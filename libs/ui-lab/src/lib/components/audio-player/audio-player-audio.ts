import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { SC_AUDIO_PLAYER } from './audio-player';

@Component({
  selector: 'audio[sc-audio-player-audio]',
  template: ``,
  host: {
    'data-slot': 'audio-player-audio',
    '[src]': 'player.currentTrack()?.src',
    '(timeupdate)': 'player.onTimeUpdate()',
    '(loadedmetadata)': 'player.onLoadedMetadata()',
    '(ended)': 'player.onEnded()',
    '(play)': 'player.isPlaying.set(true)',
    '(pause)': 'player.isPlaying.set(false)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerAudio {
  readonly player = inject(SC_AUDIO_PLAYER);
  private readonly elementRef = inject(ElementRef<HTMLAudioElement>);

  constructor() {
    this.player.registerAudioElement(this.elementRef.nativeElement);
  }
}
