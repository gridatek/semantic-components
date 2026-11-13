import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlAttachmentDemo } from './rtl-attachment-demo';

@Component({
  selector: 'app-rtl-attachment-demo-container',
  imports: [DemoContainer, RtlAttachmentDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/attachment/rtl-attachment-demo"
      [code]="code"
    >
      <app-rtl-attachment-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAttachmentDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAttachment,
  ScAttachmentAction,
  ScAttachmentActions,
  ScAttachmentContent,
  ScAttachmentDescription,
  ScAttachmentMedia,
  ScAttachmentTitle,
  ScSpinner,
} from '@semantic-components/ui';
import {
  SiFileTextIcon,
  SiLoaderCircleIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Right to left: the media on the right, the actions on the left; file names stay as they are. */
@Component({
  selector: 'app-rtl-attachment-demo',
  imports: [
    Dir,
    ScAttachment,
    ScAttachmentMedia,
    ScAttachmentContent,
    ScAttachmentTitle,
    ScAttachmentDescription,
    ScAttachmentActions,
    ScAttachmentAction,
    ScSpinner,
    SiFileTextIcon,
    SiLoaderCircleIcon,
    SiXIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full max-w-sm flex-col gap-3">
      <div scAttachment class="w-full">
        <div scAttachmentMedia><svg siFileTextIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>report.pdf</div>
          <div scAttachmentDescription>PDF · 2.4 ميغابايت</div>
        </div>
        <div scAttachmentActions>
          <button scAttachmentAction>
            <svg siXIcon></svg>
            <span class="sr-only">إزالة report.pdf</span>
          </button>
        </div>
      </div>
      <div scAttachment state="uploading" class="w-full">
        <div scAttachmentMedia>
          <svg scSpinner siLoaderCircleIcon aria-label="جارٍ الرفع"></svg>
        </div>
        <div scAttachmentContent>
          <div scAttachmentTitle>notes.txt</div>
          <div scAttachmentDescription>جارٍ الرفع · 64٪</div>
        </div>
        <div scAttachmentActions>
          <button scAttachmentAction>
            <svg siXIcon></svg>
            <span class="sr-only">إلغاء الرفع</span>
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAttachmentDemo {}`;
}
