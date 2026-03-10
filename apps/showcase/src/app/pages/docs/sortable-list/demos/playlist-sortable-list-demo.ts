import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';

interface PlaylistItem {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

@Component({
  selector: 'app-playlist-sortable-list-demo',
  imports: [CdkDropList, CdkDrag, CdkDragHandle, SiGripVerticalIcon],
  template: `
    <div class="max-w-lg">
      <div class="rounded-lg border">
        <div class="bg-muted/50 border-b px-4 py-2">
          <h4 class="font-medium">My Playlist</h4>
        </div>
        <div
          cdkDropList
          [cdkDropListData]="playlist()"
          (cdkDropListDropped)="drop($event)"
          class="divide-y"
        >
          @for (song of playlist(); track song.id; let i = $index) {
            <div
              cdkDrag
              class="hover:bg-muted/50 flex items-center gap-4 px-4 py-3"
            >
              <svg
                cdkDragHandle
                siGripVerticalIcon
                class="text-muted-foreground size-4 shrink-0 cursor-grab"
              ></svg>
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
  host: { class: 'flex w-full justify-center' },
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

  drop(event: CdkDragDrop<PlaylistItem[]>): void {
    this.playlist.update((playlist) => {
      const updated = [...playlist];
      moveItemInArray(updated, event.previousIndex, event.currentIndex);
      return updated;
    });
  }
}
