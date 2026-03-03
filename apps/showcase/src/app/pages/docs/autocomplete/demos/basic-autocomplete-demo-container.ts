import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicAutocompleteDemo } from './basic-autocomplete-demo';

@Component({
  selector: 'app-basic-autocomplete-demo-container',
  imports: [DemoContainer, BasicAutocompleteDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-autocomplete-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAutocompleteDemoContainer {
  readonly code = `// Coming soon`;
}
