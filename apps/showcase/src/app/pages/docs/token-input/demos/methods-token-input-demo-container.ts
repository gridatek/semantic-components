import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MethodsTokenInputDemo } from './methods-token-input-demo';

@Component({
  selector: 'app-methods-token-input-demo-container',
  imports: [DemoContainer, MethodsTokenInputDemo],
  template: `
    <app-demo-container
      title="Methods"
      [code]="code"
      demoUrl="/demos/token-input/methods-token-input-demo"
    >
      <app-methods-token-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MethodsTokenInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScButton,
  ScTokenInput,
  ScTokenInputEditor,
  ScTokenInputToken,
  ScTokenInputTokenRemove,
  type ScTokenInputValue,
  tokenInputToText,
} from '@semantic-components/ui';
import { SiFileTextIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** #input="scTokenInput": insert() at the caret, removeToken(), undo() / redo() (canUndo, canRedo), clear(). */
@Component({
  selector: 'app-methods-token-input-demo',
  imports: [
    ScButton,
    ScTokenInput,
    ScTokenInputEditor,
    ScTokenInputToken,
    ScTokenInputTokenRemove,
    SiFileTextIcon,
    SiXIcon,
  ],
  template: \`
    <div class="grid w-full max-w-md gap-3">
      <div scTokenInput #input="scTokenInput" [(value)]="value">
        <div scTokenInputEditor aria-label="Notes"></div>
        <ng-template scTokenInputToken let-token>
          <svg siFileTextIcon></svg>
          {{ token.label }}
          <span class="sr-only">file</span>
          <span scTokenInputTokenRemove><svg siXIcon></svg></span>
        </ng-template>
      </div>
      <div class="flex flex-wrap gap-2">
        <button scButton variant="outline" size="sm" (click)="attach(input)">
          Insert a file
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="!firstId()"
          (click)="input.removeToken(firstId())"
        >
          Remove the first file
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="!input.canUndo()"
          (click)="input.undo()"
        >
          Undo
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="!input.canRedo()"
          (click)="input.redo()"
        >
          Redo
        </button>
        <button scButton variant="outline" size="sm" (click)="input.clear()">
          Clear
        </button>
      </div>
      <p class="text-muted-foreground font-mono text-xs" data-testid="picked">
        {{ text() }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MethodsTokenInputDemo {
  private readonly value = signal<ScTokenInputValue>(['Notes on ']);
  private files = 0;

  private attach(input: ScTokenInput): void {
    const name = \`notes-\${++this.files}.md\`;
    input.insert({ type: 'file', value: name, label: name });
    input.focus();
  }

  /** The first file's id (the inserted ones have one). */
  private readonly firstId = computed(() => {
    const first = this.value().find((part) => typeof part !== 'string');
    return typeof first === 'object' ? (first.id ?? '') : '';
  });
  private readonly text = computed(() => tokenInputToText(this.value()));
}`;
}
