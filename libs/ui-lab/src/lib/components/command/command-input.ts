import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScCommand } from './command';

@Component({
  selector: 'div[sc-command-input]',
  template: `
    <svg
      class="mr-2 size-4 shrink-0 opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
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
