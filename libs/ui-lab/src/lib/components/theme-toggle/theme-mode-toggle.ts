import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { ScThemeManager } from './theme-manager';

@Component({
  selector: 'button[scThemeModeToggle]',
  exportAs: 'scThemeModeToggle',
  host: {
    'data-slot': 'theme-mode-toggle',
    type: 'button',
    '[class]': 'classInput()',
    '(click)': 'toggle()',
  },
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScThemeModeToggle {
  private readonly themeManager = inject(ScThemeManager);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly isDark = this.themeManager.isDark;

  protected toggle(): void {
    this.themeManager.toggleMode();
  }
}
