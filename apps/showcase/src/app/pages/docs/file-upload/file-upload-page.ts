import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicFileUploadDemoContainer } from './demos/basic-file-upload-demo-container';
import { FormFileUploadDemoContainer } from './demos/form-file-upload-demo-container';
import { ProgressFileUploadDemoContainer } from './demos/progress-file-upload-demo-container';
import { RejectionsFileUploadDemoContainer } from './demos/rejections-file-upload-demo-container';
import { SingleFileUploadDemoContainer } from './demos/single-file-upload-demo-container';

@Component({
  selector: 'app-file-upload-page',
  imports: [
    BasicFileUploadDemoContainer,
    SingleFileUploadDemoContainer,
    RejectionsFileUploadDemoContainer,
    ProgressFileUploadDemoContainer,
    FormFileUploadDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>File Upload</h1>
        <p class="text-muted-foreground">
          Files picked or dropped — only chosen, never uploaded — as a File[]
          for Signal Forms; those that break a rule kept out, with the reason.
        </p>
        <app-component-badges path="file-upload" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          Files dropped on the zone, or picked — a click on it, or its button by
          keyboard. They are only chosen: the value is a File[], yours to
          upload.
        </p>
        <app-basic-file-upload-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Single image</h2>
        <p class="text-muted-foreground">
          One image, from a button: without multiple, a new one replaces it.
          Images get a thumbnail.
        </p>
        <app-single-file-upload-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Rejections</h2>
        <p class="text-muted-foreground">
          Images only, 1 MB at most, three at most: those that break a rule are
          kept out, and said — in your words — from rejections().
        </p>
        <app-rejections-file-upload-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Upload progress</h2>
        <p class="text-muted-foreground">
          Uploading is yours, and so is its progress — here, kept per File and
          shown with the lib’s progress bar.
        </p>
        <app-progress-file-upload-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Form</h2>
        <p class="text-muted-foreground">
          A [formField]: at least one file, and 5 MB in all, checked by the
          form’s schema; the errors shown once it is touched.
        </p>
        <app-form-file-upload-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class FileUploadPage {}
