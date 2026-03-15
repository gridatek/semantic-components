import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cn } from '@semantic-components/ui';
import { CommandPalette } from './components/command-palette/command-palette';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommandPalette],
  template: `
    <router-outlet />
    <app-command-palette />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('block', this.classInput()));
}
