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
  selector: 'app-light-theme-code-editor-demo',
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
          <span class="text-sm text-muted-foreground">light-example.js</span>
          <span sc-code-editor-label>javascript</span>
        </div>
        <button sc-code-editor-copy-button [code]="lightThemeCode"></button>
      </div>
      <div
        sc-code-editor-content
        [(value)]="lightThemeCode"
        language="javascript"
        filename="light-example.js"
      ></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightThemeCodeEditorDemo {
  lightThemeCode = `// Light theme example
const calculateSum = (numbers) => {
  return numbers.reduce((acc, num) => acc + num, 0);
};

const numbers = [1, 2, 3, 4, 5];
console.log('Sum:', calculateSum(numbers));`;
}
