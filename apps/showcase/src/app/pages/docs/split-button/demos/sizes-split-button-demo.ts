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
  selector: 'app-sizes-split-button-demo',
  imports: [ScSplitButton],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <sc-split-button label="Small" size="sm" [actions]="basicActions()" />
      <sc-split-button label="Medium" size="md" [actions]="basicActions()" />
      <sc-split-button label="Large" size="lg" [actions]="basicActions()" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesSplitButtonDemo {
  readonly basicActions = signal<SplitButtonAction[]>([
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ]);
}
