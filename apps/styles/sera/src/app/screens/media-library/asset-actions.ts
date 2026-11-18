import { DOCUMENT } from '@angular/common';
import { Service, inject } from '@angular/core';
import { ScToaster } from '@semantic-components/ui';
import { type Asset } from './media-data';
import { MediaStore } from './media-store';

/** What the media views do to an asset — with its toast. */
@Service()
export class AssetActions {
  private readonly document = inject(DOCUMENT);
  private readonly store = inject(MediaStore);
  private readonly toaster = inject(ScToaster);

  /** Saves the file; a sample has none to save. */
  download(asset: Asset): void {
    if (!asset.url) {
      this.toaster.show({
        variant: 'info',
        title: 'Sample asset',
        description: `${asset.name} has no file: upload your own to download them.`,
      });
      return;
    }
    const link = this.document.createElement('a');
    link.href = asset.url;
    link.download = asset.name;
    link.click();
  }

  /** Deletes it, with an Undo. */
  delete(asset: Asset): void {
    const restore = this.store.remove(asset.id);
    this.toaster.show({
      title: 'Asset deleted',
      description: asset.name,
      action: { label: 'Undo', onClick: restore },
    });
  }
}
