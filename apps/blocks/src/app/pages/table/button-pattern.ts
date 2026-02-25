import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: '[appButtonPattern]',
  host: {
    '[attr.role]': "enabled() ? 'button' : null",
    '[attr.tabindex]': 'enabled() ? 0 : null',
    '(keydown.enter)': 'onKeydown($event)',
    '(keydown.space)': 'onKeydown($event)',
  },
})
export class ButtonPattern {
  readonly enabled = input(true, {
    alias: 'appButtonPattern',
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
