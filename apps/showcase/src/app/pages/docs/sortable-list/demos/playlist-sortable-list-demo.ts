import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
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
  template: `
    <div class="max-w-lg">
      <div class="rounded-lg border">
        <div class="bg-muted/50 border-b px-4 py-2">
          <h4 class="font-medium">My Playlist</h4>
        </div>
        <div
          scSortableList
          [(items)]="playlist"
          [handleOnly]="true"
          class="divide-y"
        >
          <div scSortableOverlay></div>
          @for (song of playlist(); track song.id; let i = $index) {
            <div
              scSortableItem
              [index]="i"
              [item]="song"
              class="hover:bg-muted/50 flex items-center gap-4 px-4 py-3"
            >
              <span scSortableHandle class="p-1"></span>
              <span class="text-muted-foreground w-6 text-sm">
                {{ i + 1 }}
              </span>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium">{{ song.title }}</p>
                <p class="text-muted-foreground truncate text-xs">
                  {{ song.artist }}
                </p>
              </div>
              <span class="text-muted-foreground text-sm">
                {{ song.duration }}
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
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
}
