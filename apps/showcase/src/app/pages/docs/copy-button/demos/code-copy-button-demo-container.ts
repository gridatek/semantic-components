import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CodeCopyButtonDemo } from './code-copy-button-demo';

@Component({
  selector: 'app-code-copy-button-demo-container',
  imports: [DemoContainer, CodeCopyButtonDemo],
  template: `
    <app-demo-container title="Copy Code Block" [code]="code">
      <app-code-copy-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeCopyButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-code-copy-button-demo',
  imports: [ScCopyCode],
  template: \`
    <div class="max-w-lg">
      <div sc-copy-code [value]="codeSnippet">{{ codeSnippet }}</div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeCopyButtonDemo {
  readonly codeSnippet = \`import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: '<h1>Hello, World!</h1>'
})
export class Hello {}\`;
}`;
}
