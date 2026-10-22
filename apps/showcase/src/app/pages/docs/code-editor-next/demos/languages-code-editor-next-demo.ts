import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCodeBlock, ScCodeEditorNext } from '@semantic-components/code';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';

/** language: each one loaded the first time it is shown. A language’s CodeMirror package (its structure: indentation, brackets) can join through extensions. */
@Component({
  selector: 'app-languages-code-editor-next-demo',
  imports: [ScCodeBlock, ScCodeEditorNext, ScToggleGroup, ScToggleGroupItem],
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
        scCodeEditorNext
        aria-label="Code"
        [language]="language()"
        [(value)]="code"
      ></div>
    </div>
  `,
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class LanguagesCodeEditorNextDemo {
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
