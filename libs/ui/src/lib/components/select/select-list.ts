import { ComboboxWidget } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import { bindInput, cn } from '../../utils';
import { ScSelectItem } from './select-item';

@Component({
  selector: 'div[scSelectList]',
  imports: [],
  template: `
    <ng-content />
  `,
  hostDirectives: [Listbox, ComboboxWidget],
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSelectList {
  private readonly listbox = inject(Listbox);
  private readonly widget = inject(ComboboxWidget);
  private readonly items = contentChildren(ScSelectItem, { descendants: true });
  readonly values = computed(() => this.listbox.value());
  readonly classInput = input<string>('', { alias: 'class' });

  setValues(values: unknown[]) {
    this.listbox.value.set(values as never);
  }

  scrollToSelected() {
    const value = this.listbox.value()?.[0];
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

  constructor() {
    bindInput(this.widget.activeDescendant, this.listbox.activeDescendant);
  }
}
