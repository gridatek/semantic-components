import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Marks the template holding the list inside `scCommand`. The command renders
 * it after its other content, connected to `scCommandInput` so arrow keys
 * typed there drive the list.
 */
@Directive({
  selector: 'ng-template[scCommandListContainer]',
})
export class ScCommandListContainer {
  readonly templateRef = inject(TemplateRef);
}
