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
} from '@semantic-components/code';

@Component({
  selector: 'app-css-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
  ],
  template: `
    <div scCodeEditor>
      <div scCodeEditorHeader>
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">styles.css</span>
          <span scCodeEditorLabel>css</span>
        </div>
        <button scCodeEditorCopyButton [code]="cssCode"></button>
      </div>
      <div
        scCodeEditorContent
        [(value)]="cssCode"
        language="css"
        filename="styles.css"
        class="max-h-[250px]"
      ></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CssCodeEditorDemo {
  cssCode = `/* CSS Example */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}`;
}
