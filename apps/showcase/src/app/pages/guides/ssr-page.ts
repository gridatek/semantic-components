import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { DocCode } from '../../components/doc-code/doc-code';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-ssr-page',
  imports: [DocCode, ScTypeset, TocHeading],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Server-side rendering</h1>
        <p class="text-muted-foreground">
          The components render on the server and hydrate in the browser without
          a mismatch: Angular SSR, prerendered or per request, works as it is.
          The user&apos;s choices — theme, sidebar, language — are cookies, so
          the server draws the page as they left it.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Nothing to set up</h2>
        <p>
          Add Angular&apos;s SSR to your app as usual (<code scTypeset
            >ng add &#64;angular/ssr</code
          >); the library needs nothing more. No part touches a browser global —
          window, document, localStorage, matchMedia, observers, sizes — as it
          is created: those wait for the browser (after the first render, in an
          event), so the server renders every part and its markup, and the
          browser takes it over.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The same page on both sides</h2>
        <p>
          Hydration keeps the server&apos;s HTML, so what changes classes or
          markup must be known to the server too. The choices the library keeps
          — the mode and the theme, the sidebar open or closed, the language —
          are cookies (with a localStorage copy for where cookies aren&apos;t
          kept), read from the request on the server: a dark page is drawn dark
          from the first paint, with no flash. Keep your own choices the same
          way.
        </p>
        <app-doc-code [code]="storageCode" />
        <p>
          A prerendered page has no request: it is drawn with the defaults, and
          the browser applies the choices as it starts. The mode and the theme
          don&apos;t wait for it: a small script in the page&apos;s head sets
          them before the first paint — the system&apos;s mode, which only the
          browser knows, included.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Allowed hosts</h2>
        <p>
          Angular&apos;s server answers only the hosts you list (its protection
          against server-side request forgery): add your domains to the
          build&apos;s
          <code scTypeset>security.allowedHosts</code>, or every page answers
          400.
        </p>
        <app-doc-code [code]="hostsCode" language="json" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Checking</h2>
        <p>
          Build and serve the server build, and watch the browser&apos;s
          console: a hydration mismatch shows as an NG05xx message in
          development. The library&apos;s own components are tested this way —
          every demo rendered on the server, then hydrated.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SsrPage {
  private readonly storageCode = `import { ScStorage } from '@semantic-components/ui';

const storage = inject(ScStorage);
storage.get('my-app-density'); // the request's cookie on the server; the browser's otherwise
storage.set('my-app-density', 'compact'); // a cookie for a year, and its localStorage copy`;

  private readonly hostsCode = `"security": {
  "allowedHosts": ["example.com", "*.example.com"]
}`;
}
