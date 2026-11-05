import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_MENU_NEXT_GROUP } from './menu-next-context';

/** A group's title; it names the group. */
@Directive({
  selector: '[scMenuNextLabel]',
  host: {
    '[id]': 'id',
    '[attr.data-inset]': 'inset() || null',
    '[class]': 'class()',
  },
})
export class ScMenuNextLabel {
  private readonly styles = injectPreset().menu;
  protected readonly id = inject(_IdGenerator).getId('sc-menu-next-label-');

  readonly classInput = input<string>('', { alias: 'class' });
  readonly inset = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(this.styles.label, this.classInput()),
  );

  constructor() {
    inject(SC_MENU_NEXT_GROUP, { optional: true })?.labelId.set(this.id);
  }
}
