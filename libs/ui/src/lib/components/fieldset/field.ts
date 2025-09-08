import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  inject,
  input,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScCombobox } from '../combobox';
import { ScInput } from '../input';
import { ScLabel } from '../label';

@Component({
  selector: 'sc-field',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScField {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      '*:data-[slot=control]:mt-2 [&>[data-slot=control]+[data-slot=description]]:mt-2',
      this.classInput(),
    ),
  );

  readonly id = signal<string>(inject(_IdGenerator).getId('sc-field-'));

  readonly scLabel = contentChild(ScLabel);

  readonly scInput = contentChild(ScInput);

  readonly scCombobox = contentChild(ScCombobox);

  constructor() {
    afterNextRender(() => {
      this.scLabel()?.for.set(this.id());
      this.scInput()?.id.set(this.id());
      this.scCombobox()?.id.set(this.id());
    });
  }
}
