import { Dialog } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';

import { ScButton, ScTooltip } from '@semantic-components/ui';
import { SiInfoIcon } from '@semantic-icons/lucide-icons';

import { ScEditorKeyboardShortcutsHelp } from '../toolbar/keyboard-shortcuts-help';

@Component({
  selector: 'sc-editor-help',
  imports: [ScTooltip, SiInfoIcon, ScButton],
  template: `
    <button
      [attr.aria-label]="ariaLabel()"
      [scTooltip]="ariaLabel()"
      (click)="openHelp()"
      sc-button
      variant="ghost"
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
export class ScEditorHelp {
  readonly ariaLabel = input('Show keyboard shortcuts', {
    alias: 'aria-label',
  });

  private readonly dialog = inject(Dialog);

  protected openHelp() {
    this.dialog.open(ScEditorKeyboardShortcutsHelp, {
      width: '600px',
      maxWidth: '90vw',
    });
  }
}
