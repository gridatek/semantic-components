import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading, ScSeparator } from '@semantic-components/ui';
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

interface Step {
  title: string;
  text: string;
  file: string;
  language: string;
  code: string;
}

@Component({
  selector: 'app-i18n-page',
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
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Internationalization</h1>
        <p class="text-muted-foreground">
          Angular's own i18n, translated in the browser: one build for every
          locale.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/ui/i18n</code
          >
          picks the locale, loads its translations before the app starts, and
          sets the page's language and direction. The components have no text of
          their own: your templates hold it, so they translate with the rest of
          your app. The blocks app is built this way, in English, French and
          Arabic.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>1. Install Angular's localize</h2>
        <p class="text-muted-foreground">
          Then add
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;angular/localize/init</code
          >
          to your build's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">polyfills</code>
          and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;angular/localize</code
          >
          to your app's tsconfig
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">types</code>.
          Leave out the
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">localize</code>
          build option: it makes one build per locale.
        </p>
        <app-package-manager-install packages="@angular/localize" />
      </section>

      @for (step of steps; track step.file; let i = $index) {
        <div scSeparator></div>
        <section class="space-y-4">
          <h2 scHeading appToc>{{ i + 2 }}. {{ step.title }}</h2>
          <p class="text-muted-foreground">{{ step.text }}</p>
          <div scCodeBlock>
            <div scCodeBlockHeader>
              <div scCodeBlockTitle>{{ step.file }}</div>
              <div scCodeBlockActions>
                <button [scCodeBlockCopy]="step.code" #copy="scCodeBlockCopy">
                  @if (copy.copied()) {
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
              [code]="step.code"
              [language]="step.language"
            ></pre>
          </div>
        </section>
      }

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>How the locale is chosen</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The one chosen before (kept in a cookie), if it is still offered.
          </li>
          <li>
            Else the first of the browser's languages that the app offers — or
            its base:
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">fr-CA</code>
            gives
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">fr</code>.
          </li>
          <li>Else the source locale.</li>
        </ul>
        <p class="text-muted-foreground">
          If its translations fail to load, the app starts in the source locale
          and says why in the console. A message missing from a file shows its
          source text.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&lt;html dir&gt;</code
          >
          is the locale's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">dir</code> when
          you give one, else the platform's (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >Intl.Locale#getTextInfo()</code
          >). Angular's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">LOCALE_ID</code>
          follows the locale, and with it the components' dates, numbers and
          calendars.
        </p>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>ScI18n</h2>
        <div class="overflow-x-auto rounded-lg border">
          <table class="w-full text-sm">
            <thead class="bg-muted/50">
              <tr>
                <th class="p-3 text-start font-medium">Member</th>
                <th class="p-3 text-start font-medium">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              @for (member of members; track member[0]) {
                <tr>
                  <td class="p-3 align-top">
                    <code class="bg-muted rounded px-1.5 py-0.5 text-sm">{{
                      member[0]
                    }}</code>
                  </td>
                  <td class="text-muted-foreground p-3">{{ member[1] }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>Limits</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Switching reloads the page: Angular translates a template once, when
            it is created.
          </li>
          <li>
            The locale is not in the URL: no per-locale links, and search
            engines see the source locale.
          </li>
          <li>
            Angular doesn't check translations when it loads them: check them in
            CI against the extracted file (keys and placeholders).
          </li>
          <li>
            It runs in the browser: a server-rendered page is in the source
            locale — Angular evaluates a component's messages once per server
            process, so server-rendered locales need its build-time i18n, a
            build per locale.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class I18nPage {
  protected readonly steps: readonly Step[] = [
    {
      title: 'List your locales',
      text: "The source locale (your templates' language) and the others, each named in its own language. A locale's dir wins over the platform's guess.",
      file: 'i18n.ts',
      language: 'typescript',
      code: `import type { ScI18nConfig } from '@semantic-components/ui/i18n';

export const I18N: ScI18nConfig = {
  sourceLocale: 'en',
  locales: [
    { id: 'en', label: 'English' },
    { id: 'fr', label: 'Français' },
    { id: 'ar', label: 'العربية', dir: 'rtl' },
  ],
  // For Angular's pipes (date, number…): each its own chunk.
  localeData: {
    fr: () => import('@angular/common/locales/fr'),
    ar: () => import('@angular/common/locales/ar'),
  },
};`,
    },
    {
      title: 'Load the locale first',
      text: "In main.ts, before the app: its templates read their translations when they load, so the app's code is imported after.",
      file: 'main.ts',
      language: 'typescript',
      code: `import { bootstrapApplication } from '@angular/platform-browser';
import { loadLocale } from '@semantic-components/ui/i18n';
import { I18N } from './app/i18n';

await loadLocale(I18N);
const [{ App }, { appConfig }] = await Promise.all([
  import('./app/app'),
  import('./app/app.config'),
]);
bootstrapApplication(App, appConfig);`,
    },
    {
      title: 'Give the locales to the app',
      text: "With the library's other settings, for ScI18n — your switcher reads it.",
      file: 'app.config.ts',
      language: 'typescript',
      code: `import { provideScConfig } from '@semantic-components/ui';
import { I18N } from './i18n';

export const appConfig: ApplicationConfig = {
  providers: [provideScConfig({ i18n: I18N })],
};`,
    },
    {
      title: 'Mark and translate your text',
      text: 'Mark text with i18n attributes (custom ids keep the files readable) and $localize in code, extract it as JSON, then write one file per locale beside it, in public/i18n/<id>.json — the format of the extracted file. Copy placeholders and plural forms from it.',
      file: 'terminal',
      language: 'bash',
      code: `ng extract-i18n --format json --output-path public/i18n --out-file messages.json`,
    },
    {
      title: 'Write your switcher',
      text: 'From ScI18n, with any of the components — here a select. Each name in its own language (lang); choosing one reloads the page in it.',
      file: 'locale-select.html',
      language: 'angular-html',
      code: `<div scSelect [value]="i18n.locale.id" (valueChange)="i18n.setLocale($event)">
  <div scSelectTrigger aria-label="Language" i18n-aria-label>
    <span scSelectValue [attr.lang]="i18n.locale.id">{{ i18n.locale.label }}</span>
    <svg scSelectIcon siChevronDownIcon></svg>
  </div>
  <ng-template scSelectPortal>
    <div scSelectPopup>
      <div scSelectList>
        @for (locale of i18n.locales; track locale.id) {
          <div scSelectItem [value]="locale.id" [label]="locale.label" [attr.lang]="locale.id">
            <span scSelectItemLabel>{{ locale.label }}</span>
            <svg scSelectItemIndicator siCheckIcon></svg>
          </div>
        }
      </div>
    </div>
  </ng-template>
</div>`,
    },
  ];

  protected readonly members = [
    ['locales', 'The locales offered.'],
    ['locale', 'The locale in use: { id, label, dir? }.'],
    ['dir', 'Its writing direction: ltr or rtl.'],
    [
      'setLocale(id)',
      'Keeps the choice and reloads the page in it; nothing for the locale in use or one not offered.',
    ],
  ];
}
