import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicCodeEditorDemoContainer } from './demos/basic-code-editor-demo-container';
import { CssCodeEditorDemoContainer } from './demos/css-code-editor-demo-container';
import { HtmlCodeEditorDemoContainer } from './demos/html-code-editor-demo-container';
import { InteractiveCodeEditorDemoContainer } from './demos/interactive-code-editor-demo-container';
import { JsonCodeEditorDemoContainer } from './demos/json-code-editor-demo-container';
import { LightThemeCodeEditorDemoContainer } from './demos/light-theme-code-editor-demo-container';
import { MinimalCodeEditorDemoContainer } from './demos/minimal-code-editor-demo-container';
import { PythonCodeEditorDemoContainer } from './demos/python-code-editor-demo-container';
import { ReadonlyCodeEditorDemoContainer } from './demos/readonly-code-editor-demo-container';
import { SqlCodeEditorDemoContainer } from './demos/sql-code-editor-demo-container';
import { TypescriptCodeEditorDemoContainer } from './demos/typescript-code-editor-demo-container';
import { WordWrapCodeEditorDemoContainer } from './demos/word-wrap-code-editor-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-code-editor-page',
  imports: [
    BasicCodeEditorDemoContainer,
    TypescriptCodeEditorDemoContainer,
    HtmlCodeEditorDemoContainer,
    CssCodeEditorDemoContainer,
    JsonCodeEditorDemoContainer,
    PythonCodeEditorDemoContainer,
    SqlCodeEditorDemoContainer,
    LightThemeCodeEditorDemoContainer,
    ReadonlyCodeEditorDemoContainer,
    MinimalCodeEditorDemoContainer,
    WordWrapCodeEditorDemoContainer,
    InteractiveCodeEditorDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">CodeEditor</h1>
        <p class="text-muted-foreground">
          Syntax-highlighted code editor with line numbers, auto-indent, and
          multiple language support.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-code-editor-demo-container />
        <app-typescript-code-editor-demo-container />
        <app-html-code-editor-demo-container />
        <app-css-code-editor-demo-container />
        <app-json-code-editor-demo-container />
        <app-python-code-editor-demo-container />
        <app-sql-code-editor-demo-container />
        <app-light-theme-code-editor-demo-container />
        <app-readonly-code-editor-demo-container />
        <app-minimal-code-editor-demo-container />
        <app-word-wrap-code-editor-demo-container />
        <app-interactive-code-editor-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CodeEditorPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'code-editor')!
    .status;
}
