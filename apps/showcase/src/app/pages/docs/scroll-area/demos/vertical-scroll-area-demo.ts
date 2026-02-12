import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScScrollArea, ScScrollBar } from '@semantic-components/ui-lab';

interface Tag {
  id: string;
  name: string;
}

@Component({
  selector: 'app-vertical-scroll-area-demo',
  imports: [ScScrollArea, ScScrollBar],
  template: `
    <div sc-scroll-area class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
        @for (tag of tags; track tag.id) {
          <div class="text-sm">
            {{ tag.name }}
          </div>
          @if (!$last) {
            <div class="my-2 h-px bg-border"></div>
          }
        }
      </div>
      <div sc-scroll-bar orientation="vertical"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalScrollAreaDemo {
  readonly tags: Tag[] = Array.from({ length: 50 }, (_, i) => ({
    id: `tag-${i + 1}`,
    name: `v1.2.0-beta.${i + 1}`,
  }));
}
