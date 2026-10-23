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
import { CountrySelectorPhoneInputDemoContainer } from '../docs/phone-input/demos/country-selector-phone-input-demo-container';

@Component({
  selector: 'app-phone-input-install-page',
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
    CountrySelectorPhoneInputDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Phone Input</h1>
        <p class="text-muted-foreground">
          Install and configure the
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/ui-lab/phone-input</code
          >
          package. Requires the ui library to be installed first.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>1. Install the package</h2>
        <p class="text-muted-foreground">
          Install the phone input library and its peer dependency
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >libphonenumber-js</code
          >.
        </p>
        <app-package-manager-install
          packages="@semantic-components/ui-lab libphonenumber-js"
        />
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>2. Configure Tailwind source</h2>
        <p class="text-muted-foreground">
          Add the phone input library as a Tailwind source in your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code
          >:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>css</div>
            <div scCodeBlockActions>
              <button [scCodeBlockCopy]="sourceCode" #copy="scCodeBlockCopy">
                @if (copy.copied()) {
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
          Import and use the phone input in your Angular templates:
        </p>
        <app-country-selector-phone-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PhoneInputInstallPage {
  readonly sourceCode =
    '@source "../node_modules/@semantic-components/ui-lab";';
}
