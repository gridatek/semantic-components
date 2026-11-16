import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TableTypesetDemo } from './table-typeset-demo';

@Component({
  selector: 'app-table-typeset-demo-container',
  imports: [DemoContainer, TableTypesetDemo],
  template: `
    <app-demo-container
      title="Wide table"
      demoUrl="/demos/typeset/table-typeset-demo"
      [code]="code"
    >
      <app-table-typeset-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TableTypesetDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';

/**
 * A wide table in \`typeset-scroll\`: it scrolls across in its own box, the
 * page doesn't. Reached and scrolled by the keyboard: a named region.
 */
@Component({
  selector: 'app-table-typeset-demo',
  template: \`
    <article class="typeset w-full max-w-prose">
      <p>The king's treasury, joke by joke:</p>
      <div
        class="typeset-scroll"
        tabindex="0"
        role="region"
        aria-label="The treasury"
      >
        <table>
          <thead>
            <tr>
              <th>King's Treasury</th>
              <th>People's happiness</th>
              <th>Jokes told</th>
              <th>Coins collected</th>
              <th>Month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Empty</td>
              <td>Overflowing</td>
              <td>1,204</td>
              <td>0</td>
              <td>January</td>
            </tr>
            <tr>
              <td>Modest</td>
              <td>Satisfied</td>
              <td>806</td>
              <td>4,030</td>
              <td>February</td>
            </tr>
            <tr>
              <td>Full</td>
              <td>Ecstatic</td>
              <td>12</td>
              <td>240</td>
              <td>March</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TableTypesetDemo {}`;
}
