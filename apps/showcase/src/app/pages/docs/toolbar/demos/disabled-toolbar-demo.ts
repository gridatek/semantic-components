import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScToolbar, ScToolbarWidget } from '@semantic-components/ui';

/** A disabled widget stays reachable by the arrows (softDisabled), announced as disabled; a press does nothing. */
@Component({
  selector: 'app-disabled-toolbar-demo',
  imports: [ScButton, ScToolbar, ScToolbarWidget],
  template: `
    <div scToolbar aria-label="Document">
      <button scToolbarWidget scButton variant="ghost" size="sm">Save</button>
      <button
        scToolbarWidget
        scButton
        variant="ghost"
        size="sm"
        softDisabled
        disabled
      >
        Publish
      </button>
      <button scToolbarWidget scButton variant="ghost" size="sm">Share</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledToolbarDemo {}
