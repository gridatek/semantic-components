import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
} from '@semantic-components/ui';

/** A control of your own joins the group by carrying `data-slot="control"`. */
@Component({
  selector: 'app-custom-input-group-demo',
  imports: [ScInputGroup, ScInputGroupAddon, ScInputGroupButton],
  template: `
    <div scInputGroup class="max-w-sm">
      <textarea
        data-slot="control"
        aria-label="Message"
        placeholder="Autoresize textarea..."
        class="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base outline-none md:text-sm"
      ></textarea>
      <div scInputGroupAddon align="block-end">
        <button scInputGroupButton variant="default" size="sm" class="ms-auto">
          Submit
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomInputGroupDemo {}
