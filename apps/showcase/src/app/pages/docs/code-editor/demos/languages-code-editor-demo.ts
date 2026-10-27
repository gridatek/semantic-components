import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import { ScCodeBlock } from '@semantic-components/ui/code-block';
import { ScCodeEditor } from '@semantic-components/ui/code-editor';

/** language: each one loaded the first time it is shown — its colors and structure (indentation, brackets). */
@Component({
  selector: 'app-languages-code-editor-demo',
  imports: [ScCodeBlock, ScCodeEditor, ScToggleGroup, ScToggleGroupItem],
  template: `
    <div
      scToggleGroup
      size="sm"
      aria-label="Language"
      class="mb-3"
      [value]="language()"
      (valueChange)="show($event)"
    >
      <button scToggleGroupItem value="css">CSS</button>
      <button scToggleGroupItem value="html">HTML</button>
      <button scToggleGroupItem value="python">Python</button>
      <button scToggleGroupItem value="sql">SQL</button>
    </div>
    <div scCodeBlock>
      <div
        scCodeEditor
        aria-label="Code"
        [language]="language()"
        [(value)]="code"
      ></div>
    </div>
  `,
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class LanguagesCodeEditorDemo {
  private readonly samples: Record<string, string> = {
    css: '.card {\n  display: grid;\n  gap: 1rem;\n  padding: 1.5rem;\n}',
    html: '<nav aria-label="Main">\n  <a href="/">Home</a>\n  <a href="/docs">Docs</a>\n</nav>',
    python:
      'def greet(name: str) -> str:\n    return f"Hello, {name}!"\n\n\nprint(greet("Ada"))',
    sql: 'SELECT name, email\nFROM users\nWHERE active = true\nORDER BY name;',
  };
  readonly language = signal('css');
  readonly code = signal(this.samples['css']);

  show(language: string | string[] | null): void {
    if (typeof language !== 'string') return;
    this.language.set(language);
    this.code.set(this.samples[language]);
  }
}
