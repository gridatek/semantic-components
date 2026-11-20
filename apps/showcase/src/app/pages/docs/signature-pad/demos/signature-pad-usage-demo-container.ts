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
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  type ScSignature,
  ScSignaturePad,
} from '@semantic-components/ui';

/** Sign, then Clear or Save: the pad, named by the line above it, and your two buttons. */
@Component({
  selector: 'app-signature-pad-usage-demo',
  imports: [ScButton, ScSignaturePad],
  template: \`
    <div class="flex w-full max-w-md flex-col gap-3">
      <p id="agree-label" class="text-sm font-medium">Sign below to agree:</p>
      <div
        scSignaturePad
        #pad="scSignaturePad"
        aria-labelledby="agree-label"
        [(value)]="signature"
      ></div>
      <div class="grid grid-cols-2 gap-3">
        <button
          scButton
          variant="outline"
          [disabled]="pad.empty()"
          (click)="pad.clear(); saved.set(false)"
        >
          Clear
        </button>
        <button scButton [disabled]="pad.empty()" (click)="saved.set(true)">
          Save
        </button>
      </div>
      @if (saved() && signature()) {
        <p role="status" class="text-muted-foreground text-sm">
          Signature saved.
        </p>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignaturePadUsageDemo {
  private readonly signature = signal<ScSignature | null>(null);
  private readonly saved = signal(false);
}`;
}
