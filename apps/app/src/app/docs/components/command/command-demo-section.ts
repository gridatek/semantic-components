import { Component, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { CommandDemo } from './command-demo';

@Component({
  selector: 'app-command-demo-section',
  imports: [PreviewCodeTabs, CommandDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-command-demo />
    </app-preview-code-tabs>
  `,
})
export class CommandDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = ``;
}
