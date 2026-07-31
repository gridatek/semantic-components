import { Component, ViewEncapsulation, inject, input } from '@angular/core';
import { ScThemeManager } from './theme-manager';

@Component({
  selector: 'button[scThemeModeToggle]',
  exportAs: 'scThemeModeToggle',
  host: {
    type: 'button',
    '[class]': 'classInput()',
    '(click)': 'toggle()',
  },
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ScThemeModeToggle {
  private readonly themeManager = inject(ScThemeManager);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly isDark = this.themeManager.isDark;
  readonly isLight = this.themeManager.isLight;

  protected toggle(): void {
    this.themeManager.toggleMode();
  }
}
