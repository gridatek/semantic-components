import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { ScCommand } from './command';

@Component({
  selector: 'div[scCommandInput]',
  imports: [SiSearchIcon],
  template: `
    <svg
      siSearchIcon
      class="mr-2 size-4 shrink-0 opacity-50"
      aria-hidden="true"
    ></svg>
    <input
      type="text"
      [class]="inputClass()"
      [placeholder]="placeholder()"
      [value]="command.value()"
      (input)="onInput($event)"
    />
  `,
  host: {
    'data-slot': 'command-input',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandInput {
  readonly command = inject(ScCommand);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('Search...');

  protected readonly class = computed(() =>
    cn('flex items-center border-b px-3', this.classInput()),
  );

  protected readonly inputClass = computed(() =>
    cn(
      'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none',
      'placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ),
  );

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.command.value.set(input.value);
  }
}
