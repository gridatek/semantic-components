import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

interface LayerItem {
  id: string;
  name: string;
  visible: boolean;
}

@Component({
  selector: 'sc-pdf-viewer-layers-view',
  template: `
    @if (layers().length === 0) {
      <p class="p-4 text-center text-xs text-[#999]">No layers available.</p>
    } @else {
      <ul class="space-y-0.5 p-2">
        @for (layer of layers(); track layer.id) {
          <li>
            <label
              class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-xs text-[#bbb] hover:bg-[#4a4a4a] hover:text-white"
            >
              <input
                type="checkbox"
                [checked]="layer.visible"
                (change)="toggleLayer(layer.id)"
                class="accent-[#6b9edd]"
              />
              {{ layer.name }}
            </label>
          </li>
        }
      </ul>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerLayersView {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly layers = signal<LayerItem[]>([]);
  private optionalContentConfig: {
    getGroups: () => Map<string, { name: string; visible: boolean }>;
    setVisibility: (id: string, visible: boolean) => void;
  } | null = null;

  constructor() {
    effect(() => {
      const doc = this.pdfViewer.pdfDocument();
      if (doc) {
        this.loadLayers();
      }
    });
  }

  private async loadLayers(): Promise<void> {
    const doc = this.pdfViewer.pdfDocument();
    if (!doc) return;

    try {
      const config = await (
        doc as { getOptionalContentConfig?: () => Promise<unknown> }
      ).getOptionalContentConfig?.();
      if (!config) {
        this.layers.set([]);
        return;
      }

      this.optionalContentConfig = config as typeof this.optionalContentConfig;
      const groups = this.optionalContentConfig!.getGroups();
      const items: LayerItem[] = [];

      groups.forEach((group, id) => {
        items.push({
          id,
          name: group.name || id,
          visible: group.visible !== false,
        });
      });

      this.layers.set(items);
    } catch {
      this.layers.set([]);
    }
  }

  toggleLayer(id: string): void {
    if (!this.optionalContentConfig) return;

    this.layers.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item,
      ),
    );

    const layer = this.layers().find((l) => l.id === id);
    if (layer) {
      this.optionalContentConfig.setVisibility(id, layer.visible);
    }
  }
}
