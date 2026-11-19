import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { PackageManagerInstall } from '../../components/package-manager-install/package-manager-install';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-prerequisites-page',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    TocHeading,
    SiCheckIcon,
    SiCopyIcon,
    ScTypeset,
    PackageManagerInstall,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Prerequisites</h1>
        <p class="text-muted-foreground">
          Common dependencies required by all Semantic Components packages.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>1. Install Angular Aria and CDK</h2>
        <p>Semantic Components depends on Angular Aria and Angular CDK.</p>
        <app-package-manager-install packages="@angular/aria @angular/cdk" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>2. Set up Tailwind CSS</h2>
        <p>
          Tailwind CSS v4 is required. Follow these steps if not already
          installed:
        </p>

        <div class="space-y-4 pl-4">
          <div class="space-y-3">
            <h3 class="text-lg font-medium tracking-tight">
              2.1 Install Tailwind CSS
            </h3>
            <p>
              Next, open a terminal in your Angular project's root directory and
              run the following command to install Tailwind CSS and its peer
              dependencies:
            </p>
            <app-package-manager-install
              packages="tailwindcss @tailwindcss/postcss postcss"
            />
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-medium tracking-tight">
              2.2 Configure PostCSS Plugins
            </h3>
            <p>
              Next, add a
              <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
                >.postcssrc.json</code
              >
              file in the file root of the project. Add the
              <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
                >&#64;tailwindcss/postcss</code
              >
              plugin into your PostCSS configuration.
            </p>
            <div scCodeBlock>
              <div scCodeBlockHeader>
                <div scCodeBlockTitle>.postcssrc.json</div>
                <div scCodeBlockActions>
                  <button
                    [scCodeBlockCopy]="step3aCode"
                    #copy3="scCodeBlockCopy"
                  >
                    @if (copy3.copied()) {
                      <svg siCheckIcon></svg>
                    } @else {
                      <svg siCopyIcon></svg>
                    }
                    <span class="sr-only">Copy to clipboard</span>
                  </button>
                </div>
              </div>
              <pre scCodeBlockContent [code]="step3aCode" language="json"></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>3. Install utilities</h2>
        <p>
          Install the required utility libraries for class management and
          animations.
        </p>
        <app-package-manager-install
          packages="shadcn class-variance-authority cn tw-animate-css"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>4. Install the font</h2>
        <p>The theme's font is Geist, as in shadcn/ui:</p>
        <app-package-manager-install packages="@fontsource-variable/geist" />
        <p>
          Your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code>
          imports it (it's in the file to copy, UI › Configure styles):
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;import '&#64;fontsource-variable/geist';</code
          >
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>5. Install icons</h2>
        <p>
          The examples use
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-icons/lucide-icons</code
          >
          — install it to copy them as they are.
        </p>
        <app-package-manager-install packages="@semantic-icons/lucide-icons" />
        <p>
          The components themselves draw no icons: they're in your templates, so
          you can swap them for any library.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>6. Polyfill Temporal</h2>
        <p>
          The date components use the browser's
          <a
            href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Temporal"
            target="_blank"
            rel="noopener noreferrer"
            class="text-foreground underline underline-offset-4"
          >
            Temporal API</a
          >. Until every browser has it (Safari doesn't yet), add a polyfill to
          your app: it fills in the global only where it's missing.
        </p>
        <app-package-manager-install packages="temporal-polyfill" />
        <p>
          Then list it in your build's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">polyfills</code>
          (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >angular.json</code
          >):
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >"polyfills": ["temporal-polyfill/global"]</code
          >. Once all browsers ship Temporal, remove both — your code stays as
          it is.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PrerequisitesPage {
  private readonly step3aCode = `{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}`;
}
