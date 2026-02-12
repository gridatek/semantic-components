import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonFileUploadDemoContainer } from './demos/button-file-upload-demo-container';
import { DropzoneFileUploadDemoContainer } from './demos/dropzone-file-upload-demo-container';
import { ImageFileUploadDemoContainer } from './demos/image-file-upload-demo-container';
import { ProgressFileUploadDemoContainer } from './demos/progress-file-upload-demo-container';
import { SingleFileUploadDemoContainer } from './demos/single-file-upload-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-file-upload-page',
  imports: [
    DropzoneFileUploadDemoContainer,
    ImageFileUploadDemoContainer,
    ButtonFileUploadDemoContainer,
    SingleFileUploadDemoContainer,
    ProgressFileUploadDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">FileUpload</h1>
        <p class="text-muted-foreground">
          A drag and drop file upload zone with preview and progress support.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-dropzone-file-upload-demo-container />
        <app-image-file-upload-demo-container />
        <app-button-file-upload-demo-container />
        <app-single-file-upload-demo-container />
        <app-progress-file-upload-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FileUploadPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'file-upload')!
    .status;
}
