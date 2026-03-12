import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScTheme } from './theme.service';

@Component({
  selector: 'button[scThemeToggle]',
  exportAs: 'scThemeToggle',
  host: {
    'data-slot': 'theme-toggle',
    type: 'button',
    '[class]': 'classInput()',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-pressed]': 'isDark()',
    '(click)': 'toggle()',
  },
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScThemeToggle {
  private readonly themeService = inject(ScTheme);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly isDark = this.themeService.isDark;

  protected readonly ariaLabel = computed(() =>
    this.isDark() ? 'Switch to light theme' : 'Switch to dark theme',
  );

  protected toggle(): void {
    this.themeService.toggleTheme();
  }
}
