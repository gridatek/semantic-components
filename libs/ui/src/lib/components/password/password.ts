import { Directive, InjectionToken, model } from '@angular/core';

export const SC_PASSWORD = new InjectionToken<ScPassword>('SC_PASSWORD');

@Directive({
  selector: 'div[scPassword]',
  exportAs: 'scPassword',
  providers: [{ provide: SC_PASSWORD, useExisting: ScPassword }],
  host: {
    'data-slot': 'password',
  },
})
export class ScPassword {
  readonly visible = model(false);

  toggle(): void {
    this.visible.update((v) => !v);
  }
}
