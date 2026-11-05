import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DialogTraceDemo } from './dialog-trace-demo';

@Component({
  selector: 'app-dialog-trace-demo-container',
  imports: [DemoContainer, DialogTraceDemo],
  template: `
    <app-demo-container
      title="Dialog"
      demoUrl="/demos/trace/dialog-trace-demo"
      [code]="code"
    >
      <app-dialog-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DialogTraceDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScDialog,
  ScDialogDescription,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
  ScTrace,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiArrowUpRightIcon,
  SiChevronRightIcon,
  SiGlobeIcon,
} from '@semantic-icons/lucide-icons';

/** A line in a dialog’s trigger: the dialog owns its state, Escape and focus. */
@Component({
  selector: 'app-dialog-trace-demo',
  imports: [
    ScDialog,
    ScDialogDescription,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScDialogTrigger,
    ScTrace,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiGlobeIcon,
    SiChevronRightIcon,
    SiArrowUpRightIcon,
  ],
  template: \`
    <div scTrace class="max-w-sm">
      <div scDialogProvider>
        <button scDialogTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siGlobeIcon></svg></span>
            <span scTraceTitle>Searched the web for cache keys</span>
            <span scTraceIcon><svg siChevronRightIcon></svg></span>
          </span>
        </button>
        <ng-template scDialogPortal>
          <div scDialog>
            <div scDialogHeader>
              <h2 scDialogTitle>Searched the web for cache keys</h2>
              <p scDialogDescription>
                Three results were used in the response.
              </p>
            </div>
            <div scTrace>
              <a
                href="https://angular.dev/guide/signals"
                target="_blank"
                rel="noopener"
              >
                <span scTraceLine>
                  <span scTraceIcon><svg siGlobeIcon></svg></span>
                  <span scTraceTitle
                    >Signals guide<span class="sr-only">
                      (opens in a new tab)</span
                    ></span
                  >
                  <span scTraceIcon><svg siArrowUpRightIcon></svg></span>
                </span>
              </a>
              <a
                href="https://angular.dev/guide/forms/signals/overview"
                target="_blank"
                rel="noopener"
              >
                <span scTraceLine>
                  <span scTraceIcon><svg siGlobeIcon></svg></span>
                  <span scTraceTitle
                    >Signal Forms overview<span class="sr-only">
                      (opens in a new tab)</span
                    ></span
                  >
                  <span scTraceIcon><svg siArrowUpRightIcon></svg></span>
                </span>
              </a>
              <a
                href="https://tailwindcss.com/docs/transition-property"
                target="_blank"
                rel="noopener"
              >
                <span scTraceLine>
                  <span scTraceIcon><svg siGlobeIcon></svg></span>
                  <span scTraceTitle
                    >Tailwind transitions<span class="sr-only">
                      (opens in a new tab)</span
                    ></span
                  >
                  <span scTraceIcon><svg siArrowUpRightIcon></svg></span>
                </span>
              </a>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DialogTraceDemo {}`;
}
