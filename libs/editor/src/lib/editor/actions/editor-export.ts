import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiDownloadIcon } from '@semantic-icons/lucide-icons';

import { ExportOptions, ScImportExport } from '../services/import-export.service';

@Component({
  selector: 'sc-editor-export',
  imports: [ScTooltip, SiDownloadIcon, ScButton],
  template: `
    <button
      [attr.aria-label]="ariaLabel()"
      [scTooltip]="ariaLabel()"
      (click)="exportAsMarkdown()"
      sc-button
      variant="ghost"
      type="button"
    >
      <svg si-download-icon></svg>
      <span class="sr-only">{{ ariaLabel() }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorExport {
  readonly ariaLabel = input('Export document', {
    alias: 'aria-label',
  });

  readonly filename = input<string>('document');

  private readonly importExportService = inject(ScImportExport);

  protected exportAsMarkdown() {
    this.importExportService.export({
      format: 'markdown',
      filename: this.filename(),
    });
  }
}
