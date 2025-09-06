import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiFileVideoIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';
import { ScExtensions } from '../extensions';
import { ScEditorVideoInsertDialog, VideoData } from './editor-video-insert-dialog';

@Component({
  selector: 'sc-editor-video-insert',
  imports: [ScToggle, ScTooltip, SiFileVideoIcon],
  template: `
    <button
      (click)="openDialog()"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Insert video"
      type="button"
    >
      <svg class="w-4 h-4" si-file-video-icon></svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorVideoInsert {
  private readonly parent = inject(ScEditor);
  private readonly dialog = inject(Dialog);
  private readonly extensions = inject(ScExtensions);

  constructor() {
    this.extensions.youtube.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  setYoutubeVideo(video: VideoData | undefined) {
    if (video?.url) {
      this.editor.commands.setYoutubeVideo({
        src: video.url,
        width: video.width ? video.width : 640,
        height: video.height ? video.height : 480,
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open<VideoData>(ScEditorVideoInsertDialog, {
      minWidth: '600px',
    });

    dialogRef.closed.subscribe((result) => {
      this.setYoutubeVideo(result);
    });
  }
}
