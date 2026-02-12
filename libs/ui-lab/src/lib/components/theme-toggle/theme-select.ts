import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { ScTheme, Theme } from './theme.service';

@Component({
  selector: 'select[sc-theme-select]',
  host: {
    'data-slot': 'theme-select',
    '[id]': 'id()',
    '[class]': 'class()',
    '[value]': 'theme()',
    '(change)': 'onThemeChange($event)',
  },
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScThemeSelect {
  private readonly themeService = inject(ScTheme);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-theme-select-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });

  // Priority: explicit id > field's id > own fallback id
  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  protected readonly theme = this.themeService.theme;

  protected readonly class = computed(() =>
    cn(
      'h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.classInput(),
    ),
  );

  protected onThemeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.themeService.setTheme(target.value as Theme);
  }
}
