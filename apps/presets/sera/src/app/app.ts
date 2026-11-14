import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cn } from 'cn';
import { Toaster } from './layouts/toaster';

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

  protected readonly class = computed(() => cn('block', this.classInput()));
}
