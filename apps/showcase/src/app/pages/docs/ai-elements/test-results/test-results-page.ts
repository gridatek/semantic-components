import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { RtlTestResultsDemoContainer } from './demos/rtl-test-results-demo-container';
import { SuitesTestResultsDemoContainer } from './demos/suites-test-results-demo-container';
import { TestResultsUsageDemoContainer } from './demos/test-results-usage-demo-container';

/** shadcn's Test Results pattern: a test run, its suites and failures. */
@Component({
  selector: 'app-test-results-page',
  imports: [
    Anatomy,
    RouterLink,
    RtlTestResultsDemoContainer,
    ScHeading,
    ScLink,
    SuitesTestResultsDemoContainer,
    TestResultsUsageDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Test Results</h1>
        <p class="text-muted-foreground">
          A test run by the agent. The summary line counts what passed and
          failed; open it to see each suite, its tests, and the error for each
          failure.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-test-results-usage-demo-container />
        <p class="text-muted-foreground">
          A <a scLink routerLink="/docs/components/trace">Trace</a> with a
          collapsible line for the run and for each suite; a failed test opens
          on its error, in a
          <a scLink routerLink="/docs/components/code-block">Code Block</a>.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <div class="space-y-4">
          <p class="text-muted-foreground">
            Tests grouped by file: each suite a collapsible line with its tests,
            the suites with a failure open.
          </p>
          <app-suites-test-results-demo-container />
        </div>
        <app-rtl-test-results-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the
          <a scLink routerLink="/docs/components/trace" fragment="api-reference"
            >Trace</a
          >
          and the
          <a scLink routerLink="/docs/components/code-block">Code Block</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TestResultsPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScTrace, ScTraceLine, ScTraceIcon, ScTraceTitle,',
      '  ScTraceCollapsible, ScTraceCollapsibleTrigger, ScTraceCollapsiblePanelContent,',
      '  ScCollapsible, ScCollapsibleTrigger, ScCollapsiblePanel,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTrace>',
      '  <div scCollapsible scTraceCollapsible>',
      '    <button scCollapsibleTrigger scTraceCollapsibleTrigger>',
      '      <span scTraceLine status="error">',
      '        <span scTraceIcon><svg siFlaskConicalIcon></svg></span>',
      '        <span scTraceTitle>Ran 2 tests, 1 failed</span>',
      '      </span>',
      '    </button>',
      '    <div scCollapsiblePanel>',
      '      <div scTraceCollapsiblePanelContent>',
      '        <div scTrace>',
      '          <span scTraceLine>… creates a user</span>',
      '          <div scCollapsible scTraceCollapsible>… updates a user profile …</div>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
