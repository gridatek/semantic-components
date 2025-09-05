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
  selector: 'sc-command-loading',
  imports: [],
  template: `
    @if (shouldShow()) {
      <ng-content />
    }
  `,
  host: {
    '[class]': 'class()',
    'data-slot': 'command-loading',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandLoading {
  private command = inject(ScCommand, { optional: true });
  protected shouldShow = signal(false);

  readonly loading = input<boolean>(false);
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('block py-6 text-center text-sm text-blue-600', this.classInput()),
  );

  constructor() {
    // Show loading state when explicitly set via input or when parent has loading state
    effect(() => {
      const isLoading =
        this.loading() || (this.command?.loading && this.command.loading() === true);
      this.shouldShow.set(!!isLoading);
    });
  }
}
