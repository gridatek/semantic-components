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
import { ScCopyButton, ScSeparator } from '@semantic-components/ui-lab';

import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-editor-page',
  imports: [
    TocHeading,
    ScCodeViewer,
    ScCodeViewerContent,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCopyButton,
    ScSeparator,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Editor</h1>
        <p class="text-muted-foreground">
          Install and configure the
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">
            &#64;semantic-components/editor
          </code>
          package. Provides a rich text editor powered by Tiptap. Requires the
          ui library to be installed first.
        </p>
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          1. Install the package
        </h2>
        <p class="text-muted-foreground">
          Install the editor library and its Tiptap peer dependencies.
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>terminal</span>
            <button sc-copy-button [value]="installCode"></button>
          </div>
          <div
            sc-code-viewer-content
            [code]="installCode"
            language="bash"
          ></div>
        </div>
      </section>

      <div sc-separator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          2. Configure styles
        </h2>
        <p class="text-muted-foreground">
          Import the editor styles in your
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>css</span>
            <button sc-copy-button [value]="stylesCode"></button>
          </div>
          <div sc-code-viewer-content [code]="stylesCode" language="css"></div>
        </div>
      </section>

      <div sc-separator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          3. Configure Tailwind source
        </h2>
        <p class="text-muted-foreground">
          Add the library as a Tailwind source in your
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>css</span>
            <button sc-copy-button [value]="sourceCode"></button>
          </div>
          <div sc-code-viewer-content [code]="sourceCode" language="css"></div>
        </div>
      </section>

      <div sc-separator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Usage</h2>
        <p class="text-muted-foreground">
          Import and use the editor in your Angular templates:
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>angular-ts</span>
            <button sc-copy-button [value]="usageCode"></button>
          </div>
          <div
            sc-code-viewer-content
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
  ScEditorBoldButton,
  ScEditorItalicButton,
} from '@semantic-components/editor';

@Component({
  selector: 'app-example',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorBoldButton,
    ScEditorItalicButton,
  ],
  template: \`
    <div sc-editor>
      <div sc-editor-toolbar>
        <button sc-editor-bold-button></button>
        <button sc-editor-italic-button></button>
      </div>
      <div sc-editor-content></div>
    </div>
  \`,
})
export class ExampleComponent {}`;
}
