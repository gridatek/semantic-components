import { Service, signal } from '@angular/core';
import { ASSETS, type Asset, type AssetType, dateTexts } from './media-data';

/** The files an upload takes, by their MIME type. */
const UPLOAD_TYPES: Record<string, AssetType> = {
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'image/webp': 'WEBP',
  'video/mp4': 'MP4',
  'application/pdf': 'PDF',
};

/** For the file input's `accept`. */
export const UPLOAD_ACCEPT = Object.keys(UPLOAD_TYPES).join(',');

/**
 * The media, for the Media Library's two views: uploaded, tagged, deleted
 * here, and the asset selected. In memory — the files stay in the page (a
 * reload starts from the samples); put your API behind it.
 */
@Service()
export class MediaStore {
  private readonly items = signal<Asset[]>(ASSETS);
  readonly assets = this.items.asReadonly();

  /** The asset whose details show beside the grid. */
  readonly selectedId = signal(ASSETS[0].id);

  get(id: string): Asset | null {
    return this.items().find((asset) => asset.id === id) ?? null;
  }

  /**
   * Adds the files it takes (images, MP4, PDF), first in the library;
   * returns them, and the names of those it doesn't take.
   */
  upload(files: Iterable<File>): { added: Asset[]; skipped: string[] } {
    const added: Asset[] = [];
    const skipped: string[] = [];
    const today = dateTexts(Temporal.Now.plainDateISO());
    for (const file of files) {
      const type = UPLOAD_TYPES[file.type];
      if (!type) {
        skipped.push(file.name);
        continue;
      }
      const asset: Asset = {
        id: crypto.randomUUID(),
        name: file.name,
        date: today.short,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type,
        dimensions: 'N/A',
        uploadedBy: 'You',
        uploadedByInitials: 'YO',
        uploadedOn: today.long,
        tags: [],
        usedIn: [],
        url: URL.createObjectURL(file),
      };
      added.push(asset);
      if (type !== 'MP4' && type !== 'PDF') void this.measure(asset.id, file);
    }
    this.items.update((items) => [...added, ...items]);
    return { added, skipped };
  }

  addTag(id: string, tag: string): void {
    const clean = tag.trim().toLowerCase().replace(/\s+/g, '-');
    if (!clean) return;
    this.change(id, (asset) =>
      asset.tags.includes(clean)
        ? asset
        : { ...asset, tags: [...asset.tags, clean] },
    );
  }

  removeTag(id: string, tag: string): void {
    this.change(id, (asset) => ({
      ...asset,
      tags: asset.tags.filter((t) => t !== tag),
    }));
  }

  /** Deletes an asset; returns a function that puts it back. */
  remove(id: string): () => void {
    const items = this.items();
    const index = items.findIndex((asset) => asset.id === id);
    if (index < 0) return () => undefined;
    const asset = items[index];
    const rest = items.filter((item) => item.id !== id);
    this.items.set(rest);
    if (this.selectedId() === id && rest.length) {
      this.selectedId.set(rest[Math.min(index, rest.length - 1)].id);
    }
    return () =>
      this.items.update((now) => [
        ...now.slice(0, index),
        asset,
        ...now.slice(index),
      ]);
  }

  private change(id: string, change: (asset: Asset) => Asset): void {
    this.items.update((items) =>
      items.map((asset) => (asset.id === id ? change(asset) : asset)),
    );
  }

  /** An image's width and height, once read. */
  private async measure(id: string, file: File): Promise<void> {
    try {
      const bitmap = await createImageBitmap(file);
      const dimensions = `${bitmap.width} × ${bitmap.height}`;
      bitmap.close();
      this.change(id, (asset) => ({ ...asset, dimensions }));
    } catch {
      // Not readable: it stays N/A.
    }
  }
}
