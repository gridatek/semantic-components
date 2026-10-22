import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicFileUploadNextDemoContainer } from './demos/basic-file-upload-next-demo-container';
import { FormFileUploadNextDemoContainer } from './demos/form-file-upload-next-demo-container';
import { ProgressFileUploadNextDemoContainer } from './demos/progress-file-upload-next-demo-container';
import { RejectionsFileUploadNextDemoContainer } from './demos/rejections-file-upload-next-demo-container';
import { SingleFileUploadNextDemoContainer } from './demos/single-file-upload-next-demo-container';

@Component({
  selector: 'app-file-upload-next-page',
  imports: [
    BasicFileUploadNextDemoContainer,
    SingleFileUploadNextDemoContainer,
    RejectionsFileUploadNextDemoContainer,
    ProgressFileUploadNextDemoContainer,
    FormFileUploadNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>File Upload Next</h1>
        <p class="text-muted-foreground">
          The file upload, rebuilt: files picked or dropped — only chosen, never
          uploaded — as a File[] for Signal Forms; those that break a rule kept
          out, with the reason.
        </p>
        <app-component-badges path="file-upload-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          Files dropped on the zone, or picked — a click on it, or its button by
          keyboard. They are only chosen: the value is a File[], yours to
          upload.
        </p>
        <app-basic-file-upload-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Single image</h2>
        <p class="text-muted-foreground">
          One image, from a button: without multiple, a new one replaces it.
          Images get a thumbnail.
        </p>
        <app-single-file-upload-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Rejections</h2>
        <p class="text-muted-foreground">
          Images only, 1 MB at most, three at most: those that break a rule are
          kept out, and said — in your words — from rejections().
        </p>
        <app-rejections-file-upload-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Upload progress</h2>
        <p class="text-muted-foreground">
          Uploading is yours, and so is its progress — here, kept per File and
          shown with the lib’s progress bar.
        </p>
        <app-progress-file-upload-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Form</h2>
        <p class="text-muted-foreground">
          A [formField]: at least one file, and 5 MB in all, checked by the
          form’s schema; the errors shown once it is touched.
        </p>
        <app-form-file-upload-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class FileUploadNextPage {}
