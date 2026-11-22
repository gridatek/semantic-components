import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScKbd,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTypeset,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AcceptedTypesFileInputDemoContainer } from './demos/accepted-types-file-input-demo-container';
import { AttachmentsFileInputDemoContainer } from './demos/attachments-file-input-demo-container';
import { CameraFileInputDemoContainer } from './demos/camera-file-input-demo-container';
import { FileInputUsageDemoContainer } from './demos/file-input-usage-demo-container';
import { FoldersFileInputDemoContainer } from './demos/folders-file-input-demo-container';
import { FormFileInputDemoContainer } from './demos/form-file-input-demo-container';
import { LimitsFileInputDemoContainer } from './demos/limits-file-input-demo-container';
import { OneFileFileInputDemoContainer } from './demos/one-file-file-input-demo-container';
import { PageDropFileInputDemoContainer } from './demos/page-drop-file-input-demo-container';
import { PreviewsFileInputDemoContainer } from './demos/previews-file-input-demo-container';
import { RtlFileInputDemoContainer } from './demos/rtl-file-input-demo-container';
import { UploadButtonFileInputDemoContainer } from './demos/upload-button-file-input-demo-container';
import { UploadingFileInputDemoContainer } from './demos/uploading-file-input-demo-container';
import { ValidationFileInputDemoContainer } from './demos/validation-file-input-demo-container';

