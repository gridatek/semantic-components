import { Component, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { CommandDialogDemo } from './command-dialog-demo';

@Component({
  selector: 'app-command-dialog-demo-section',
  imports: [PreviewCodeTabs, CommandDialogDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-command-dialog-demo />
    </app-preview-code-tabs>
  `,
})
export class CommandDialogDemoSection {
  readonly title = input<string>('Dialog');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `// Dialog service injection
export class MyComponent {
  commandDialogService = inject(CommandDialog);
  
  openCommandDialog() {
    this.commandDialogService.open({
      title: 'Command Palette',
      width: '600px',
      height: '400px'
    });
  }
}`;
}
