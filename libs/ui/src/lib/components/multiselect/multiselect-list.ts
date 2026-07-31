import { ComboboxWidget } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';

@Component({
  selector: 'div[scMultiselectList]',
  imports: [],
  template: `
    <ng-content />
  `,
  hostDirectives: [
    {
      directive: Listbox,
      inputs: ['value: values', 'multi'],
      outputs: ['valueChange: valuesChange'],
    },
    ComboboxWidget,
  ],
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMultiselectList {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly listbox = inject(Listbox);
  private readonly widget = inject(ComboboxWidget);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly values = computed(() => this.listbox.value());

  setValues(values: unknown[]) {
    this.listbox.value.set(values as never);
  }

  resetScroll(): void {
    this.elementRef.nativeElement.scrollTo(0, 0);
  }

  protected readonly class = computed(() =>
    cn('flex max-h-44 flex-col gap-0.5 overflow-auto', this.classInput()),
  );

  constructor() {
    effect(() =>
      signalSetFn(
        this.widget.activeDescendant[SIGNAL],
        this.listbox.activeDescendant(),
      ),
    );
  }
}
