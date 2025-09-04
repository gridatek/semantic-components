import { Component } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { CommandDemo } from './command-demo';

@Component({
  selector: 'app-command-demo-section',
  imports: [PreviewCodeTabs, CommandDemo],
  template: `
    <app-preview-code-tabs>
      <app-command-demo />
    </app-preview-code-tabs>
  `,
})
export class CommandDemoSection {
  protected demoCode = ``;
}
