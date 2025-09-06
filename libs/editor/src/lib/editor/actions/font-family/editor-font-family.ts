import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScMenu, ScMenuItem, ScMenuTriggerFor, ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiTypeIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';
import { ScExtensions } from '../../extensions/extensions';

@Component({
  selector: 'sc-editor-font-family',
  imports: [ScMenuTriggerFor, ScMenu, ScMenuItem, ScToggle, ScTooltip, SiTypeIcon],
  template: `
    <button
      [scMenuTriggerFor]="fontFamilyMenu"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Font family"
      type="button"
    >
      <svg class="w-4 h-4" si-type-icon></svg>
    </button>

    <ng-template #fontFamilyMenu>
      <div class="min-w-[12rem]" sc-menu>
        <button class="font-sans" (click)="setFontFamily('Poppins, ui-sans-serif')" sc-menu-item>
          Default (Poppins)
        </button>
        <button
          (click)="setFontFamily('Arial, sans-serif')"
          sc-menu-item
          style="font-family: Arial, sans-serif;"
        >
          Arial
        </button>
        <button
          (click)="setFontFamily('&quot;Courier New&quot;, monospace')"
          sc-menu-item
          style="font-family: 'Courier New', monospace;"
        >
          Courier New
        </button>
        <button
          (click)="setFontFamily('Georgia, serif')"
          sc-menu-item
          style="font-family: Georgia, serif;"
        >
          Georgia
        </button>
        <button
          (click)="setFontFamily('&quot;Lucida Sans Unicode&quot;, sans-serif')"
          sc-menu-item
          style="font-family: 'Lucida Sans Unicode', sans-serif;"
        >
          Lucida Sans Unicode
        </button>
        <button
          (click)="setFontFamily('Tahoma, sans-serif')"
          sc-menu-item
          style="font-family: Tahoma, sans-serif;"
        >
          Tahoma
        </button>
        <button
          (click)="setFontFamily('&quot;Times New Roman&quot;, serif')"
          sc-menu-item
          style="font-family: 'Times New Roman', serif;"
        >
          Times New Roman
        </button>
        <button
          (click)="setFontFamily('&quot;Trebuchet MS&quot;, sans-serif')"
          sc-menu-item
          style="font-family: 'Trebuchet MS', sans-serif;"
        >
          Trebuchet MS
        </button>
        <button
          (click)="setFontFamily('Verdana, sans-serif')"
          sc-menu-item
          style="font-family: Verdana, sans-serif;"
        >
          Verdana
        </button>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorFontFamily {
  private readonly parent = inject(ScEditor);
  private readonly extensions = inject(ScExtensions);

  constructor() {
    this.extensions.fontFamily.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  setFontFamily(fontFamily: string) {
    this.editor.chain().focus().setFontFamily(fontFamily).run();
  }
}
