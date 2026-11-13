import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { TestResultsUsageDemo } from './test-results-usage-demo';

@Component({
  selector: 'app-test-results-usage-demo-container',
  imports: [DemoContainer, TestResultsUsageDemo],
  template: `
    <app-demo-container
      title="Test Results"
      demoUrl="/demos/ai-elements/test-results-usage-demo"
      [code]="code"
    >
      <app-test-results-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TestResultsUsageDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScMessage,
  ScMessageContent,
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

interface Suite {
  name: string;
  tests: Test[];
}

const SUITES: Suite[] = [
  {
    name: 'cart.test.ts',
    tests: [
      { name: 'adds an item', status: 'passed' },
      { name: 'removes an item', status: 'passed' },
      { name: 'applies a discount code', status: 'passed' },
    ],
  },
  {
    name: 'payment.test.ts',
    tests: [
      { name: 'charges the saved card', status: 'passed' },
      {
        name: 'retries a declined card',
        status: 'failed',
        error:
          'Expected 2 charge attempts, received 1\\n\\n  at Object.<anonymous> (src/payment.test.ts:58:22)',
      },
    ],
  },
];

function failed(tests: Test[]): number {
  return tests.filter((test) => test.status === 'failed').length;
}

/** "5 tests, 1 failed, 1 skipped". */
function counts(tests: Test[]): string {
  const skipped = tests.filter((test) => test.status === 'skipped').length;
  return [
    \`\${tests.length} tests\`,
    failed(tests) > 0 && \`\${failed(tests)} failed\`,
    skipped > 0 && \`\${skipped} skipped\`,
  ]
    .filter(Boolean)
    .join(', ');
}

/** A test run: the summary counts, the suites inside, each failure open on its error. */
@Component({
  selector: 'app-test-results-usage-demo',
  imports: [
    NgTemplateOutlet,
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScCodeBlock,
    ScCodeBlockContent,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScMessage,
    ScMessageContent,
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
  template: \`
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>Run the checkout tests.</div>
          </div>
        </div>
      </div>

      @if (state()) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <div scTrace aria-live="polite">
              @if (state() === 'running') {
                <span scTraceLine status="running">
                  <span scTraceIcon><svg siFlaskConicalIcon></svg></span>
                  <span scTraceTitle>Running pnpm test checkout</span>
                </span>
              } @else {
                <div
                  scCollapsible
                  scTraceCollapsible
                  [open]="failed(allTests) > 0"
                >
                  <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                    <span
                      scTraceLine
                      [status]="failed(allTests) > 0 ? 'error' : undefined"
                    >
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
                            <button
                              scCollapsibleTrigger
                              scTraceCollapsibleTrigger
                            >
                              <span
                                scTraceLine
                                [status]="
                                  failed(suite.tests) > 0 ? 'error' : undefined
                                "
                              >
                                <span scTraceIcon
                                  ><svg siFileCodeIcon></svg
                                ></span>
                                <span scTraceTitle
                                  >{{ suite.name }},
                                  {{ counts(suite.tests) }}</span
                                >
                              </span>
                            </button>
                            <div scCollapsiblePanel>
                              <div scTraceCollapsiblePanelContent>
                                <div scTrace>
                                  @for (test of suite.tests; track test.name) {
                                    <ng-container
                                      [ngTemplateOutlet]="row"
                                      [ngTemplateOutletContext]="{
                                        $implicit: test,
                                      }"
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
              }
            </div>
            @if (reply()) {
              <p>{{ reply() }}</p>
            }
          </div>
        </div>
      }

      @if (!busy()) {
        <button
          scButton
          variant="outline"
          size="sm"
          class="mt-auto self-start"
          (click)="replay()"
        >
          Replay
        </button>
      }
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TestResultsUsageDemo {
  protected readonly suites = SUITES;
  protected readonly allTests = SUITES.flatMap((suite) => suite.tests);
  protected readonly failed = failed;
  protected readonly counts = counts;
  private readonly answer =
    'One test failed. The payment client does not retry a declined card, so the second charge attempt never happens.';

  protected readonly state = signal<'running' | 'ran' | null>('ran');
  protected readonly reply = signal(this.answer);
  protected readonly busy = signal(false);
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected replay(): void {
    this.stop();
    this.state.set(null);
    this.reply.set('');
    this.busy.set(true);
    this.at(300, () => this.state.set('running'));
    this.at(1800, () => this.state.set('ran'));
    let time = 2000;
    const words = this.answer.split(' ');
    words.forEach((_, i) => {
      time += 40;
      this.at(time, () => this.reply.set(words.slice(0, i + 1).join(' ')));
    });
    this.at(time, () => this.busy.set(false));
  }

  private at(time: number, run: () => void): void {
    this.timers.push(setTimeout(run, time));
  }

  private stop(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}`;
}
