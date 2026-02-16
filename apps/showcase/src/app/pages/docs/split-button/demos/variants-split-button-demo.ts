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
  selector: 'app-variants-split-button-demo',
  imports: [ScSplitButton],
  template: `
    <div class="flex flex-wrap gap-4">
      <sc-split-button
        label="Default"
        variant="default"
        [actions]="basicActions()"
      />
      <sc-split-button
        label="Secondary"
        variant="secondary"
        [actions]="basicActions()"
      />
      <sc-split-button
        label="Outline"
        variant="outline"
        [actions]="basicActions()"
      />
      <sc-split-button
        label="Destructive"
        variant="destructive"
        [actions]="basicActions()"
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsSplitButtonDemo {
  readonly basicActions = signal<SplitButtonAction[]>([
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ]);
}
