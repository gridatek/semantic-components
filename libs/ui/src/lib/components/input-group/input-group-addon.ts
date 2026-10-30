import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import type { ScInputGroupAddonAlign } from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * Icons, text or buttons beside a group's control, placed by `align`. Write it
 * after the control: Tab reaches the control first; `align` sets where it
 * shows. A click on it (not on its buttons) focuses the control.
 */
@Directive({
  selector: 'div[scInputGroupAddon]',
  host: {
    role: 'group',
    '[attr.data-align]': 'align()',
    '[class]': 'class()',
    '(click)': 'focusControl($event)',
  },
})
export class ScInputGroupAddon {
  private readonly styles = injectPreset().inputGroupAddon;
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly align = input<ScInputGroupAddonAlign>('inline-start');

  protected readonly class = computed(() =>
    cn(this.styles({ align: this.align() }), this.classInput()),
  );

  protected focusControl(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('button, a, [tabindex]')) return;
    this.element.nativeElement.parentElement
      ?.querySelector<HTMLElement>('[data-slot=control]')
      ?.focus();
  }
}
