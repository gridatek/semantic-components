import {
  Component,
  ElementRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { SC_AUDIO_PLAYER } from './audio-player';

@Component({
  selector: 'audio[scAudioPlayerAudio]',
  template: ``,
  host: {
    '[src]': 'player.currentTrack()?.src',
    '(timeupdate)': 'player.onTimeUpdate()',
    '(loadedmetadata)': 'player.onLoadedMetadata()',
    '(progress)': 'player.onProgress()',
    '(ended)': 'player.onEnded()',
    '(play)': 'player.isPlaying.set(true)',
    '(pause)': 'player.isPlaying.set(false)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAudioPlayerAudio {
  readonly player = inject(SC_AUDIO_PLAYER);
  private readonly elementRef = inject(ElementRef<HTMLAudioElement>);

  constructor() {
    this.player.registerAudioElement(this.elementRef.nativeElement);
  }
}
