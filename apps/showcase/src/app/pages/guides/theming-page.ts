import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { DocCode } from '../../components/doc-code/doc-code';
import { TocHeading } from '../../components/toc/toc-heading';
import { ThemeMenuDemoContainer } from '../docs/theming/demos/theme-menu-demo-container';
import { ThemeToggleDemoContainer } from '../docs/theming/demos/theme-toggle-demo-container';

@Component({
  selector: 'app-theming-page',
  imports: [
    DocCode,
    RouterLink,
    ScLink,
    ScTypeset,
    TocHeading,
    ThemeToggleDemoContainer,
    ThemeMenuDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Theming</h1>
        <p class="text-muted-foreground">
          Three things decide how your app looks — together, its preset: the
          style (how the components are drawn), the theme (every CSS variable
          shadcn gives: colours, radius, fonts, charts, sidebar) and the mode
          (light, dark or the system&apos;s). The user&apos;s theme and mode are
          kept from one visit to the next.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>The preset</h2>
        <p>
          A <strong>style</strong> (nova, vega, maia, lyra, mira, luma, sera,
          rhea) is the components&apos; classes — shadcn&apos;s eight styles:
          corners, spacing, borders, the way a button or a field is built; fixed
          when the app starts. The <strong>theme</strong> is your CSS: all of
          shadcn&apos;s variables, which every style reads, and a named theme if
          you have several. The <strong>mode</strong> is light or dark: the
          first one, until the user picks.
        </p>
        <app-doc-code [code]="presetCode" />
        <p>
          See
          <a scLink routerLink="/docs/packages/styles">Styles</a> for the eight,
          side by side.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Theme</h2>
        <p>
          The same variables as shadcn/ui, so a theme from its generator or from
          tweakcn carries over — all of them, not only the colours: colours in
          OKLCH on
          <code scTypeset>:root</code>, their dark values on
          <code scTypeset>.dark</code>, the corners from one
          <code scTypeset>--radius</code>, the fonts from
          <code scTypeset>--font-sans</code> and
          <code scTypeset>--font-heading</code>. Charts read
          <code scTypeset>--chart-1</code>
          to
          <code scTypeset>--chart-5</code>; the sidebar its
          <code scTypeset>--sidebar-…</code>
          variables.
        </p>
        <app-doc-code [code]="themeCode" language="css" />
        <p>
          Several themes: give each a name, write its variables (any of them,
          the radius and the fonts too) under
          <code scTypeset>[data-theme]</code>, and set it — the preset&apos;s
          <code scTypeset>theme</code> at first,
          <code scTypeset>ScThemeManager</code>&apos;s
          <code scTypeset>setTheme('rose')</code>
          when the user picks (<code scTypeset>'default'</code>: none).
        </p>
        <app-doc-code [code]="namedThemeCode" language="css" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Mode</h2>
        <p>
          <code scTypeset>ScThemeManager</code>
          holds the mode — light, dark or system — and puts the
          <code scTypeset>dark</code>
          class on the page&apos;s root when it is dark. There is no toggle
          part: any control of yours calls it, so a button, a switch or a menu
          with System in it all work.
        </p>
        <app-doc-code [code]="modeCode" language="angular-ts" />
        <p>
          One click goes between light and dark; a menu keeps the way back to
          the system&apos;s, which a single button loses.
        </p>
        <app-theme-toggle-demo-container />
        <app-theme-menu-demo-container />
        <p>
          The user&apos;s mode and theme are kept in cookies (<code scTypeset
            >sc-mode</code
          >, <code scTypeset>sc-theme</code>, copied to localStorage), so a page
          rendered on the server is drawn right from the first paint. System is
          the browser&apos;s: a small script the server puts in the page&apos;s
          head applies it before the first paint.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ThemingPage {
  private readonly presetCode = `import { provideSemanticComponents } from '@semantic-components/ui';
import { lyra } from '@semantic-components/styles/lyra';

export const appConfig = {
  providers: [
    provideSemanticComponents({
      preset: { style: lyra, theme: 'rose', mode: 'dark' },
    }),
  ],
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

  private readonly namedThemeCode = `[data-theme='rose'] {
  --primary: oklch(0.645 0.246 16.439);
  --ring: oklch(0.645 0.246 16.439);
  --radius: 1rem;
}`;

  private readonly modeCode = `import { ScThemeManager } from '@semantic-components/ui';

export class ModeButton {
  protected readonly theme = inject(ScThemeManager);
}

// <button scButton variant="outline" size="icon" (click)="theme.toggleMode()">
//   @if (theme.isDark()) { <svg siSunIcon></svg> } @else { <svg siMoonIcon></svg> }
//   <span class="sr-only">Toggle the mode</span>
// </button>
// …or theme.setMode('system')`;
}
