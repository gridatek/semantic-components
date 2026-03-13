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
    <div scInputGroup class="w-full max-w-sm">
      <textarea scTextarea placeholder="Type your message..."></textarea>
      <div scInputGroupAddon align="block-end" class="border-t">
        <span scInputGroupText>0/280</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputGroupDemo {}
