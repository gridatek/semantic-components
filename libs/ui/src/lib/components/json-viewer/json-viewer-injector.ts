import { Directive, Injector, inject } from '@angular/core';

/**
 * Hands the viewer's recursive template the injector of a group, so the rows
 * drawn in it find their parent there (as rows written in markup would).
 * Internal to the JSON viewer.
 */
@Directive({
  selector: '[scJsonViewerInjector]',
  exportAs: 'scJsonViewerInjector',
})
export class ScJsonViewerInjector {
  readonly injector = inject(Injector);
}
