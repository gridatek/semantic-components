import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cn } from '@semantic-components/ui';
import { CommandSearch } from './components/command-search/command-search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommandSearch],
  template: `
    <router-outlet />
    <app-command-search />
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
