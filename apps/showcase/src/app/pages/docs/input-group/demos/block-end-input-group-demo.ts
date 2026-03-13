import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScTextarea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-block-end-input-group-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScButton,
    ScInputGroupText,
    ScTextarea,
  ],
  template: `
    <div class="grid w-full max-w-sm gap-6">
      <div scInputGroup class="h-auto">
        <input scInput variant="group" placeholder="Enter amount" />
        <div scInputGroupAddon align="block-end">
          <span scInputGroupText>USD</span>
        </div>
      </div>
      <div scInputGroup>
        <textarea
          scTextarea
          variant="group"
          placeholder="Write a comment..."
        ></textarea>
        <div scInputGroupAddon align="block-end" class="border-t">
          <span scInputGroupText>0/280</span>
          <button scButton variant="default" size="default" class="ml-auto">
            Post
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockEndInputGroupDemo {}
