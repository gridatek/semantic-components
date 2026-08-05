import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicMarkerDemo } from './basic-marker-demo';

@Component({
  selector: 'app-basic-marker-demo-container',
  imports: [DemoContainer, BasicMarkerDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/marker/basic-marker-demo"
      [code]="code"
    >
      <app-basic-marker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicMarkerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMarker,
  ScMarkerContent,
  ScMarkerIcon,
} from '@semantic-components/ui-lab';
import { SiInfoIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-marker-demo',
  imports: [ScMarker, ScMarkerIcon, ScMarkerContent, SiInfoIcon],
  template: \`
    <div class="w-full max-w-md space-y-4">
      <div scMarker>
        <span scMarkerIcon><svg siInfoIcon></svg></span>
        <span scMarkerContent>Draft saved a moment ago</span>
      </div>

      <div scMarker variant="separator">
        <span scMarkerContent>Today</span>
      </div>

      <div scMarker variant="border">
        <span scMarkerContent>Unread messages</span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicMarkerDemo {}`;
}
