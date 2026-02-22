import { Listbox } from '@angular/aria/listbox';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scSelectList]',
  imports: [],
  template: `
    <ng-content />
  `,
  hostDirectives: [Listbox],
  host: {
    'data-slot': 'select-list',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectList {
  private readonly listbox = inject(Listbox);
  readonly values = computed(() => this.listbox.values());
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex h-full flex-col overflow-x-hidden overflow-y-auto',
      this.classInput(),
    ),
  );
}
