import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { SearchResultsChainOfThoughtDemo } from './search-results-chain-of-thought-demo';

@Component({
  selector: 'app-search-results-chain-of-thought-demo-container',
  imports: [DemoContainer, SearchResultsChainOfThoughtDemo],
  template: `
    <app-demo-container
      title="Search results"
      demoUrl="/demos/ai-elements/search-results-chain-of-thought-demo"
      [code]="code"
    >
      <app-search-results-chain-of-thought-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SearchResultsChainOfThoughtDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
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
import { SiCircleCheckIcon } from '@semantic-icons/lucide-icons';

/** A web search's results: a badge for each hostname, in the step's content. */
@Component({
  selector: 'app-search-results-chain-of-thought-demo',
  imports: [
    ScBadge,
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
    SiCircleCheckIcon,
  ],
  template: \`
    <div scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siCircleCheckIcon></svg></span>
            <span scTraceTitle
              >Searched the web for next.js image cache key</span
            >
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent class="flex flex-wrap gap-1.5">
            @for (url of results; track url) {
              <span scBadge variant="secondary">{{ hostname(url) }}</span>
            }
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SearchResultsChainOfThoughtDemo {
  protected readonly results = [
    'https://nextjs.org/docs/app/api-reference/components/image',
    'https://vercel.com/docs/deployments/troubleshoot-a-build',
    'https://github.com/vercel/next.js/discussions',
  ];

  protected hostname(url: string): string {
    return new URL(url).hostname;
  }
}`;
}
