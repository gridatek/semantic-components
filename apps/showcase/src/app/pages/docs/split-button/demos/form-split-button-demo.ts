import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSplitButton,
  type SplitButtonAction,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-split-button-demo',
  imports: [ScSplitButton],
  template: `
    <div class="p-4 border rounded-lg bg-card">
      <div class="flex justify-end">
        <sc-split-button
          label="Send"
          [icon]="sendIcon"
          [actions]="sendActions()"
          (mainClick)="onSend()"
        />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSplitButtonDemo {
  readonly sendIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`;

  readonly sendActions = signal<SplitButtonAction[]>([
    { id: 'schedule', label: 'Schedule Send' },
    { id: 'send-later', label: 'Send Later' },
    { id: 'save-draft', label: 'Save Draft' },
  ]);

  onSend(): void {
    // Send action handler
  }
}
