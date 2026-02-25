import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: '[scButtonPattern]',
  host: {
    '[attr.role]': "enabled() ? 'button' : null",
    '[attr.tabindex]': 'enabled() ? 0 : null',
    '(keydown.enter)': 'onKeydown($event)',
    '(keydown.space)': 'onKeydown($event)',
  },
})
export class ScButtonPattern {
  readonly enabled = input(true, {
    alias: 'scButtonPattern',
    transform: booleanAttribute,
  });

  onKeydown(event: Event): void {
    if (!this.enabled()) {
      return;
    }
    event.preventDefault();
    (event.target as HTMLElement).click();
  }
}
