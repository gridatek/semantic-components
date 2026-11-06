import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ModalPopoverDemo } from './modal-popover-demo';

@Component({
  selector: 'app-modal-popover-demo-container',
  imports: [DemoContainer, ModalPopoverDemo],
  template: `
    <app-demo-container
      title="Modal"
      demoUrl="/demos/popover/modal-popover-demo"
      [code]="code"
    >
      <app-modal-popover-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ModalPopoverDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScPopover,
  ScPopoverDescription,
  ScPopoverHeader,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTitle,
  ScPopoverTrigger,
  ScSelectOnFocus,
} from '@semantic-components/ui';

/** modal: false (default) — Tab may leave, and closes it; trap-focus — Tab stays inside; true — and the page behind takes no scroll or click. */
@Component({
  selector: 'app-modal-popover-demo',
  imports: [
    ScButton,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScPopover,
    ScPopoverDescription,
    ScPopoverHeader,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTitle,
    ScPopoverTrigger,
    ScSelectOnFocus,
  ],
  template: \`
    <div class="flex flex-wrap gap-2">
      <div scPopoverProvider>
        <button scButton scPopoverTrigger variant="outline">Not modal</button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-64">
            <div scPopoverHeader>
              <h2 scPopoverTitle>Not modal</h2>
              <p scPopoverDescription>Tab through it, then press Escape.</p>
            </div>
            <div scFieldGroup class="gap-4">
              <div scField orientation="horizontal">
                <label scLabel class="w-1/2">Width</label>
                <input scInput value="100%" scSelectOnFocus="program" />
              </div>
              <div scField orientation="horizontal">
                <label scLabel class="w-1/2">Height</label>
                <input scInput value="25px" />
              </div>
            </div>
          </div>
        </ng-template>
      </div>
      <div scPopoverProvider [modal]="'trap-focus'">
        <button scButton scPopoverTrigger variant="outline">Trap focus</button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-64">
            <div scPopoverHeader>
              <h2 scPopoverTitle>Trap focus</h2>
              <p scPopoverDescription>Tab through it, then press Escape.</p>
            </div>
            <div scFieldGroup class="gap-4">
              <div scField orientation="horizontal">
                <label scLabel class="w-1/2">Width</label>
                <input scInput value="100%" scSelectOnFocus="program" />
              </div>
              <div scField orientation="horizontal">
                <label scLabel class="w-1/2">Height</label>
                <input scInput value="25px" />
              </div>
            </div>
          </div>
        </ng-template>
      </div>
      <div scPopoverProvider [modal]="true">
        <button scButton scPopoverTrigger variant="outline">Modal</button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-64">
            <div scPopoverHeader>
              <h2 scPopoverTitle>Modal</h2>
              <p scPopoverDescription>Tab through it, then press Escape.</p>
            </div>
            <div scFieldGroup class="gap-4">
              <div scField orientation="horizontal">
                <label scLabel class="w-1/2">Width</label>
                <input scInput value="100%" scSelectOnFocus="program" />
              </div>
              <div scField orientation="horizontal">
                <label scLabel class="w-1/2">Height</label>
                <input scInput value="25px" />
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ModalPopoverDemo {}`;
}
