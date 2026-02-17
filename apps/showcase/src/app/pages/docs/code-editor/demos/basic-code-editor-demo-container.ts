import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCodeEditorDemo } from './basic-code-editor-demo';

@Component({
  selector: 'app-basic-code-editor-demo-container',
  imports: [DemoContainer, BasicCodeEditorDemo],
  template: `
    <app-demo-container
      title="Basic Editor"
      demoUrl="/demos/code-editor/basic-code-editor-demo"
      [code]="code"
    >
      <app-basic-code-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCodeEditorDemoContainer {
  readonly code = `import {
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
  selector: 'app-basic-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
  ],
  template: \`
    <div scCodeEditor>
      <div scCodeEditorHeader>
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">example.js</span>
          <span scCodeEditorLabel>javascript</span>
        </div>
        <button scCodeEditorCopyButton [code]="javascriptCode"></button>
      </div>
      <div
        scCodeEditorContent
        [(value)]="javascriptCode"
        language="javascript"
        filename="example.js"
      ></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCodeEditorDemo {
  javascriptCode = \`// JavaScript Example
function greet(name) {
  const greeting = \\\`Hello, \\\${name}!\\\`;
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
};\`;
}`;
}
