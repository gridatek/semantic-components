import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OutlineEmptyDemo } from './outline-empty-demo';

@Component({
  selector: 'app-outline-empty-demo-container',
  imports: [DemoContainer, OutlineEmptyDemo],
  template: `
    <app-demo-container
      title="Outline"
      demoUrl="/demos/empty/outline-empty-demo"
      [code]="code"
    >
      <app-outline-empty-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OutlineEmptyDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
} from '@semantic-components/ui';
import { SiCloudIcon } from '@semantic-icons/lucide-icons';

/** A dashed border round it: border on the empty state (its style is dashed). */
@Component({
  selector: 'app-outline-empty-demo',
  imports: [
    ScButton,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    SiCloudIcon,
  ],
  template: \`
    <div scEmpty class="border">
      <div scEmptyHeader>
        <div scEmptyMedia variant="icon"><svg siCloudIcon></svg></div>
        <h2 scEmptyTitle>Cloud Storage Empty</h2>
        <div scEmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </div>
      </div>
      <div scEmptyBody>
        <button scButton variant="outline" size="sm">Upload Files</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OutlineEmptyDemo {}`;
}
