import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AudioPlayerDemoContainer } from './demos/audio-player-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-audio-player-page',
  imports: [AudioPlayerDemoContainer, TocHeading, ComponentStatusBadge],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">AudioPlayer</h1>
        <p class="text-muted-foreground">
          Feature-rich audio player with playlist support, shuffle, and repeat.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-audio-player-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioPlayerPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'audio-player')!
    .status;
}
