import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScMenu, ScMenuItem, ScMenuTriggerFor, ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiTypeIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';
import { ScExtensions } from '../../extensions/extensions';

@Component({
  selector: 'sc-editor-font-size',
  imports: [ScMenuTriggerFor, ScMenu, ScMenuItem, ScToggle, ScTooltip, SiTypeIcon],
  template: `
    <button
      [scMenuTriggerFor]="fontSizeMenu"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Font size"
      type="button"
    >
      <svg class="w-4 h-4" si-type-icon></svg>
    </button>

    <ng-template #fontSizeMenu>
      <div class="min-w-48" sc-menu>
        <button class="text-base" (click)="setTextSize('16px')" sc-menu-item>16px (Default)</button>
        <button class="text-xs" (click)="setTextSize('12px')" sc-menu-item>12px (Tiny)</button>
        <button class="text-sm" (click)="setTextSize('14px')" sc-menu-item>14px (Small)</button>
        <button class="text-lg" (click)="setTextSize('18px')" sc-menu-item>18px (Lead)</button>
        <button class="text-2xl" (click)="setTextSize('24px')" sc-menu-item>24px (Large)</button>
        <button class="text-4xl" (click)="setTextSize('36px')" sc-menu-item>36px (Huge)</button>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorFontSize {
  private readonly parent = inject(ScEditor);
  private readonly extensions = inject(ScExtensions);

  constructor() {
    this.extensions.textStyle.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  setTextSize(fontSize: string) {
    this.editor.chain().focus().setMark('textStyle', { fontSize }).run();
  }
}
