import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicCodeEditorNextDemoContainer } from './demos/basic-code-editor-next-demo-container';
import { FormCodeEditorNextDemoContainer } from './demos/form-code-editor-next-demo-container';
import { LanguagesCodeEditorNextDemoContainer } from './demos/languages-code-editor-next-demo-container';
import { ReadonlyCodeEditorNextDemoContainer } from './demos/readonly-code-editor-next-demo-container';
import { WrapCodeEditorNextDemoContainer } from './demos/wrap-code-editor-next-demo-container';

@Component({
  selector: 'app-code-editor-next-page',
  imports: [
    BasicCodeEditorNextDemoContainer,
    FormCodeEditorNextDemoContainer,
    LanguagesCodeEditorNextDemoContainer,
    WrapCodeEditorNextDemoContainer,
    ReadonlyCodeEditorNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Code Editor Next</h1>
        <p class="text-muted-foreground">
          The code editor, rebuilt: CodeMirror, colored by Shiki through the
          app’s highlighter — the code block’s colors and frame. Undo,
          indentation from the keyboard (Escape then Tab moves on), line
          numbers, a form field.
        </p>
        <app-component-badges path="code-editor-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          CodeMirror, colored by the app’s highlighter (Shiki, like a code
          block), in a code block for its frame, title and copy button. Tab
          indents; Escape then Tab moves on.
        </p>
        <app-basic-code-editor-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>In a form</h2>
        <p class="text-muted-foreground">
          A [formField] (a string): named by the field’s label, required from
          the schema, marked once left.
        </p>
        <app-form-code-editor-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Languages</h2>
        <p class="text-muted-foreground">
          language: each one loaded the first time it is shown. A language’s
          CodeMirror package (its structure: indentation, brackets) can join
          through extensions.
        </p>
        <app-languages-code-editor-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Wrap</h2>
        <p class="text-muted-foreground">
          wrap: long lines break instead of scrolling; lineNumbers off.
        </p>
        <app-wrap-code-editor-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Read-only and disabled</h2>
        <p class="text-muted-foreground">
          readonly: selectable and copyable, not edited. disabled: out of the
          way.
        </p>
        <app-readonly-code-editor-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CodeEditorNextPage {}
