import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignaturePadNextUsageDemo } from './signature-pad-next-usage-demo';

@Component({
  selector: 'app-signature-pad-next-usage-demo-container',
  imports: [DemoContainer, SignaturePadNextUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/signature-pad-next/signature-pad-next-usage-demo"
    >
      <app-signature-pad-next-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SignaturePadNextUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScSignaturePadNext } from '@semantic-components/ui';

/** The pad, and your buttons calling it: Undo takes the last stroke back, Clear all. */
@Component({
  selector: 'app-signature-pad-next-usage-demo',
  imports: [ScButton, ScSignaturePadNext],
  template: \`
    <div class="w-full max-w-md space-y-2">
      <div
        scSignaturePadNext
        #pad="scSignaturePadNext"
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
export class SignaturePadNextUsageDemo {}`;
}
