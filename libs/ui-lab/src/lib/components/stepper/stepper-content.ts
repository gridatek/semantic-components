import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
} from '@angular/core';
import { SC_STEPPER_PANEL } from './stepper-types';

@Directive({
  selector: 'ng-template[scStepperContent]',
})
export class ScStepperContent {
  private readonly panel = inject(SC_STEPPER_PANEL);
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.panel.isActive() && this.viewContainerRef.length === 0) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
