import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalScrollAreaDemo } from './vertical-scroll-area-demo';

@Component({
  selector: 'app-vertical-scroll-area-demo-container',
  imports: [DemoContainer, VerticalScrollAreaDemo],
  template: `
    <app-demo-container title="Vertical Scroll" [code]="code">
      <app-vertical-scroll-area-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalScrollAreaDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScScrollArea } from '@semantic-components/ui';

interface Tag {
  id: string;
  name: string;
}

@Component({
  selector: 'app-vertical-scroll-area-demo',
  imports: [ScScrollArea],
  template: \`
    <div scScrollArea class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
        @for (tag of tags; track tag.id) {
          <div class="text-sm">
            {{ tag.name }}
          </div>
          @if (!$last) {
            <div class="bg-border my-2 h-px"></div>
          }
        }
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalScrollAreaDemo {
  readonly tags: Tag[] = Array.from({ length: 50 }, (_, i) => ({
    id: \`tag-\${i + 1}\`,
    name: \`v1.2.0-beta.\${i + 1}\`,
  }));
}`;
}
