import { Dialog } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';

import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiInfoIcon } from '@semantic-icons/lucide-icons';

import { ScEditorKeyboardShortcutsHelpDialog } from './editor-keyboard-shortcuts-help-dialog';

@Component({
  selector: 'sc-editor-keyboard-shortcuts-help',
  imports: [ScTooltip, SiInfoIcon, ScToggle],
  template: `
    <button
      [attr.aria-label]="ariaLabel()"
      [scTooltip]="ariaLabel()"
      (click)="openHelp()"
      sc-toggle
      variant="outline"
      type="button"
    >
      <svg si-info-icon></svg>
      <span class="sr-only">{{ ariaLabel() }}</span>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorKeyboardShortcutsHelp {
  readonly ariaLabel = input('Show keyboard shortcuts', {
    alias: 'aria-label',
  });

  private readonly dialog = inject(Dialog);

  protected openHelp() {
    this.dialog.open(ScEditorKeyboardShortcutsHelpDialog, {
      width: '600px',
      maxWidth: '90vw',
    });
  }
}
