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
  selector: '[sc-copy-input]',
  template: `
    <div class="flex">
      <input
        type="text"
        [value]="value()"
        [readonly]="readonly()"
        [class]="inputClass()"
      />
      <button
        sc-copy-button
        [value]="value()"
        [variant]="'outline'"
        [size]="'icon'"
        class="rounded-l-none border-l-0"
      ></button>
    </div>
  `,
  host: {
    'data-slot': 'copy-input',
    '[class]': 'class()',
  },
  imports: [ScCopyButton],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCopyInput {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input.required<string>();
  readonly readonly = input<boolean>(true);

  protected readonly class = computed(() =>
    cn('inline-block', this.classInput()),
  );

  protected readonly inputClass = computed(() =>
    cn(
      'flex h-9 w-full rounded-md rounded-r-none border border-input bg-transparent px-3 py-1 text-sm shadow-sm',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      this.readonly() && 'bg-muted text-muted-foreground',
    ),
  );
}
