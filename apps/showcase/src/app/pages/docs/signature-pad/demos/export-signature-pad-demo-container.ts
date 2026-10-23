import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ExportSignaturePadDemo } from './export-signature-pad-demo';

@Component({
  selector: 'app-export-signature-pad-demo-container',
  imports: [DemoContainer, ExportSignaturePadDemo],
  template: `
    <app-demo-container
      title="Export"
      [code]="code"
      demoUrl="/demos/signature-pad/export-signature-pad-demo"
    >
      <app-export-signature-pad-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ExportSignaturePadDemoContainer {
  readonly code = `import { DOCUMENT } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  ScButton,
  type ScSignature,
  ScSignaturePad,
  ScSignaturePadClear,
  ScSignaturePadLine,
  ScSignaturePadSurface,
} from '@semantic-components/ui';
import { SiDownloadIcon } from '@semantic-icons/lucide-icons';

/** The value is data — drawn again here, read-only and smaller. Exported, the image is trimmed to the ink: PNG or SVG. */
@Component({
  selector: 'app-export-signature-pad-demo',
  imports: [
    ScSignaturePad,
    ScSignaturePadSurface,
    ScSignaturePadLine,
    ScSignaturePadClear,
    ScButton,
    SiDownloadIcon,
  ],
  template: \`
    <div class="w-full max-w-md space-y-4">
      <div
        scSignaturePad
        #pad="scSignaturePad"
        [(value)]="signature"
        class="space-y-2"
      >
        <div scSignaturePadSurface aria-label="Signature">
          <div scSignaturePadLine>× Sign here</div>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            scButton
            variant="outline"
            size="sm"
            [disabled]="pad.empty()"
            (click)="download(pad.toBlob(), 'signature.png')"
          >
            <svg siDownloadIcon></svg>
            PNG
          </button>
          <button
            scButton
            variant="outline"
            size="sm"
            [disabled]="pad.empty()"
            (click)="downloadSvg(pad.toSvg())"
          >
            <svg siDownloadIcon></svg>
            SVG
          </button>
          <button scSignaturePadClear size="sm" class="ms-auto">Clear</button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="space-y-1">
          <p class="text-muted-foreground">Read-only, drawn again</p>
          <div scSignaturePad readonly [value]="signature()">
            <div
              scSignaturePadSurface
              aria-label="Signature, read-only"
              class="h-20"
            ></div>
          </div>
        </div>
        <div class="space-y-1">
          <p class="text-muted-foreground">Trimmed PNG</p>
          <div
            class="flex h-20 items-center justify-center rounded-md border bg-white p-1"
          >
            @if (preview(); as preview) {
              <img
                [src]="preview"
                alt="The signature, as exported"
                class="max-h-full"
              />
            }
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ExportSignaturePadDemo {
  private readonly document = inject(DOCUMENT);
  private readonly pad = viewChild.required<ScSignaturePad>('pad');
  readonly signature = signal<ScSignature | null>(null);
  readonly preview = signal<string | null>(null);

  constructor() {
    // The trimmed PNG, again for each change.
    effect((onCleanup) => {
      const signature = this.signature();
      this.preview.set(null);
      if (!signature) return;
      let url: string | null = null;
      let stale = false;
      void untracked(() => this.pad().toBlob()).then((blob) => {
        if (stale || !blob) return;
        url = URL.createObjectURL(blob);
        this.preview.set(url);
      });
      onCleanup(() => {
        stale = true;
        if (url) URL.revokeObjectURL(url);
      });
    });
  }

  async download(blob: Promise<Blob | null>, name: string): Promise<void> {
    const file = await blob;
    if (file) this.save(file, name);
  }

  downloadSvg(svg: string): void {
    this.save(new Blob([svg], { type: 'image/svg+xml' }), 'signature.svg');
  }

  private save(file: Blob, name: string): void {
    const url = URL.createObjectURL(file);
    const link = this.document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
  }
}`;
}
