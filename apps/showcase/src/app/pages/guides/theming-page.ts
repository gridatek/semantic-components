import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { DocCode } from '../../components/doc-code/doc-code';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-theming-page',
  imports: [DocCode, RouterLink, ScLink, ScTypeset, TocHeading],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Theming</h1>
        <p class="text-muted-foreground">
          Two things decide how your app looks: the style — how the components
          are drawn — and the theme — which colours, radius and fonts they are
          drawn in. Light, dark or the system&apos;s, kept from one visit to the
          next.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Style and theme</h2>
        <p>
          A <strong>style</strong> (nova, vega, maia, lyra, mira, luma, sera,
          rhea) is the components&apos; classes — shadcn&apos;s eight styles:
          corners, spacing, borders, the way a button or a field is built. You
          choose one when the app starts. The <strong>theme</strong> is your
          CSS: shadcn&apos;s variables (<code scTypeset>--background</code>,
          <code scTypeset>--primary</code>, <code scTypeset>--radius</code>…),
          which every style reads. Change the style to change how things are
          shaped; change the theme to change their colours.
        </p>
        <app-doc-code [code]="styleCode" />
        <p>
          See
          <a scLink routerLink="/docs/packages/styles">Styles</a> for the eight,
          side by side.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The theme&apos;s variables</h2>
        <p>
          The same names as shadcn/ui, so a theme from its generator or from
          tweakcn carries over: colours in OKLCH on
          <code scTypeset>:root</code>, their dark values on
          <code scTypeset>.dark</code>, and the corners from one
          <code scTypeset>--radius</code>. Charts read
          <code scTypeset>--chart-1</code>
          to
          <code scTypeset>--chart-5</code>; the sidebar its
          <code scTypeset>--sidebar-…</code>
          variables.
        </p>
        <app-doc-code [code]="themeCode" language="css" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Dark mode</h2>
        <p>
          <code scTypeset>ScThemeManager</code>
          holds the mode — light, dark or system — and puts the
          <code scTypeset>dark</code>
          class on the page&apos;s root when it is dark. There is no theme
          toggle part: any control of yours calls it, so a button, a switch or a
          menu with System in it all work.
        </p>
        <app-doc-code [code]="modeCode" language="angular-ts" />
        <p>
          The choice is kept in a cookie (and copied to localStorage), so a page
          rendered on the server is drawn in the right mode from the first
          paint. System needs the browser: the server draws it light.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Colour schemes</h2>
        <p>
          Beside the mode, a colour scheme: a name of yours, set on the root as
          <code scTypeset>data-theme</code>
          — write its variables under that attribute, and switch with
          <code scTypeset>setColorScheme('rose')</code>. Kept like the mode.
        </p>
        <app-doc-code [code]="schemeCode" language="css" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ThemingPage {
  private readonly styleCode = `import { provideSemanticComponents } from '@semantic-components/ui';
import { lyra } from '@semantic-components/styles/lyra';

export const appConfig = {
  providers: [provideSemanticComponents({ style: lyra })],
};`;

  private readonly themeCode = `:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* … card, popover, secondary, muted, accent, destructive, border, input, ring */
  --chart-1: oklch(0.646 0.222 41.116);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  /* … */
}`;

  private readonly modeCode = `import { ScThemeManager } from '@semantic-components/ui';

export class ThemeButton {
  protected readonly theme = inject(ScThemeManager);
}

// <button scButton variant="outline" size="icon" (click)="theme.toggleMode()">
//   @if (theme.isDark()) { <svg siSunIcon></svg> } @else { <svg siMoonIcon></svg> }
//   <span class="sr-only">Toggle theme</span>
// </button>
// …or theme.setMode('system')`;

  private readonly schemeCode = `[data-theme='rose'] {
  --primary: oklch(0.645 0.246 16.439);
  --ring: oklch(0.645 0.246 16.439);
}`;
}
