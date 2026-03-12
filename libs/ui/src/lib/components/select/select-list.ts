import { Listbox } from '@angular/aria/listbox';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScSelectItem } from './select-item';

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
  private readonly items = contentChildren(ScSelectItem, { descendants: true });
  readonly values = computed(() => this.listbox.values());
  readonly classInput = input<string>('', { alias: 'class' });

  setValues(values: unknown[]) {
    this.listbox.values.set(values as never);
  }

  scrollToSelected() {
    const value = this.listbox.values()?.[0];
    if (value == null) return;
    const item = this.items().find((i) => i.itemValue() === value);
    item?.scrollIntoView();
  }

  labelForValue(value: unknown): string {
    const item = this.items().find((i) => i.itemValue() === value);
    return item?.itemLabel() ?? '';
  }

  protected readonly class = computed(() =>
    cn(
      'flex h-full flex-col overflow-x-hidden overflow-y-auto',
      this.classInput(),
    ),
  );
}
