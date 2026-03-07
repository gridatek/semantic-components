import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { ScSeparator } from '@semantic-components/ui';
import { ScHeading } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-editor-page',
  imports: [
    TocHeading,
    ScCodeViewer,
    ScCodeViewerContent,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    ScSeparator,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Editor</h1>
        <p class="text-muted-foreground">
          Install and configure the
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            &#64;semantic-components/editor
          </code>
          package. Provides a rich text editor powered by Tiptap. Requires the
          ui library to be installed first.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading toc>1. Install the package</h2>
        <p class="text-muted-foreground">
          Install the editor library and its Tiptap peer dependencies.
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>terminal</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="installCode"
              #copy="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copy.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div scCodeViewerContent [code]="installCode" language="bash"></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading toc>2. Configure styles</h2>
        <p class="text-muted-foreground">
          Import the editor styles in your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="stylesCode"
              #copy2="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copy2.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div scCodeViewerContent [code]="stylesCode" language="css"></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading toc>3. Configure Tailwind source</h2>
        <p class="text-muted-foreground">
          Add the library as a Tailwind source in your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="sourceCode"
              #copy3="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copy3.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div scCodeViewerContent [code]="sourceCode" language="css"></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading toc>Usage</h2>
        <p class="text-muted-foreground">
          Import and use the editor in your Angular templates:
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>angular-ts</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="usageCode"
              #copy4="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copy4.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div
            scCodeViewerContent
            [code]="usageCode"
            language="angular-ts"
          ></div>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditorInstallPage {
  readonly installCode =
    'npm install @semantic-components/editor @tiptap/core @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/extension-text-align';

  readonly stylesCode = '@import "@semantic-components/editor/styles";';

  readonly sourceCode =
    '@source "../node_modules/@semantic-components/editor";';

  readonly usageCode = `import {
  ScEditor,
  ScEditorContent,
  ScEditorToolbar,
  ScEditorBoldToggle,
  ScEditorItalicToggle,
} from '@semantic-components/editor';

@Component({
  selector: 'app-example',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorBoldToggle,
    ScEditorItalicToggle,
  ],
  template: \`
    <div scEditor>
      <div scEditorToolbar>
        <button scEditorBoldButton></button>
        <button scEditorItalicButton></button>
      </div>
      <div scEditorContent></div>
    </div>
  \`,
})
export class ExampleComponent {}`;
}
