import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { DocCode } from '../../components/doc-code/doc-code';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-accessibility-page',
  imports: [DocCode, RouterLink, ScKbd, ScLink, ScTypeset, TocHeading],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Accessibility</h1>
        <p class="text-muted-foreground">
          Every component is built to WCAG AA: native elements first, the
          WAI-ARIA pattern where there is one, complete keyboard use, visible
          focus that is never trapped, and every page checked by axe in light
          and dark. What it can&apos;t know — the words — is yours.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Native elements first</h2>
        <p>
          A part is an attribute on your element — a
          <code scTypeset>button</code>, an <code scTypeset>input</code>, a
          <code scTypeset>header</code>, a <code scTypeset>ul</code> — so it
          keeps what the browser gives it: its role, its focus, its form
          behaviour. A checkbox is a real checkbox, a switch a real one with
          role=&quot;switch&quot;, an OTP input one real input per character.
          ARIA is added only where HTML has nothing (a menu, a combobox, a
          tree), following the WAI-ARIA Authoring Practices.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The keyboard</h2>
        <p>
          Everything a pointer does, the keyboard does: <kbd scKbd>Tab</kbd> to
          reach a widget, the arrows within it (mirrored right to left),
          <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> to its ends,
          <kbd scKbd>Enter</kbd> or <kbd scKbd>Space</kbd> to act,
          <kbd scKbd>Escape</kbd> to close and give the focus back. A composite
          widget (a toolbar, a radio group, a menu bar) is one tab stop. Each
          component&apos;s page lists its keys.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Focus</h2>
        <p>
          Focus is always visible (the style&apos;s ring) and goes where you
          expect: into a dialog when it opens, back to its trigger when it
          closes. A modal dialog keeps the focus inside while it is open; a
          popover, a menu or a mobile menu doesn&apos;t trap it — leaving closes
          them.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Names are yours</h2>
        <p>
          The library writes no text: every label, button name and message is in
          your template, in your language. An icon-only button gets its name in
          a visually hidden span — read by screen readers, kept in the
          button&apos;s text for translation and voice control. In development,
          a part left without a name warns in the console.
        </p>
        <app-doc-code [code]="namesCode" language="angular-html" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Announcements</h2>
        <p>
          What changes without moving the focus is announced through a live
          region: a toast, a value stepped by a button, a sorted list. A
          field&apos;s errors are an alert, and are read with its control.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Motion, direction, touch</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            With reduced motion asked for, animations keep their fades and lose
            their movement.
          </li>
          <li>
            Right to left is built in: logical sides, mirrored icons and arrow
            keys, from Angular&apos;s Directionality — see
            <a scLink routerLink="/docs/overview/rtl">Right to left</a>.
          </li>
          <li>
            Targets are at least 24 px on touch screens (WCAG 2.5.8), and every
            component works at 360 px wide.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is checked</h2>
        <p>
          Every docs page runs axe in light and in dark mode, and every demo has
          end-to-end tests of its keyboard, focus and names, in Chromium,
          Firefox and WebKit. Contrast follows the theme: if you change its
          colours, keep text at 4.5:1 and controls at 3:1.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AccessibilityPage {
  private readonly namesCode = `<button scButton size="icon" variant="ghost">
  <svg siTrashIcon></svg>
  <span class="sr-only">Delete the file</span>
</button>`;
}
