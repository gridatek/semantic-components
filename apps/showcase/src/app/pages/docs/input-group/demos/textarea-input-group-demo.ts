import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScTextarea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-textarea-input-group-demo',
  imports: [ScInputGroup, ScInputGroupAddon, ScInputGroupText, ScTextarea],
  template: `
    <div sc-input-group>
      <textarea
        sc-textarea
        variant="group"
        placeholder="Type your message..."
      ></textarea>
      <div sc-input-group-addon align="block-end" class="border-t">
        <span sc-input-group-text>0/280</span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputGroupDemo {}
