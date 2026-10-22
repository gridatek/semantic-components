import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/code';
import { ScHeading, ScSeparator } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { PackageManagerInstall } from '../../components/package-manager-install/package-manager-install';
import { TocHeading } from '../../components/toc/toc-heading';
import { CodeViewerUsageDemoContainer } from '../docs/code-viewer/demos/code-viewer-usage-demo-container';

@Component({
  selector: 'app-code-page',
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
    ScSeparator,
    ScHeading,
    PackageManagerInstall,
    CodeViewerUsageDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Code</h1>
        <p class="text-muted-foreground">
          Install and configure the
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/code</code
          >
          package. Provides code viewer and code editor components powered by
          Shiki. Requires the ui library to be installed first.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>1. Install the package</h2>
        <p class="text-muted-foreground">
          Install the code library and its peer dependency
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">shiki</code>.
        </p>
        <app-package-manager-install
          packages="@semantic-components/code shiki"
        />
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>2. Configure styles</h2>
        <p class="text-muted-foreground">
          Import the code library styles in your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code
          >:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>css</div>
            <div scCodeBlockActions>
              <button [scCodeBlockCopy]="stylesCode" #copy2="scCodeBlockCopy">
                @if (copy2.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre scCodeBlockContent [code]="stylesCode" language="css"></pre>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>3. Configure Tailwind source</h2>
        <p class="text-muted-foreground">
          Add the library as a Tailwind source in your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code
          >:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>css</div>
            <div scCodeBlockActions>
              <button [scCodeBlockCopy]="sourceCode" #copy3="scCodeBlockCopy">
                @if (copy3.copied()) {
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
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <p class="text-muted-foreground">
          Import and use the code viewer in your Angular templates:
        </p>
        <app-code-viewer-usage-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CodeInstallPage {
  readonly stylesCode = '@import "@semantic-components/code/styles";';

  readonly sourceCode = '@source "../node_modules/@semantic-components/code";';
}
