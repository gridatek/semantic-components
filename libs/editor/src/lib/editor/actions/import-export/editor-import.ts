import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiUploadIcon } from '@semantic-icons/lucide-icons';

import { ScImportExport } from './import-export.service';

@Component({
  selector: 'sc-editor-import',
  imports: [ScTooltip, SiUploadIcon, ScToggle],
  template: `
    <input
      class="hidden"
      #fileInput
      (change)="onFileSelected($event)"
      type="file"
      accept=".md,.markdown,.html,.htm,.txt,.json"
    />

    <button
      [attr.aria-label]="ariaLabel()"
      [scTooltip]="ariaLabel()"
      (click)="fileInput.click()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-upload-icon></svg>
      <span class="sr-only">{{ ariaLabel() }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorImport {
  readonly ariaLabel = input('Import document', {
    alias: 'aria-label',
  });

  private readonly importExportService = inject(ScImportExport);

  protected async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      try {
        await this.importExportService.importFromFile(file);
      } catch (error) {
        console.error('Import failed:', error);
        // You could emit an event or show a toast notification here
        alert('Failed to import file: ' + (error as Error).message);
      }

      // Clear the input so the same file can be selected again
      input.value = '';
    }
  }
}
