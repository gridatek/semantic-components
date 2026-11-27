import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { TypesetUsageDemo } from './typeset-usage-demo';

@Component({
  selector: 'app-typeset-usage-demo-container',
  imports: [UsageCode, TypesetUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-typeset-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TypesetUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';

/** Rendered content in a typeset container: plain elements, no directives. */
@Component({
  selector: 'app-typeset-usage-demo',
  template: \`
    <article class="typeset max-w-prose">
      <h2>The Joke Tax</h2>
      <p>
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne. One day, his advisors came to him
        with a problem: the kingdom was running out of money.
      </p>
      <h3>The King's Plan</h3>
      <p>
        The king thought long and hard, and finally came up with
        <a href="/docs/guides/typeset">a brilliant plan</a>: he would tax the
        jokes in the kingdom. The tax was <strong>one gold coin</strong> per
        joke, collected by <code>jokeTax()</code>.
      </p>
      <blockquote>
        “After all,” he said, “everyone enjoys a good joke, so it’s only fair
        that they should pay for the privilege.”
      </blockquote>
      <ul>
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners: 20 gold coins</li>
      </ul>
      <p>
        As a result, people stopped telling jokes, and the kingdom fell into a
        gloom.
      </p>
    </article>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TypesetUsageDemo {}`;
}
