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
import { SC_MENU_GROUP } from './menu-context';

/** A group's title; it names the group. */
@Directive({
  selector: '[scMenuLabel]',
  host: {
    '[id]': 'id',
    '[attr.data-inset]': 'inset() || null',
    '[class]': 'class()',
  },
})
export class ScMenuLabel {
  private readonly styles = injectPreset().menu;
  protected readonly id = inject(_IdGenerator).getId('sc-menu-label-');

  readonly classInput = input<string>('', { alias: 'class' });
  readonly inset = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(this.styles.label, this.classInput()),
  );

  constructor() {
    inject(SC_MENU_GROUP, { optional: true })?.labelId.set(this.id);
  }
}
