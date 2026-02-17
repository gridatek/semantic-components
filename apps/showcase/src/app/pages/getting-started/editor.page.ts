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
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>terminal</span>
            <button scCopyButton [value]="installCode"></button>
          </div>
          <div
            scCodeViewerContent
            [code]="installCode"
            language="bash"
          ></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          2. Configure styles
        </h2>
        <p class="text-muted-foreground">
          Import the editor styles in your
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button scCopyButton [value]="stylesCode"></button>
          </div>
          <div scCodeViewerContent [code]="stylesCode" language="css"></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          3. Configure Tailwind source
        </h2>
        <p class="text-muted-foreground">
          Add the library as a Tailwind source in your
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button scCopyButton [value]="sourceCode"></button>
          </div>
          <div scCodeViewerContent [code]="sourceCode" language="css"></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Usage</h2>
        <p class="text-muted-foreground">
          Import and use the editor in your Angular templates:
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>angular-ts</span>
            <button scCopyButton [value]="usageCode"></button>
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
