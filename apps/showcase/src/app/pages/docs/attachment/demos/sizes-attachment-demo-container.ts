import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesAttachmentDemo } from './sizes-attachment-demo';

@Component({
  selector: 'app-sizes-attachment-demo-container',
  imports: [DemoContainer, SizesAttachmentDemo],
  template: `
    <app-demo-container
      title="Sizes"
      demoUrl="/demos/attachment/sizes-attachment-demo"
      [code]="code"
    >
      <app-sizes-attachment-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesAttachmentDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAttachment,
  ScAttachmentContent,
  ScAttachmentDescription,
  ScAttachmentMedia,
  ScAttachmentTitle,
} from '@semantic-components/ui';
import { SiFileTextIcon } from '@semantic-icons/lucide-icons';

/** size: default, sm, xs. */
@Component({
  selector: 'app-sizes-attachment-demo',
  imports: [
    ScAttachment,
    ScAttachmentMedia,
    ScAttachmentContent,
    ScAttachmentTitle,
    ScAttachmentDescription,
    SiFileTextIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scAttachment size="default" class="w-full">
        <div scAttachmentMedia><svg siFileTextIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>Default attachment</div>
          <div scAttachmentDescription>PDF · 2.4 MB</div>
        </div>
      </div>
      <div scAttachment size="sm" class="w-full">
        <div scAttachmentMedia><svg siFileTextIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>Small attachment</div>
          <div scAttachmentDescription>PDF · 2.4 MB</div>
        </div>
      </div>
      <div scAttachment size="xs" class="w-full">
        <div scAttachmentMedia><svg siFileTextIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>Extra small attachment</div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesAttachmentDemo {}`;
}
