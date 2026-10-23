import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/code';
import { ScHeading, ScLink, ScSeparator } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { PackageManagerInstall } from '../../components/package-manager-install/package-manager-install';
import { TocHeading } from '../../components/toc/toc-heading';
import { ButtonUsageDemoContainer } from '../docs/button/demos/button-usage-demo-container';

@Component({
  selector: 'app-ui-page',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    RouterLink,
    TocHeading,
    SiCheckIcon,
    SiCopyIcon,
    ScSeparator,
    ScLink,
    ScHeading,
    PackageManagerInstall,
    ButtonUsageDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>UI</h1>
        <p class="text-muted-foreground">
          Install and configure the
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/ui</code
          >
          package.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>1. Install the packages</h2>
        <p class="text-muted-foreground">
          The components, and their classes in shadcn's styles (the presets):
        </p>
        <app-package-manager-install
          packages="@semantic-components/ui @semantic-components/preset-styles"
        />
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>2. Configure styles</h2>
        <p class="text-muted-foreground">
          As in shadcn/ui, the theme is your app's: its
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code>
          imports the Angular CDK overlay's styles (first: a
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">url()</code>
          import), Tailwind, tw-animate-css and shadcn's utilities, then the
          library's styles:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>css</div>
            <div scCodeBlockActions>
              <button
                [scCodeBlockCopy]="stylesImportsCode"
                #copy2="scCodeBlockCopy"
              >
                @if (copy2.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre
            scCodeBlockContent
            [code]="stylesImportsCode"
            language="css"
          ></pre>
        </div>

        <p class="text-muted-foreground">
          Below them, add a shadcn theme — its design tokens: colors, radius,
          fonts. Take it from the manual installation guide, or from any shadcn
          theme:
        </p>
        <a
          scLink
          variant="outline"
          href="https://ui.shadcn.com/docs/installation/manual#configure-styles"
          target="_blank"
          rel="noopener noreferrer"
        >
          shadcn/ui - Manual Installation (Configure styles)
        </a>
        <p class="text-muted-foreground">
          Then add what shadcn's theme does not have: the toast's success and
          warning colors, and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >interpolate-size</code
          >
          so collapsibles can animate their height:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>css</div>
            <div scCodeBlockActions>
              <button
                [scCodeBlockCopy]="stylesTokensCode"
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
          <pre
            scCodeBlockContent
            [code]="stylesTokensCode"
            language="css"
          ></pre>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>Optional: Preset color schemes</h2>
        <p class="text-muted-foreground">
          The UI library ships a small set of opt-in color schemes (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >red</code
          >, <code class="bg-muted rounded px-1.5 py-0.5 text-sm">rose</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">orange</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">green</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">blue</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">yellow</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">violet</code>)
          that override
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">--primary</code>
          and related tokens. Import them in addition to the default styles:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>css</div>
            <div scCodeBlockActions>
              <button
                [scCodeBlockCopy]="colorSchemesCode"
                #copyColorSchemes="scCodeBlockCopy"
              >
                @if (copyColorSchemes.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre
            scCodeBlockContent
            [code]="colorSchemesCode"
            language="css"
          ></pre>
        </div>
        <p class="text-muted-foreground">
          Activate a scheme at runtime via
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >ScThemeManager.setColorScheme('blue')</code
          >, or statically by setting
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >data-theme="blue"</code
          >
          on
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&lt;html&gt;</code
          >. Try them live on the
          <a scLink variant="link" routerLink="/customize">Customize page</a>
          .
        </p>
        <p class="text-muted-foreground">
          Use the shipped file as-is, or drop it and author your own — any CSS
          rule matching
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >[data-theme='my-scheme']</code
          >
          (and its
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >[data-theme='my-scheme'].dark</code
          >
          variant) that overrides the token variables will work the same way.
          This lets you add new palettes (e.g.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">teal</code>) or
          customize tokens beyond
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">--primary</code>
          without forking the library.
        </p>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>3. Configure Tailwind source</h2>
        <p class="text-muted-foreground">
          Add the library and your preset as Tailwind sources so their classes
          are included in the build — the preset's file only, so Tailwind scans
          that one preset. Add this to your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code
          >:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>css</div>
            <div scCodeBlockActions>
              <button [scCodeBlockCopy]="sourceCode" #copy4="scCodeBlockCopy">
                @if (copy4.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre scCodeBlockContent [code]="sourceCode" language="css"></pre>
        </div>
        <p class="text-muted-foreground text-sm">
          Adjust the path to
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >node_modules</code
          >
          based on your project structure.
        </p>
        <p class="text-muted-foreground">
          The components use nova. For another preset, give it when the app
          starts, and point the second
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;source</code
          >
          at its file (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >…-preset-styles-lyra.mjs</code
          >):
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>ts</div>
            <div scCodeBlockActions>
              <button [scCodeBlockCopy]="presetCode" #copy5="scCodeBlockCopy">
                @if (copy5.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre
            scCodeBlockContent
            [code]="presetCode"
            language="typescript"
          ></pre>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <p class="text-muted-foreground">
          Import and use components in your Angular templates:
        </p>
        <app-button-usage-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class UiPage {
  readonly stylesImportsCode = `@import url("@angular/cdk/overlay-prebuilt.css");
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@semantic-components/ui/styles";`;

  readonly stylesTokensCode = `@theme inline {
  --color-success: var(--success);
  --color-warning: var(--warning);
}

:root {
  --success: oklch(0.49 0.14 150);
  --warning: oklch(0.52 0.15 49);
}

.dark {
  --success: oklch(0.792 0.209 151.711);
  --warning: oklch(0.828 0.189 84.429);
}

@layer base {
  * {
    interpolate-size: allow-keywords;
  }
}`;

  readonly sourceCode = `@source "../node_modules/@semantic-components/ui";
@source "../node_modules/@semantic-components/preset-styles/fesm2022/semantic-components-preset-styles-nova.mjs";`;

  readonly presetCode = `import { lyra } from '@semantic-components/preset-styles/lyra';
import { provideScConfig } from '@semantic-components/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideScConfig({ preset: lyra })],
};`;

  readonly colorSchemesCode =
    '@import "@semantic-components/ui/styles/color-schemes.css";';
}
