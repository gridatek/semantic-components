import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeEditor,
  ScCodeEditorContent,
  ScCodeEditorHeader,
  ScCodeEditorLabel,
  ScCodeEditorCopyButton,
  ScCodeEditorLanguage,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-interactive-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
  ],
  template: `
    <div class="flex flex-wrap gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium mb-1">Language</label>
        <select
          [value]="selectedLanguage()"
          (change)="selectedLanguage.set($any($event.target).value)"
          class="px-3 py-1.5 border rounded-md bg-background"
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
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            [checked]="showLineNumbers()"
            (change)="showLineNumbers.set($any($event.target).checked)"
            class="rounded"
          />
          <span class="text-sm">Line Numbers</span>
        </label>
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            [checked]="wordWrapEnabled()"
            (change)="wordWrapEnabled.set($any($event.target).checked)"
            class="rounded"
          />
          <span class="text-sm">Word Wrap</span>
        </label>
      </div>
    </div>
    <div sc-code-editor>
      <div sc-code-editor-header>
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">
            interactive.{{ getExtension(selectedLanguage()) }}
          </span>
          <span sc-code-editor-label>{{ selectedLanguage() }}</span>
        </div>
        <button sc-code-editor-copy-button [code]="interactiveCode"></button>
      </div>
      <div
        sc-code-editor-content
        [(value)]="interactiveCode"
        [language]="selectedLanguage()"
        [showLineNumbers]="showLineNumbers()"
        [wordWrap]="wordWrapEnabled()"
        [filename]="'interactive.' + getExtension(selectedLanguage())"
      ></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveCodeEditorDemo {
  readonly selectedLanguage = signal<ScCodeEditorLanguage>('javascript');
  readonly showLineNumbers = signal(true);
  readonly wordWrapEnabled = signal(false);

  interactiveCode = `// Try changing the language!
function example() {
  return "Hello, World!";
}`;

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
}
