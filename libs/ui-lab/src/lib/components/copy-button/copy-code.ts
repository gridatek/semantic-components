import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScCopyButton } from './copy-button';

@Component({
  selector: '[sc-copy-code]',
  template: `
    <div class="relative">
      <pre [class]="preClass()"><code><ng-content /></code></pre>
      <button
        sc-copy-button
        [value]="value()"
        class="absolute right-2 top-2"
        [variant]="'ghost'"
        [size]="'icon'"
      ></button>
    </div>
  `,
  host: {
    'data-slot': 'copy-code',
    '[class]': 'class()',
  },
  imports: [ScCopyButton],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCopyCode {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input.required<string>();

  protected readonly class = computed(() => cn('block', this.classInput()));

  protected readonly preClass = computed(() =>
    cn('rounded-lg bg-muted p-4 pr-12 overflow-x-auto text-sm', 'font-mono'),
  );
}
