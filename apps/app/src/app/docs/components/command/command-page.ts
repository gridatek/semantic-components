import { Component } from '@angular/core';

import { ScPage, ScPageContent, ScPageHeader, ScPageTitle } from '@semantic-components/ui';

import { CommandDemoSection } from './command-demo-section';
import { CommandDialogDemoSection } from './command-dialog-demo-section';

@Component({
  selector: 'app-command-page',
  imports: [
    ScPage,
    ScPageHeader,
    ScPageTitle,
    ScPageContent,
    CommandDemoSection,
    CommandDialogDemoSection,
  ],
  template: `
    <sc-page>
      <sc-page-header>
        <h1 sc-page-title>Command</h1>
      </sc-page-header>
      <sc-page-content>
        <app-command-demo-section />
        <app-command-dialog-demo-section />
      </sc-page-content>
    </sc-page>
  `,
})
export default class CommandPage {}
