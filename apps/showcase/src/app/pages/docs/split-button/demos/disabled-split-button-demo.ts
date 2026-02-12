import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSplitButton,
  type SplitButtonAction,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-split-button-demo',
  imports: [ScSplitButton],
  template: `
    <sc-split-button
      label="Disabled"
      [actions]="basicActions()"
      [disabled]="true"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSplitButtonDemo {
  readonly basicActions = signal<SplitButtonAction[]>([
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ]);
}
