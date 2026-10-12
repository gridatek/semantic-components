import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

interface LayerItem {
  id: string;
  name: string;
  visible: boolean;
}

@Component({
  selector: 'sc-pdf-viewer-layers-view',
  imports: [ScCheckbox, ScCheckboxField],
  template: `
    @if (layers().length === 0) {
      <p class="text-muted-foreground p-4 text-center text-sm">
        No layers in this document.
      </p>
    } @else {
      <ul class="grid gap-2 p-3" aria-label="Layers">
        @for (layer of layers(); track layer.id) {
          <li>
            <label scCheckboxField>
              <input
                type="checkbox"
                scCheckbox
                [checked]="layer.visible"
                (checkedChange)="toggleLayer(layer.id)"
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
