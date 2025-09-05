import { Component, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { CommandBasicDemo } from './command-basic-demo';

@Component({
  selector: 'app-command-basic-demo-section',
  imports: [PreviewCodeTabs, CommandBasicDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-command-basic-demo />
    </app-preview-code-tabs>
  `,
})
export class CommandBasicDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `<sc-command (commandSelect)="onCommandSelect($event)">
  <sc-command-input placeholder="Type a command or search..." />
  <sc-command-list>
    <sc-command-empty>No results found.</sc-command-empty>
    
    <sc-command-group heading="Quick Actions">
      <sc-command-item value="new-document">
        📄 New Document
        <span sc-command-shortcut>⌘N</span>
      </sc-command-item>
      <sc-command-item value="open-folder">
        📁 Open Folder
        <span sc-command-shortcut>⌘O</span>
      </sc-command-item>
    </sc-command-group>
    
    <sc-command-separator />
    
    <sc-command-group heading="Settings">
      <sc-command-item value="preferences">
        ⚙️ Preferences
        <span sc-command-shortcut>⌘,</span>
      </sc-command-item>
      <sc-command-item value="keyboard-shortcuts">
        ⌨️ Keyboard Shortcuts
        <span sc-command-shortcut>⌘K ⌘S</span>
      </sc-command-item>
    </sc-command-group>
  </sc-command-list>
</sc-command>`;
}
