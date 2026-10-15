import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cn } from '@semantic-components/ui';
import { CommandPalette } from './components/command-palette/command-palette';
import { Toaster } from './components/toaster/toaster';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommandPalette, Toaster],
  template: `
    <router-outlet />
    <app-command-palette />
    <app-toaster />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class App {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('block', this.classInput()));
}
