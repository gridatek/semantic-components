import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InteractiveCodeEditorDemo } from './interactive-code-editor-demo';

@Component({
  selector: 'app-interactive-code-editor-demo-container',
  imports: [DemoContainer, InteractiveCodeEditorDemo],
  template: `
    <app-demo-container
      title="Interactive Editor"
      demoUrl="/demos/code-editor/interactive-code-editor-demo"
      [code]="code"
    >
      <app-interactive-code-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveCodeEditorDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScCodeEditor,
  ScCodeEditorContent,
  ScCodeEditorCopyButton,
  ScCodeEditorHeader,
  ScCodeEditorLabel,
  ScCodeEditorLanguage,
} from '@semantic-components/code';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-interactive-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
    ScCheckboxField,
    ScCheckbox,
    ScLabel,
  ],
  template: \`
    <div class="mb-4 flex flex-wrap gap-4">
      <div>
        <label class="mb-1 block text-sm font-medium">Language</label>
        <select
          [value]="selectedLanguage()"
          (change)="selectedLanguage.set($any($event.target).value)"
          class="bg-background rounded-md border px-3 py-1.5"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
          <option value="python">Python</option>
          <option value="sql">SQL</option>
          <option value="markdown">Markdown</option>
          <option value="plaintext">Plain Text</option>
        </select>
      </div>
      <div class="flex items-end gap-4">
        <label scCheckboxField>
          <input
            type="checkbox"
            scCheckbox
            [checked]="showLineNumbers()"
            (checkedChange)="showLineNumbers.set($event)"
          />
          <label scLabel>Line Numbers</label>
        </label>
        <label scCheckboxField>
          <input
            type="checkbox"
            scCheckbox
            [checked]="wordWrapEnabled()"
            (checkedChange)="wordWrapEnabled.set($event)"
          />
          <label scLabel>Word Wrap</label>
        </label>
      </div>
    </div>
    <div scCodeEditor>
      <div scCodeEditorHeader>
        <div class="flex items-center gap-2">
          <span class="text-muted-foreground text-sm">
            interactive.{{ getExtension(selectedLanguage()) }}
          </span>
          <span scCodeEditorLabel>{{ selectedLanguage() }}</span>
        </div>
        <button scCodeEditorCopyButton [code]="interactiveCode"></button>
      </div>
      <div
        scCodeEditorContent
        [(value)]="interactiveCode"
        [language]="selectedLanguage()"
        [showLineNumbers]="showLineNumbers()"
        [wordWrap]="wordWrapEnabled()"
        [filename]="'interactive.' + getExtension(selectedLanguage())"
      ></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveCodeEditorDemo {
  readonly selectedLanguage = signal<ScCodeEditorLanguage>('javascript');
  readonly showLineNumbers = signal(true);
  readonly wordWrapEnabled = signal(false);

  interactiveCode = \`// Try changing the language!
function example() {
  return "Hello, World!";
}\`;

  getExtension(lang: ScCodeEditorLanguage): string {
    const extensions: Record<ScCodeEditorLanguage, string> = {
      'angular-ts': 'ts',
      javascript: 'js',
      typescript: 'ts',
      html: 'html',
      css: 'css',
      json: 'json',
      python: 'py',
      bash: 'sh',
      shell: 'sh',
      sql: 'sql',
      markdown: 'md',
      yaml: 'yaml',
      go: 'go',
      rust: 'rs',
      java: 'java',
      plaintext: 'txt',
    };
    return extensions[lang] || 'txt';
  }
}`;
}
