import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScField, ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-inline-input-demo',
  imports: [ScButton, ScField, ScInput],
  template: `
    <div scField orientation="horizontal" class="w-full max-w-sm">
      <input
        scInput
        type="search"
        placeholder="Search..."
        aria-label="Search"
      />
      <button scButton>Search</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineInputDemo {}
