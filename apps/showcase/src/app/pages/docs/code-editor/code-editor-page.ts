import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicCodeEditorDemoContainer } from './demos/basic-code-editor-demo-container';
import { FormCodeEditorDemoContainer } from './demos/form-code-editor-demo-container';
import { LanguagesCodeEditorDemoContainer } from './demos/languages-code-editor-demo-container';
import { ReadonlyCodeEditorDemoContainer } from './demos/readonly-code-editor-demo-container';
import { WrapCodeEditorDemoContainer } from './demos/wrap-code-editor-demo-container';

@Component({
  selector: 'app-code-editor-page',
  imports: [
    BasicCodeEditorDemoContainer,
    FormCodeEditorDemoContainer,
    LanguagesCodeEditorDemoContainer,
    WrapCodeEditorDemoContainer,
    ReadonlyCodeEditorDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Code Editor</h1>
        <p class="text-muted-foreground">
          CodeMirror, colored by Shiki through the app’s highlighter — the code
          block’s colors and frame. Undo, indentation from the keyboard (Escape
          then Tab moves on), line numbers, a form field.
        </p>
        <app-component-badges path="code-editor" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="code-editor"
          library="@codemirror/state @codemirror/view @codemirror/commands @codemirror/language"
          href="https://codemirror.net"
          names="ScCodeEditor"
        />
        <p class="text-muted-foreground">
          Colored by the code block's highlighter, when the app provides one.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          CodeMirror, colored by the app’s highlighter (Shiki, like a code
          block), in a code block for its frame, title and copy button. Tab
          indents; Escape then Tab moves on.
        </p>
        <app-basic-code-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>In a form</h2>
        <p class="text-muted-foreground">
          A [formField] (a string): named by the field’s label, required from
          the schema, marked once left.
        </p>
        <app-form-code-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Languages</h2>
        <p class="text-muted-foreground">
          language: each one loaded the first time it is shown. A language’s
          CodeMirror package (its structure: indentation, brackets) can join
          through extensions.
        </p>
        <app-languages-code-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Wrap</h2>
        <p class="text-muted-foreground">
          wrap: long lines break instead of scrolling; lineNumbers off.
        </p>
        <app-wrap-code-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Read-only and disabled</h2>
        <p class="text-muted-foreground">
          readonly: selectable and copyable, not edited. disabled: out of the
          way.
        </p>
        <app-readonly-code-editor-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CodeEditorPage {}
