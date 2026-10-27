import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink, ScSeparator } from '@semantic-components/ui';
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
          packages="@semantic-components/ui @semantic-components/presets"
        />
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>2. Configure styles</h2>
        <p class="text-muted-foreground">
          As in shadcn/ui, the theme is your app's. Copy this into your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code
          >: shadcn's nova theme (colors, radius, font) with our additions
          marked "Not shadcn's", the library's styles, and the Tailwind sources.
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>styles.css</div>
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
        <p class="text-muted-foreground">
          The components use nova. For another preset, give it when the app
          starts, and point the second
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;source</code
          >
          at its file (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >…-presets-lyra.mjs</code
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
  readonly stylesCode = `@import url('@angular/cdk/overlay-prebuilt.css');
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';
@import '@fontsource-variable/geist';
@import '@semantic-components/ui/styles';

/* The library and your preset (its file only): Tailwind skips node_modules.
   Adjust the path to node_modules to your project. */
@source '../node_modules/@semantic-components/ui';
@source '../node_modules/@semantic-components/presets/fesm2022/semantic-components-presets-nova.mjs';

/*
 * The theme: shadcn's nova, with our differences marked "Not shadcn's":
 * tokens of ours, two colors darkened for contrast (WCAG AA).
 */

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-heading: var(--font-sans);
  --font-sans: 'Geist Variable', sans-serif;
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  /* Not shadcn's: the confetti's colors, as the charts' (bright: the charts' are grey). */
  --color-confetti-1: var(--confetti-1);
  --color-confetti-2: var(--confetti-2);
  --color-confetti-3: var(--confetti-3);
  --color-confetti-4: var(--confetti-4);
  --color-confetti-5: var(--confetti-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  /* Not shadcn's: the toast's success and warning. */
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  /* Not shadcn's (0.556): 4.5:1 on the muted background (inactive tabs…). */
  --muted-foreground: oklch(0.54 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  /* Not shadcn's (0.577): 4.5:1 for text-destructive on bg-destructive/10. */
  --destructive: oklch(0.52 0.245 27.325);
  /* Not shadcn's: the toast's success and warning text, 4.5:1 on the popover
     even at 90% opacity. */
  --success: oklch(0.49 0.14 150);
  --warning: oklch(0.52 0.15 49);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  /* Not shadcn's: the confetti's colors. */
  --confetti-1: oklch(0.646 0.222 41.116);
  --confetti-2: oklch(0.6 0.118 184.704);
  --confetti-3: oklch(0.488 0.243 264.376);
  --confetti-4: oklch(0.828 0.189 84.429);
  --confetti-5: oklch(0.645 0.246 16.439);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --success: oklch(0.792 0.209 151.711);
  --warning: oklch(0.828 0.189 84.429);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --confetti-1: oklch(0.705 0.213 47.604);
  --confetti-2: oklch(0.696 0.17 162.48);
  --confetti-3: oklch(0.627 0.265 303.9);
  --confetti-4: oklch(0.852 0.199 91.936);
  --confetti-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
    /* Not shadcn's: lets heights animate to and from auto (collapsible, accordion). */
    interpolate-size: allow-keywords;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}
`;

  readonly presetCode = `import { lyra } from '@semantic-components/presets/lyra';
import { provideScConfig } from '@semantic-components/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideScConfig({ preset: lyra })],
};`;

  readonly colorSchemesCode =
    '@import "@semantic-components/ui/styles/color-schemes.css";';
}
