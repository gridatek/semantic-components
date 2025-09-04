import { Component } from '@angular/core';

import { CommandDemoSection } from './command-demo-section';
import { CommandDialogDemoSection } from './command-dialog-demo-section';

@Component({
  selector: 'app-command-page',
  imports: [CommandDemoSection, CommandDialogDemoSection],
  template: `
    <app-command-demo-section />

    <app-command-dialog-demo-section />
  `,
})
export default class CommandPage {}
