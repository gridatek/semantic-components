import { Component } from '@angular/core';

import { CommandDemoSection } from './command-demo-section';

@Component({
  selector: 'app-command-page',
  imports: [CommandDemoSection],
  template: `
    <app-command-demo-section />
  `,
})
export default class CommandPage {}
