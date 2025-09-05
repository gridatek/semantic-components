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

  protected readonly code = `<sc-command class="rounded-lg border shadow-md md:min-w-[450px]">
  <sc-command-input placeholder="Type a command or search..." />
  <sc-command-list>
    <sc-command-empty>No results found.</sc-command-empty>
    
    <sc-command-group heading="Suggestions">
      <sc-command-item>
        📅 <span>Calendar</span>
      </sc-command-item>
      <sc-command-item>
        📚 <span>Search Emoji</span>
      </sc-command-item>
      <sc-command-item>
        🧮 <span>Calculator</span>
      </sc-command-item>
    </sc-command-group>
    
    <sc-command-separator />
    
    <sc-command-group heading="Settings">
      <sc-command-item>
        👤 <span>Profile</span>
        <span sc-command-shortcut>⌘P</span>
      </sc-command-item>
      <sc-command-item>
        📧 <span>Mail</span>
        <span sc-command-shortcut>⌘B</span>
      </sc-command-item>
      <sc-command-item>
        ⚙️ <span>Settings</span>
        <span sc-command-shortcut>⌘S</span>
      </sc-command-item>
    </sc-command-group>
  </sc-command-list>
</sc-command>`;
}
