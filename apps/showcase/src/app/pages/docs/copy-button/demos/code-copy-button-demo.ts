import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyCode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-code-copy-button-demo',
  imports: [ScCopyCode],
  template: `
    <div class="max-w-lg">
      <div sc-copy-code [value]="codeSnippet">{{ codeSnippet }}</div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeCopyButtonDemo {
  readonly codeSnippet = `import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: '<h1>Hello, World!</h1>'
})
export class Hello {}`;
}
