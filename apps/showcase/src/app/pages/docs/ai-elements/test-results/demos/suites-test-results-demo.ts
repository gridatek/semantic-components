import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';
import {
  SiCheckIcon,
  SiCircleDashedIcon,
  SiFileCodeIcon,
  SiFlaskConicalIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

interface Test {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  error?: string;
}

const SUITES: { name: string; tests: Test[] }[] = [
  {
    name: 'auth.test.ts',
    tests: [
      { name: 'logs in with valid credentials', status: 'passed' },
      { name: 'rejects an invalid password', status: 'passed' },
      { name: 'refreshes an expired token', status: 'passed' },
    ],
  },
  {
    name: 'user-api.test.ts',
    tests: [
      { name: 'creates a user', status: 'passed' },
      {
        name: 'updates a user profile',
        status: 'failed',
        error:
          'Expected status 200, received 500\n\n  at Object.<anonymous> (src/user-api.test.ts:45:12)',
      },
      { name: 'deletes a user', status: 'skipped' },
    ],
  },
  {
    name: 'db.test.ts',
    tests: [
      { name: 'connects to the database', status: 'passed' },
      {
        name: 'times out a slow query',
        status: 'failed',
        error:
          'Exceeded timeout of 5000 ms for a test.\n\n  at Object.<anonymous> (src/db.test.ts:22:3)',
      },
    ],
  },
];

function failed(tests: Test[]): number {
  return tests.filter((test) => test.status === 'failed').length;
}

function counts(tests: Test[]): string {
  const skipped = tests.filter((test) => test.status === 'skipped').length;
  return [
    `${tests.length} tests`,
    failed(tests) > 0 && `${failed(tests)} failed`,
    skipped > 0 && `${skipped} skipped`,
  ]
    .filter(Boolean)
    .join(', ');
}

/** Tests grouped by file: a suite each, the ones with a failure open. */
@Component({
  selector: 'app-suites-test-results-demo',
  imports: [
    NgTemplateOutlet,
    ScCodeBlock,
    ScCodeBlockContent,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCheckIcon,
    SiCircleDashedIcon,
    SiFileCodeIcon,
    SiFlaskConicalIcon,
    SiXIcon,
  ],
  template: `
    <div scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="error">
            <span scTraceIcon><svg siFlaskConicalIcon></svg></span>
            <span scTraceTitle>Ran {{ counts(allTests) }}</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              @for (suite of suites; track suite.name) {
                <div
                  scCollapsible
                  scTraceCollapsible
                  [open]="failed(suite.tests) > 0"
                >
                  <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                    <span
                      scTraceLine
                      [status]="failed(suite.tests) > 0 ? 'error' : undefined"
                    >
                      <span scTraceIcon><svg siFileCodeIcon></svg></span>
                      <span scTraceTitle
                        >{{ suite.name }}, {{ counts(suite.tests) }}</span
                      >
                    </span>
                  </button>
                  <div scCollapsiblePanel>
                    <div scTraceCollapsiblePanelContent>
                      <div scTrace>
                        @for (test of suite.tests; track test.name) {
                          <ng-container
                            [ngTemplateOutlet]="row"
                            [ngTemplateOutletContext]="{ $implicit: test }"
                          />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    <ng-template #row let-test>
      @if (test.status === 'failed') {
        <div scCollapsible scTraceCollapsible [open]="true">
          <button scCollapsibleTrigger scTraceCollapsibleTrigger>
            <span scTraceLine status="error">
              <span scTraceIcon><svg siXIcon></svg></span>
              <span scTraceTitle>{{ test.name }}</span>
            </span>
          </button>
          <div scCollapsiblePanel>
            <div scTraceCollapsiblePanelContent>
              <div scCodeBlock size="sm">
                <pre
                  scCodeBlockContent
                  wrap
                  class="max-h-64"
                  [code]="test.error"
                ></pre>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <span scTraceLine>
          <span scTraceIcon>
            @if (test.status === 'skipped') {
              <svg siCircleDashedIcon></svg>
            } @else {
              <svg siCheckIcon></svg>
            }
          </span>
          <span scTraceTitle>{{
            test.status === 'skipped' ? 'Skipped ' + test.name : test.name
          }}</span>
        </span>
      }
    </ng-template>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SuitesTestResultsDemo {
  protected readonly suites = SUITES;
  protected readonly allTests = SUITES.flatMap((suite) => suite.tests);
  protected readonly failed = failed;
  protected readonly counts = counts;
}
