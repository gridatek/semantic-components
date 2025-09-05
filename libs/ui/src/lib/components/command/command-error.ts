import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScCommand } from './command';

@Component({
  selector: 'sc-command-error',
  imports: [],
  template: `
    @if (shouldShow()) {
      <ng-content />
    }
  `,
  host: {
    '[class]': 'class()',
    'data-slot': 'command-error',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandError {
  private command = inject(ScCommand, { optional: true });
  protected shouldShow = signal(false);

  readonly error = input<boolean>(false);
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('block py-6 text-center text-sm text-red-600', this.classInput()),
  );

  constructor() {
    // Show error state when explicitly set via input or when parent has error state
    effect(() => {
      const hasError = this.error() || (this.command?.error && this.command.error() === true);
      this.shouldShow.set(!!hasError);
    });
  }
}
