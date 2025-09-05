import { Component } from '@angular/core';

import { CommandAdvancedDemoSection } from './command-advanced-demo-section';
import { CommandAlgoliaSearchDemoSection } from './command-algolia-search-demo-section';
import { CommandBasicDemoSection } from './command-basic-demo-section';
import { CommandDemoSection } from './command-demo-section';
import { CommandDialogDemoSection } from './command-dialog-demo-section';
import { CommandHttpResourceDemoSection } from './command-http-resource-demo-section';
import { CommandInteractiveDemoSection } from './command-interactive-demo-section';
import { CommandSearchDemoSection } from './command-search-demo-section';
import { CommandTriggerDemoSection } from './command-trigger-demo-section';

@Component({
  selector: 'app-command-page',
  imports: [
    CommandDemoSection,
    CommandDialogDemoSection,
    CommandBasicDemoSection,
    CommandAdvancedDemoSection,
    CommandInteractiveDemoSection,
    CommandHttpResourceDemoSection,
    CommandSearchDemoSection,
    CommandAlgoliaSearchDemoSection,
    CommandTriggerDemoSection,
  ],
  template: `
    <app-command-demo-section />

    <app-command-dialog-demo-section />

    <app-command-basic-demo-section title="Basic Command Palette" />

    <app-command-advanced-demo-section title="Advanced Command Palette" />

    <app-command-interactive-demo-section title="Interactive Command Dialog" />

    <app-command-http-resource-demo-section
      title="Command with HttpResource"
      description="Modern Angular command component using httpResource for dynamic search results combined with static commands."
    />

    <app-command-search-demo-section />

    <app-command-algolia-search-demo-section />

    <app-command-trigger-demo-section
      title="Command Trigger Component"
      description="Reusable command trigger component with configurable options, API integration, and automatic OS detection."
    />
  `,
})
export default class CommandPage {}
