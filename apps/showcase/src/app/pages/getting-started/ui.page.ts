import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { ScLink, ScSeparator } from '@semantic-components/ui';
import { ScHeading } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { PackageManagerInstall } from '../../components/package-manager-install/package-manager-install';
import { TocHeading } from '../../components/toc/toc-heading';
import { ButtonUsageDemoContainer } from '../docs/button/demos/button-usage-demo-container';

@Component({
  selector: 'app-ui-page',
  imports: [
    RouterLink,
    TocHeading,
    ScCodeViewer,
    ScCodeViewerContent,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScButton,
    ScCopyToClipboard,
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
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            &#64;semantic-components/ui
          </code>
          package.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>1. Install the package</h2>
        <app-package-manager-install packages="@semantic-components/ui" />
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>2. Configure styles</h2>
        <p class="text-muted-foreground">
          Set up the theme styles for your project. Pick one of the two options
          below.
        </p>

        <h3 class="text-lg font-medium">Option A: Default theme</h3>
        <p class="text-muted-foreground">
          Import the pre-built styles in your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code>
          . This includes the default shadcn theme and Angular CDK styles.
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="stylesDefaultCode"
              #copy2="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copy2.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div
            scCodeViewerContent
            [code]="stylesDefaultCode"
            language="css"
          ></div>
        </div>

        <h3 class="text-lg font-medium">Option B: Custom theme</h3>
        <p class="text-muted-foreground">
          For full control over colors, border radius, and other design tokens,
          copy the CSS variables from the shadcn/ui manual installation guide
          into your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code>
          :
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
          You also need to import the Angular CDK overlay styles manually:
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="stylesCustomCdkCode"
              #copy3="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copy3.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div
            scCodeViewerContent
            [code]="stylesCustomCdkCode"
            language="css"
          ></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>Optional: Preset color schemes</h2>
        <p class="text-muted-foreground">
          The UI library ships a small set of opt-in color schemes (
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">red</code>
          ,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">rose</code>
          ,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">orange</code>
          ,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">green</code>
          ,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">blue</code>
          ,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">yellow</code>
          ,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">violet</code>
          ) that override
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">--primary</code>
          and related tokens. Import them in addition to the default styles:
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="colorSchemesCode"
              #copyColorSchemes="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copyColorSchemes.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div
            scCodeViewerContent
            [code]="colorSchemesCode"
            language="css"
          ></div>
        </div>
        <p class="text-muted-foreground">
          Activate a scheme at runtime via
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            ScThemeManager.setColorScheme('blue')
          </code>
          , or statically by setting
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            data-theme="blue"
          </code>
          on
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            &lt;html&gt;
          </code>
          . Try them live on the
          <a scLink variant="link" routerLink="/customize">Customize page</a>
          .
        </p>
        <p class="text-muted-foreground">
          Use the shipped file as-is, or drop it and author your own — any CSS
          rule matching
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            [data-theme='my-scheme']
          </code>
          (and its
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            [data-theme='my-scheme'].dark
          </code>
          variant) that overrides the token variables will work the same way.
          This lets you add new palettes (e.g.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">teal</code>
          ) or customize tokens beyond
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">--primary</code>
          without forking the library.
        </p>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>3. Configure Tailwind source</h2>
        <p class="text-muted-foreground">
          Add the library as a Tailwind source so its classes are included in
          the build. Add this to your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="sourceCode"
              #copy4="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copy4.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div scCodeViewerContent [code]="sourceCode" language="css"></div>
        </div>
        <p class="text-muted-foreground text-sm">
          Adjust the path to
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            node_modules
          </code>
          based on your project structure.
        </p>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UiPage {
  readonly stylesDefaultCode = '@import "@semantic-components/ui/styles";';

  readonly stylesCustomCdkCode =
    "@import url('@angular/cdk/overlay-prebuilt.css');";

  readonly sourceCode = '@source "../node_modules/@semantic-components/ui";';

  readonly colorSchemesCode =
    '@import "@semantic-components/ui/styles/color-schemes.css";';
}
