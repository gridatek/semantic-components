import { Component, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { CommandAdvancedDemo } from './command-advanced-demo';

@Component({
  selector: 'app-command-advanced-demo-section',
  imports: [PreviewCodeTabs, CommandAdvancedDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-command-advanced-demo />
    </app-preview-code-tabs>
  `,
})
export class CommandAdvancedDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `// Component setup
export class MyCommandComponent implements OnInit {
  commandCategories$!: Observable<CommandCategory[]>;
  
  constructor(private commandService: MockCommandService) {}

  ngOnInit() {
    this.commandCategories$ = this.commandService.getCommandsByCategory();
  }

  onCommandSelect(commandId: string) {
    this.commandService.executeCommand(commandId);
  }
}

// Template usage
<sc-command 
  [filter]="useCustomFilter ? commandService.fuzzyFilter : undefined"
  (commandSelect)="onCommandSelect($event)">
  
  @if (commandCategories$ | async; as categories) {
    @for (category of categories; track category.id) {
      <sc-command-group [heading]="category.label">
        @for (command of category.items; track command.id) {
          <sc-command-item [value]="command.id" [disabled]="command.disabled">
            {{ command.icon }} {{ command.label }}
            @if (command.shortcut) {
              <span sc-command-shortcut>{{ command.shortcut }}</span>
            }
          </sc-command-item>
        }
      </sc-command-group>
    }
  }
</sc-command>`;
}
