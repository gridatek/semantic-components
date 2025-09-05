import { Component, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { CommandInteractiveDemo } from './command-interactive-demo';

@Component({
  selector: 'app-command-interactive-demo-section',
  imports: [PreviewCodeTabs, CommandInteractiveDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-command-interactive-demo />
    </app-preview-code-tabs>
  `,
})
export class CommandInteractiveDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `// Service injection
export class MyComponent {
  commandDialogService = inject(CommandDialog);

  @ViewChild('commandTemplate') commandTemplate!: TemplateRef<any>;

  openDialog() {
    const dialogRef = this.commandDialogService.openTemplate(
      this.commandTemplate,
      {
        title: 'Command Palette',
        width: '700px',
        height: '550px',
        hasBackdrop: true,
         backdropClass: [ 'bg-black/20'],
      }
    );

    dialogRef.closed.subscribe(result => {
      console.log('Dialog closed:', result);
    });
  }
}

// Global keyboard shortcut
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    this.openDialog();
  }
});

// Template with enhanced styling
<ng-template #commandTemplate>
  <sc-command (commandSelect)="onCommandSelect($event)">
    <button class="absolute right-4 top-4" (click)="closeDialog()">×</button>
    <sc-command-input placeholder="Search..." />
    <sc-command-list class="max-h-96">
      <!-- Commands with enhanced styling -->
    </sc-command-list>
  </sc-command>
</ng-template>`;
}
