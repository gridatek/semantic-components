import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';

@Component({
  selector: 'app-headings-typeset-demo',
  imports: [ScTypeset],
  template: `
    <div class="space-y-4">
      <h1 scTypeset>This is an H1 Heading</h1>
      <h2 scTypeset>This is an H2 Heading</h2>
      <h3 scTypeset>This is an H3 Heading</h3>
      <h4 scTypeset>This is an H4 Heading</h4>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HeadingsTypesetDemo {}
