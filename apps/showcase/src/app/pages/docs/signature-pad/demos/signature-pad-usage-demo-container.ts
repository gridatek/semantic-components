import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignaturePadUsageDemo } from './signature-pad-usage-demo';

@Component({
  selector: 'app-signature-pad-usage-demo-container',
  imports: [DemoContainer, SignaturePadUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/signature-pad/signature-pad-usage-demo"
    >
      <app-signature-pad-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SignaturePadUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScSignaturePad } from '@semantic-components/ui';

/** The pad, and your buttons calling it: Undo takes the last stroke back, Clear all. */
@Component({
  selector: 'app-signature-pad-usage-demo',
  imports: [ScButton, ScSignaturePad],
  template: \`
    <div class="w-full max-w-md space-y-2">
      <div
        scSignaturePad
        #pad="scSignaturePad"
        aria-label="Signature"
      ></div>
      <div class="flex justify-end gap-2">
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="!pad.canUndo()"
          (click)="pad.undo()"
        >
          Undo
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="pad.empty()"
          (click)="pad.clear()"
        >
          Clear
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignaturePadUsageDemo {}`;
}
