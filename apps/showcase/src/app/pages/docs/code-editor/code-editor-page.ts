import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
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
    ScKbd,
    BasicCodeEditorDemoContainer,
    FormCodeEditorDemoContainer,
    LanguagesCodeEditorDemoContainer,
    WrapCodeEditorDemoContainer,
    ReadonlyCodeEditorDemoContainer,
    TocHeading,
    ComponentBadges,
    EntryInstall,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Code Editor</h1>
        <p class="text-muted-foreground">
          CodeMirror, colored by Shiki through the app’s highlighter — the code
          block’s colors and frame. Undo, indentation from the keyboard (<kbd
            scKbd
            >Escape</kbd
          >
          then <kbd scKbd>Tab</kbd> moves on), line numbers, a form field.
        </p>
        <app-component-badges path="code-editor" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="code-editor"
          library="@codemirror/state @codemirror/view @codemirror/commands @codemirror/language @codemirror/language-data @lezer/highlight"
          href="https://codemirror.net"
          names="ScCodeEditor"
        />
        <p class="text-muted-foreground">
          Each language loads the first time it is shown, colored like a code
          block — no highlighter to provide.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Basic</h2>
        <p class="text-muted-foreground">
          CodeMirror, colored by the app’s highlighter (Shiki, like a code
          block), in a code block for its frame, title and copy button.
          <kbd scKbd>Tab</kbd> indents; <kbd scKbd>Escape</kbd> then
          <kbd scKbd>Tab</kbd> moves on.
        </p>
        <app-basic-code-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>In a form</h2>
        <p class="text-muted-foreground">
          A [formField] (a string): named by the field’s label, required from
          the schema, marked once left.
        </p>
        <app-form-code-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Languages</h2>
        <p class="text-muted-foreground">
          language: each one loaded the first time it is shown — its colors and
          its structure (indentation, brackets).
        </p>
        <app-languages-code-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Wrap</h2>
        <p class="text-muted-foreground">
          wrap: long lines break instead of scrolling; lineNumbers off.
        </p>
        <app-wrap-code-editor-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Read-only and disabled</h2>
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
