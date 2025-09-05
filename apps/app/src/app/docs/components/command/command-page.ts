import { Component } from '@angular/core';

// import { CommandAdvancedDemoSection } from './command-advanced-demo-section';
// import { CommandBasicDemoSection } from './command-basic-demo-section';
// import { CommandDemo2Section } from './command-demo2-section';
// import { CommandDemoSection } from './command-demo-section';
// import { CommandDialogDemoSection } from './command-dialog-demo-section';
import { CommandHttpResourceDemoSection } from './command-http-resource-demo-section';

// import { CommandInteractiveDemoSection } from './command-interactive-demo-section';

@Component({
  selector: 'app-command-page',
  imports: [
    // CommandDemoSection,
    // CommandDemo2Section,
    // CommandDialogDemoSection,
    // CommandBasicDemoSection,
    // CommandAdvancedDemoSection,
    // CommandInteractiveDemoSection,
    CommandHttpResourceDemoSection,
  ],
  template: `
    <!--    <app-command-demo-section />

    <app-command-demo2-section />

    <app-command-dialog-demo-section />

    <app-command-basic-demo-section title="Basic Command Palette" />

    <app-command-advanced-demo-section title="Advanced Command Palette" />

    <app-command-interactive-demo-section title="Interactive Command Dialog" />-->

    <app-command-http-resource-demo-section
      title="Command with HttpResource"
      description="Modern Angular command component using httpResource for dynamic search results combined with static commands."
    />
  `,
})
export default class CommandPage {}
