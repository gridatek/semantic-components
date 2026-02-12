import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeEditor,
  ScCodeEditorContent,
  ScCodeEditorHeader,
  ScCodeEditorLabel,
  ScCodeEditorCopyButton,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
  ],
  template: `
    <div sc-code-editor>
      <div sc-code-editor-header>
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">example.js</span>
          <span sc-code-editor-label>javascript</span>
        </div>
        <button sc-code-editor-copy-button [code]="javascriptCode"></button>
      </div>
      <div
        sc-code-editor-content
        [(value)]="javascriptCode"
        language="javascript"
        filename="example.js"
      ></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCodeEditorDemo {
  javascriptCode = `// JavaScript Example
function greet(name) {
  const greeting = \`Hello, \${name}!\`;
  console.log(greeting);
  return greeting;
}

const users = ['Alice', 'Bob', 'Charlie'];
users.forEach(user => greet(user));

// Arrow function with async/await
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};`;
}
