import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { InlineCitationUsageDemo } from './inline-citation-usage-demo';

@Component({
  selector: 'app-inline-citation-usage-demo-container',
  imports: [DemoContainer, InlineCitationUsageDemo],
  template: `
    <app-demo-container
      title="Inline Citation"
      demoUrl="/demos/ai-elements/inline-citation-usage-demo"
      [code]="code"
    >
      <app-inline-citation-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineCitationUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScLink,
  ScPreviewCard,
  ScPreviewCardPortal,
  ScPreviewCardProvider,
  ScPreviewCardTrigger,
} from '@semantic-components/ui';

interface Source {
  url: string;
  title: string;
  description: string;
}

const sources = {
  streaming: {
    url: 'https://nextjs.org/docs/app/getting-started/linking-and-navigating#streaming',
    title: 'Linking and Navigating',
    description: 'How the App Router streams a route to the browser.',
  },
  suspense: {
    url: 'https://react.dev/reference/react/Suspense',
    title: '<Suspense>',
    description: 'Display a fallback until its children have finished loading.',
  },
  serverComponents: {
    url: 'https://react.dev/reference/rsc/server-components',
    title: 'Server Components',
    description: 'Components that render ahead of time, on the server.',
  },
  loading: {
    url: 'https://nextjs.org/docs/app/api-reference/file-conventions/loading',
    title: 'loading.js',
    description: 'Show an instant loading state for a route segment.',
  },
  chunked: {
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Transfer-Encoding',
    title: 'Transfer-Encoding',
    description: 'Send a response as a series of chunks.',
  },
} satisfies Record<string, Source>;

/**
 * A source in the sentence: a link to it, its hostname in a small button look;
 * hovering or focusing it previews the page.
 */
@Component({
  selector: 'app-citation',
  imports: [
    ScLink,
    ScPreviewCard,
    ScPreviewCardPortal,
    ScPreviewCardProvider,
    ScPreviewCardTrigger,
  ],
  template: \`
    <div scPreviewCardProvider class="inline">
      <a
        scLink
        scPreviewCardTrigger
        variant="secondary"
        size="xs"
        target="_blank"
        rel="noreferrer"
        [href]="source().url"
        [delay]="10"
        [closeDelay]="100"
      >
        {{ host() }}
        <span class="sr-only">: {{ source().title }} (opens in a new tab)</span>
      </a>
      <ng-template scPreviewCardPortal>
        <div scPreviewCard class="flex w-64 flex-col gap-1">
          <div class="font-medium">{{ source().title }}</div>
          <p class="text-muted-foreground">{{ source().description }}</p>
          <span class="text-muted-foreground text-xs">{{ host() }}</span>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class Citation {
  readonly source = input.required<Source>();
  protected readonly host = computed(() =>
    new URL(this.source().url).hostname.replace(/^www\\./, ''),
  );
}

/** Sources in the sentences they support. */
@Component({
  selector: 'app-inline-citation-usage-demo',
  imports: [Citation],
  template: \`
    <div
      class="mx-auto flex max-w-sm flex-col gap-3 py-6 text-sm leading-relaxed"
    >
      <div>
        Next.js streams a route in chunks, so the page shows up before every
        request finishes.
        <app-citation [source]="sources.streaming" />
      </div>
      <div>
        Wrap a slow part of the page in a Suspense boundary and React sends the
        fallback first. When the data resolves, the finished HTML streams into
        the same response and replaces the fallback, with no extra request from
        the browser.
        <app-citation [source]="sources.suspense" />
        Server Components help here, because their code never ships to the
        browser.
        <app-citation [source]="sources.serverComponents" />
      </div>
      <div>
        A loading.tsx file does the same for a whole route segment.
        <app-citation [source]="sources.loading" />
        It all runs over chunked transfer encoding, so there is nothing extra to
        set up.
        <app-citation [source]="sources.chunked" />
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineCitationUsageDemo {
  protected readonly sources = sources;
}`;
}
