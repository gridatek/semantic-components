import { Listbox } from '@angular/aria/listbox';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
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
      inputs: ['values', 'multi'],
      outputs: ['valuesChange'],
    },
  ],
  host: {
    'data-slot': 'multiselect-list',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiselectList {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly listbox = inject(Listbox);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly values = computed(() => this.listbox.values());

  setValues(values: unknown[]) {
    this.listbox.values.set(values as never);
  }

  resetScroll(): void {
    this.elementRef.nativeElement.scrollTo(0, 0);
  }

  protected readonly class = computed(() =>
    cn('flex max-h-44 flex-col gap-0.5 overflow-auto', this.classInput()),
  );
}
