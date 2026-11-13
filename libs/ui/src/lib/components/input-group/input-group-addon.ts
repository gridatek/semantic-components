import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import type { ScInputGroupAddonSide } from '@semantic-components/presets';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/**
 * Icons, text or buttons beside a group's control, on its `side`: before or
 * after it (`inline-start`, `inline-end`: logical), above or below it
 * (`top`, `bottom`). Write it after the control: Tab reaches the control
 * first; `side` sets where it shows. A click on it (not on its buttons)
 * focuses the control.
 */
@Directive({
  selector: 'div[scInputGroupAddon]',
  host: {
    role: 'group',
    '[attr.data-side]': 'side()',
    '[class]': 'class()',
    '(click)': 'focusControl($event)',
  },
})
export class ScInputGroupAddon {
  private readonly styles = injectPreset().inputGroupAddon;
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its side of the control: `inline-start` (default), `inline-end`, `top`, `bottom`. */
  readonly side = input<ScInputGroupAddonSide>('inline-start');

  protected readonly class = computed(() =>
    cn(this.styles({ side: this.side() }), this.classInput()),
  );

  protected focusControl(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('button, a, [tabindex]')) return;
    this.element.nativeElement.parentElement
      ?.querySelector<HTMLElement>('[data-slot=control]')
      ?.focus();
  }
}
