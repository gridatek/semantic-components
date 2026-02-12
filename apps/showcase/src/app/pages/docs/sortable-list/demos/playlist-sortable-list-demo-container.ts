import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PlaylistSortableListDemo } from './playlist-sortable-list-demo';

@Component({
  selector: 'app-playlist-sortable-list-demo-container',
  imports: [DemoContainer, PlaylistSortableListDemo],
  template: `
    <app-demo-container title="Playlist" [code]="code">
      <app-playlist-sortable-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistSortableListDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSortableHandle,
  ScSortableItem,
  ScSortableList,
  ScSortableOverlay,
} from '@semantic-components/ui-lab';

interface PlaylistItem {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

@Component({
  selector: 'app-playlist-sortable-list-demo',
  imports: [
    ScSortableList,
    ScSortableItem,
    ScSortableHandle,
    ScSortableOverlay,
  ],
  template: \`
    <div class="max-w-lg">
      <div class="rounded-lg border">
        <div class="border-b bg-muted/50 px-4 py-2">
          <h4 class="font-medium">My Playlist</h4>
        </div>
        <div
          sc-sortable-list
          [(items)]="playlist"
          [handleOnly]="true"
          class="divide-y"
        >
          <div sc-sortable-overlay></div>
          @for (song of playlist(); track song.id; let i = $index) {
            <div
              sc-sortable-item
              [index]="i"
              [item]="song"
              class="flex items-center gap-4 px-4 py-3 hover:bg-muted/50"
            >
              <span sc-sortable-handle class="p-1"></span>
              <span class="w-6 text-sm text-muted-foreground">
                {{ i + 1 }}
              </span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{{ song.title }}</p>
                <p class="text-xs text-muted-foreground truncate">
                  {{ song.artist }}
                </p>
              </div>
              <span class="text-sm text-muted-foreground">
                {{ song.duration }}
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistSortableListDemo {
  readonly playlist = signal<PlaylistItem[]>([
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
    {
      id: 2,
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      duration: '8:02',
    },
    { id: 3, title: 'Hotel California', artist: 'Eagles', duration: '6:30' },
    {
      id: 4,
      title: 'Sweet Child O Mine',
      artist: "Guns N' Roses",
      duration: '5:56',
    },
    {
      id: 5,
      title: 'Comfortably Numb',
      artist: 'Pink Floyd',
      duration: '6:24',
    },
  ]);
}`;
}
