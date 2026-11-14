import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ConditionalButtonPatternDemo } from './conditional-button-pattern-demo';

@Component({
  selector: 'app-conditional-button-pattern-demo-container',
  imports: [DemoContainer, ConditionalButtonPatternDemo],
  template: `
    <app-demo-container
      title="Conditional"
      description='[scButtonPattern]="editable()": the row is a button only while it can be edited — then a plain row, out of the Tab order.'
      demoUrl="/demos/button-pattern/conditional-button-pattern-demo"
      [code]="code"
    >
      <app-conditional-button-pattern-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ConditionalButtonPatternDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButtonPattern,
  ScField,
  ScFrame,
  ScLabel,
  ScSwitch,
} from '@semantic-components/ui';

/** A button only while it can act: off, a plain row, out of the Tab order. */
@Component({
  selector: 'app-conditional-button-pattern-demo',
  imports: [ScFrame, FormField, ScButtonPattern, ScLabel, ScSwitch, ScField],
  template: \`
    <div class="flex w-72 flex-col gap-4">
      <div scField orientation="horizontal">
        <input scSwitch [formField]="settings.editable" />
        <label scLabel>Editable</label>
      </div>
      <div
        scFrame
        [scButtonPattern]="editable()"
        (click)="edit()"
        class="p-3 text-sm"
        [class.cursor-pointer]="editable()"
      >
        Shipping address
        <span class="text-muted-foreground block">
          Edited {{ edits() }} times
        </span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ConditionalButtonPatternDemo {
  protected readonly settings = form(signal({ editable: true }));
  protected readonly editable = computed(() =>
    this.settings.editable().value(),
  );
  protected readonly edits = signal(0);

  protected edit(): void {
    if (this.editable()) this.edits.update((n) => n + 1);
  }
}`;
}