@Component({
  selector: 'app-file-input-page',
  imports: [
    ScKbd,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    FileInputUsageDemoContainer,
    UploadButtonFileInputDemoContainer,
    AcceptedTypesFileInputDemoContainer,
    LimitsFileInputDemoContainer,
    OneFileFileInputDemoContainer,
    ValidationFileInputDemoContainer,
    PreviewsFileInputDemoContainer,
    UploadingFileInputDemoContainer,
    AttachmentsFileInputDemoContainer,
    PageDropFileInputDemoContainer,
    FoldersFileInputDemoContainer,
    CameraFileInputDemoContainer,
    FormFileInputDemoContainer,
    RtlFileInputDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>File Input</h1>
        <p class="text-muted-foreground">
          Files picked, dropped or pasted — chosen, never uploaded — as a File[]
          for Signal Forms; those that break a rule kept out, with every reason.
        </p>
        <app-component-badges path="file-input" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-file-input-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The root writes the native picker itself (hidden); the trigger opens
          it, the dropzone takes drops and pastes, the list shows the files.
          Each part is optional but the root — a trigger alone is an upload
          button.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Rules</h2>
        <p>
          With <code scTypeset>multiple</code>, files are added to those there;
          without it, a new one replaces it. <code scTypeset>accept</code> (MIME
          types, wildcards, extensions), <code scTypeset>minSize</code>,
          <code scTypeset>maxSize</code>, <code scTypeset>maxFiles</code> (in
          all) and your <code scTypeset>validate</code> keep files out:
          <code scTypeset>rejections()</code> lists them with every reason —
          <code scTypeset>file-type</code>,
          <code scTypeset>file-too-large</code>,
          <code scTypeset>file-too-small</code>,
          <code scTypeset>too-many-files</code>, or yours — until the next pick,
          drop or paste. Uploading is yours. In a form, an empty list is not
          <em>empty</em> to Signal Forms&apos;
          <code scTypeset>required()</code>: use
          <code scTypeset>minLength(path, 1)</code>.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="File Input keys"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Key</th>
                <th scTableHeaderCell>Does</th>
              </tr>
            </thead>
            <tbody scTableBody>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Enter</kbd> / <kbd scKbd>Space</kbd>
                </td>
                <td scTableCell>On the trigger: opens the picker</td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Tab</kbd></td>
                <td scTableCell>
                  Into the list: one stop, the last file focused
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>↑</kbd> <kbd scKbd>↓</kbd> / <kbd scKbd>Home</kbd>
                  <kbd scKbd>End</kbd>
                </td>
                <td scTableCell>Between the files</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Delete</kbd> / <kbd scKbd>Backspace</kbd>
                </td>
                <td scTableCell>
                  Removes the file focused; focus on to the next (the trigger
                  after the last)
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Ctrl + V</kbd></td>
                <td scTableCell>
                  In the dropzone (or your paste target): pasted files are
                  added; text is left alone
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The trigger is the way in, by pointer and keyboard; the dropzone is
            not a control. In a field, the label opens the picker, and names the
            trigger with its own text.
          </li>
          <li>
            The native picker is hidden from the Tab order and from screen
            readers.
          </li>
          <li>
            Name the list, and each remove button after its file; the remove
            buttons stay out of the Tab order (Delete does it).
          </li>
          <li>
            <code scTypeset>scFileInputStatus</code> is a polite live region:
            write in it, from <code scTypeset>lastChange()</code>, what was
            added, removed or kept out.
          </li>
          <li>Thumbnails are decorative: the name is beside them.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-upload-button-file-input-demo-container />
        <app-accepted-types-file-input-demo-container />
        <app-limits-file-input-demo-container />
        <app-one-file-file-input-demo-container />
        <app-validation-file-input-demo-container />
        <app-previews-file-input-demo-container />
        <app-uploading-file-input-demo-container />
        <app-attachments-file-input-demo-container />
        <app-page-drop-file-input-demo-container />
        <app-folders-file-input-demo-container />
        <app-camera-file-input-demo-container />
        <app-form-file-input-demo-container />
        <app-rtl-file-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own (cn:
          a later class wins). The look is the style&apos;s (<code scTypeset
            >fileInput</code
          >: from its Empty and its Item); the trigger and the remove buttons
          are the style&apos;s buttons (<code scTypeset>variant</code>,
          <code scTypeset>size</code>).
        </p>
        <app-parts-table label="File Input parts" [parts]="parts" />
        <app-api-table label="ScFileInput inputs" [inputs]="inputs" />
        <app-api-table
          label="ScFileInputDropzone inputs"
          [inputs]="dropzoneInputs"
        />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class FileInputPage {
  private readonly anatomy = {
    imports:
      "import { ScFileInput, ScFileInputDropzone, ScFileInputItem, ScFileInputItemPreview, ScFileInputItemRemove, ScFileInputItemSize, ScFileInputList, ScFileInputStatus, ScFileInputTrigger } from '@semantic-components/ui';",
    markup: [
      '<div scFileInput #files="scFileInput" multiple [formField]="form.files">',
      '  <div scFileInputDropzone>',
      '    <button scFileInputTrigger>Browse files</button>',
      '  </div>',
      '  <ul scFileInputList aria-label="Chosen files">',
      '    @for (file of files.value(); track file) {',
      '      <li scFileInputItem [file]="file">',
      '        <span scFileInputItemPreview><svg siFileIcon></svg></span>',
      '        {{ file.name }}',
      '        <span scFileInputItemSize></span>',
      '        <button scFileInputItemRemove>…</button>',
      '      </li>',
      '    }',
      '  </ul>',
      '  <div scFileInputStatus>…</div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScFileInput',
      selector: 'div[scFileInput]',
      description:
        'The root: the value, the rules, the native picker (hidden). exportAs scFileInput: open(), add(), remove(), clear(), focus(), rejections(), lastChange().',
    },
    {
      name: 'ScFileInputTrigger',
      selector: 'button[scFileInputTrigger]',
      description:
        "Opens the picker. In a field, the first takes the field's id: the label opens it.",
    },
    {
      name: 'ScFileInputDropzone',
      selector: '[scFileInputDropzone]',
      description:
        'Takes drops (here, or the whole page) and pastes. data-dragging, data-drag-accept, data-drag-reject.',
    },
    {
      name: 'ScFileInputList',
      selector: 'ul[scFileInputList]',
      description:
        'The files: one Tab stop, arrows between them, Delete removes. Name it.',
    },
    {
      name: 'ScFileInputItem',
      selector: 'li[scFileInputItem]',
      description: 'A file: [file]. Focusable.',
    },
    {
      name: 'ScFileInputItemPreview',
      selector: '[scFileInputItemPreview]',
      description: "An image's thumbnail, or your icon.",
    },
    {
      name: 'ScFileInputItemSize',
      selector: '[scFileInputItemSize]',
      description: "Its size, in the app's language (formatFileSize).",
    },
    {
      name: 'ScFileInputItemRemove',
      selector: 'button[scFileInputItemRemove]',
      description: 'Takes its file out; out of the Tab order. Name it.',
    },
    {
      name: 'ScFileInputStatus',
      selector: '[scFileInputStatus]',
      description:
        'A polite live region (sr-only): your words, from lastChange().',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'File[]',
      default: '[]',
      description: 'Two-way, or [formField].',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Added to those there; without it, a new one replaces it.',
    },
    {
      name: 'accept',
      type: 'string | string[]',
      default: "''",
      description: 'MIME types, wildcards, extensions.',
    },
    {
      name: 'minSize, maxSize',
      type: 'number',
      default: '—',
      description: 'Per file, in bytes.',
    },
    {
      name: 'maxFiles',
      type: 'number',
      default: '—',
      description: 'The most files, in all.',
    },
    {
      name: 'validate',
      type: '(file, { accepted }) => string | null',
      default: '—',
      description: 'Your rule: a reason to keep the file out.',
    },
    {
      name: 'directory',
      type: 'boolean',
      default: 'false',
      description: 'A folder picked (fileRelativePath for each file).',
    },
    {
      name: 'capture',
      type: "'environment' | 'user' | boolean",
      default: 'false',
      description: 'The camera on a phone.',
    },
    {
      name: 'disabled, required, invalid, touched',
      type: 'boolean',
      default: 'false',
      description: 'Bound by [formField].',
    },
  ];

  private readonly dropzoneInputs: ApiInput[] = [
    {
      name: 'target',
      type: "'self' | 'document'",
      default: "'self'",
      description: 'Where drops are taken: on it, or anywhere on the page.',
    },
    {
      name: 'pasteTarget',
      type: "'self' | 'document' | HTMLElement | null",
      default: "'self'",
      description: 'Where pasted files are taken.',
    },
  ];
}
