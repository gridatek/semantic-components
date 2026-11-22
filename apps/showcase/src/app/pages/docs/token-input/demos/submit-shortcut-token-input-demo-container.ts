import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SubmitShortcutTokenInputDemo } from './submit-shortcut-token-input-demo';

@Component({
  selector: 'app-submit-shortcut-token-input-demo-container',
  imports: [DemoContainer, SubmitShortcutTokenInputDemo],
  template: `
    <app-demo-container
      title="Submit shortcut"
      [code]="code"
      demoUrl="/demos/token-input/submit-shortcut-token-input-demo"
    >
      <app-submit-shortcut-token-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SubmitShortcutTokenInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScKbd,
  ScTokenInput,
  ScTokenInputEditor,
  type ScTokenInputValue,
  tokenInputToLabel,
} from '@semantic-components/ui';

/** submitShortcut="mod+enter": Ctrl + Enter (⌘ + Enter) sends — (submitted) gets the value; Enter makes a new line. */
@Component({
  selector: 'app-submit-shortcut-token-input-demo',
  imports: [ScKbd, ScTokenInput, ScTokenInputEditor],
  template: \`
    <div class="grid w-full max-w-md gap-2">
      <div
        scTokenInput
        submitShortcut="mod+enter"
        [(value)]="value"
        (submitted)="send($event)"
      >
        <div
          scTokenInputEditor
          aria-label="Comment"
          placeholder="Write a comment…"
        ></div>
      </div>
      <p class="text-muted-foreground text-sm">
        <kbd scKbd>Ctrl + Enter</kbd> sends.
      </p>
      @if (sent()) {
        <p class="text-sm whitespace-pre-wrap" data-testid="picked">
          {{ sent() }}
        </p>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SubmitShortcutTokenInputDemo {
  private readonly value = signal<ScTokenInputValue>([]);
  private readonly sent = signal('');

  private send(value: ScTokenInputValue): void {
    this.sent.set(tokenInputToLabel(value));
    this.value.set([]);
  }
}`;
}
