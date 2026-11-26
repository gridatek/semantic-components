import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  input,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { injectDisplayLocale } from '@semantic-components/ui';
import { cn } from 'cn';
import { Toaster } from './layout/toaster';
import { displayLocale } from './shared/format';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toaster],
  template: `
    <router-outlet />
    <app-toaster />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class App {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('block', this.classInput()));

  constructor() {
    // The pages' numbers and dates in the user's numbering system: set before
    // the first render, then as the user changes it (here or in another tab).
    const locale = injectDisplayLocale();
    displayLocale.set(locale());
    effect(() => displayLocale.set(locale()));
  }
}
