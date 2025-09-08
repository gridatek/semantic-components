import { CdkStep, CdkStepperModule } from '@angular/cdk/stepper';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'sc-step',
  imports: [CdkStepperModule],
  template: `
    <ng-template>
      <div class="step-content">
        <ng-content />
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkStep, useExisting: ScStep }],
})
export class ScStep extends CdkStep {
  @Input() override label = '';

  @ViewChild(TemplateRef, { static: true }) override content: TemplateRef<any> = null!;
}
