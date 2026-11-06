import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScPopoverNext,
  ScPopoverNextDescription,
  ScPopoverNextHeader,
  ScPopoverNextPortal,
  ScPopoverNextProvider,
  ScPopoverNextTitle,
  ScPopoverNextTrigger,
  ScSelectOnFocus,
} from '@semantic-components/ui';

/** modal: false (default) — Tab may leave, and closes it; trap-focus — Tab stays inside; true — and the page behind takes no scroll or click. */
@Component({
  selector: 'app-modal-popover-next-demo',
  imports: [
    ScButton,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScPopoverNext,
    ScPopoverNextDescription,
    ScPopoverNextHeader,
    ScPopoverNextPortal,
    ScPopoverNextProvider,
    ScPopoverNextTitle,
    ScPopoverNextTrigger,
    ScSelectOnFocus,
  ],
  template: `
    <div class="flex flex-wrap gap-2">
      <div scPopoverNextProvider>
        <button scButton scPopoverNextTrigger variant="outline">
          Not modal
        </button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-64">
            <div scPopoverNextHeader>
              <h2 scPopoverNextTitle>Not modal</h2>
              <p scPopoverNextDescription>Tab through it, then press Escape.</p>
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
      <div scPopoverNextProvider [modal]="'trap-focus'">
        <button scButton scPopoverNextTrigger variant="outline">
          Trap focus
        </button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-64">
            <div scPopoverNextHeader>
              <h2 scPopoverNextTitle>Trap focus</h2>
              <p scPopoverNextDescription>Tab through it, then press Escape.</p>
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
      <div scPopoverNextProvider [modal]="true">
        <button scButton scPopoverNextTrigger variant="outline">Modal</button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-64">
            <div scPopoverNextHeader>
              <h2 scPopoverNextTitle>Modal</h2>
              <p scPopoverNextDescription>Tab through it, then press Escape.</p>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ModalPopoverNextDemo {}
