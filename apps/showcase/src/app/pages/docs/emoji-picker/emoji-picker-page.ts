import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ApiTable } from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicEmojiPickerDemoContainer } from './demos/basic-emoji-picker-demo-container';
import { CategoriesEmojiPickerDemoContainer } from './demos/categories-emoji-picker-demo-container';
import { CompactEmojiPickerDemoContainer } from './demos/compact-emoji-picker-demo-container';
import { InputEmojiPickerDemoContainer } from './demos/input-emoji-picker-demo-container';
import { LocaleEmojiPickerDemoContainer } from './demos/locale-emoji-picker-demo-container';
import { MessageReactionsEmojiPickerDemoContainer } from './demos/message-reactions-emoji-picker-demo-container';
import { QuickReactionsEmojiPickerDemoContainer } from './demos/quick-reactions-emoji-picker-demo-container';
import { RtlEmojiPickerDemoContainer } from './demos/rtl-emoji-picker-demo-container';
import { TriggerEmojiPickerDemoContainer } from './demos/trigger-emoji-picker-demo-container';

@Component({
  selector: 'app-emoji-picker-page',
  imports: [
    EntryInstall,
    Anatomy,
    ApiTable,
    PartsTable,
    BasicEmojiPickerDemoContainer,
    TriggerEmojiPickerDemoContainer,
    CategoriesEmojiPickerDemoContainer,
    LocaleEmojiPickerDemoContainer,
    CompactEmojiPickerDemoContainer,
    InputEmojiPickerDemoContainer,
    QuickReactionsEmojiPickerDemoContainer,
    MessageReactionsEmojiPickerDemoContainer,
    RtlEmojiPickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScKbd,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Emoji Picker</h1>
        <p class="text-muted-foreground">
          A searchable emoji picker, assembled from parts: one scrolling list of
          every category with sticky headers — virtualised — through which the
          arrow keys move from the search field, skin tones, the emojis&apos;
          names in 28 languages, and the emojis the system can&apos;t draw left
          out. Modelled on
          <a
            href="https://frimousse.liveblocks.io"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline underline-offset-4"
            >Frimousse</a
          >; the data is
          <a
            href="https://emojibase.dev"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline underline-offset-4"
          >
            Emojibase&apos;s</a
          >, bundled with your app.
        </p>
        <app-component-badges path="emoji-picker" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="emoji-picker"
          library="emojibase-data"
          href="https://emojibase.dev"
          names="ScEmojiPicker, ScEmojiPickerSearch, ScEmojiPickerViewport, ScEmojiPickerList"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-basic-emoji-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The picker holds the data, the search and the active emoji; the list
          gives you its categories and the rows in view, which you draw. The
          rest is yours — the search field&apos;s icon, the states&apos; text, a
          footer, a category toolbar — with parts on your elements.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Data</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Emojibase&apos;s emojis and their names, in the locale (<code
              scTypeset
              >LOCALE_ID</code
            >: the app&apos;s, or one provided for a section): 28 languages;
            English for the others.
          </li>
          <li>
            Bundled with your app: each locale is a chunk of its own, downloaded
            the first time a picker shows it — nothing fetched from a CDN,
            nothing to host, and the emojis your app was built and tested with.
            A new Emojibase comes with an upgrade of
            <code scTypeset>emojibase-data</code>.
          </li>
          <li>
            The emojis newer than the system draws are left out — they&apos;d
            show as boxes — and so are flags where the system has none
            (Windows). <code scTypeset>emojiVersion</code> sets the newest
            version yourself.
          </li>
          <li>
            Your own emojis instead: <code scTypeset>data</code> (an
            <code scTypeset>ScEmojiData</code>);
            <code scTypeset>loadEmojiData(locale)</code> gives Emojibase&apos;s,
            outside a picker.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Typing in the search field filters by name, then by keywords; the
            first result becomes active.
          </li>
          <li>
            <kbd scKbd>←</kbd> <kbd scKbd>→</kbd> <kbd scKbd>↑</kbd>
            <kbd scKbd>↓</kbd> move the active emoji across rows and categories
            — from the search field, where focus stays, or from the list;
            <kbd scKbd>Enter</kbd> picks it. Right to left, <kbd scKbd>←</kbd>
            moves on.
          </li>
          <li>
            The category toolbar is one <kbd scKbd>Tab</kbd> stop; the arrow
            keys move between its buttons.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The list is a grid of rows and cells, named by the emojis&apos;
            labels in the locale; it counts every row, so a screen reader knows
            where it is though only the rows in view are drawn.
          </li>
          <li>
            Focus stays in the search field while the arrows move: the active
            emoji is selected in the grid and said by
            <code scTypeset>scEmojiPickerAnnouncer</code>, a hidden live region.
          </li>
          <li>
            You name what has no text: the search field, the list, the category
            toolbar, the skin-tone button and the loading spinner. Category
            buttons are named by their category.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <p>
          In a popover, opened by your button; the search field takes focus.
        </p>
        <app-trigger-emoji-picker-demo-container />
        <p>
          A category toolbar with your icons, and the recent emojis first — keep
          <code scTypeset>recent</code> (in <code scTypeset>localStorage</code>,
          say) to restore them.
        </p>
        <app-categories-emoji-picker-demo-container />
        <p>
          In another language: the emojis&apos; names and the search follow
          <code scTypeset>LOCALE_ID</code>, provided for the section; your text
          is yours to translate. A skin tone applies to the whole list.
        </p>
        <app-locale-emoji-picker-demo-container />
        <p>Just the list: fewer columns, no search, no footer.</p>
        <app-compact-emoji-picker-demo-container />
        <p>Inserting into a message, at the caret.</p>
        <app-input-emoji-picker-demo-container />
        <app-quick-reactions-emoji-picker-demo-container />
        <app-message-reactions-emoji-picker-demo-container />
        <p>
          Right to left: the rows, the category toolbar and the arrow keys run
          from the right. Emojibase has no Arabic, so the emojis&apos; names are
          in English.
        </p>
        <app-rtl-emoji-picker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its look
          (cn: a later class wins). The skin-tone button is the style&apos;s
          button and the category buttons its toggle: pick another look with
          <code scTypeset>variant</code> and <code scTypeset>size</code>.
        </p>
        <app-api-table label="ScEmojiPicker inputs" [inputs]="inputs" />
        <app-parts-table label="Picker and list" [parts]="layout" />
        <app-parts-table label="States" [parts]="states" />
        <app-parts-table label="Around the list" [parts]="extras" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class EmojiPickerPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScEmojiPicker, ScEmojiPickerSearchField, ScEmojiPickerSearch,',
      '  ScEmojiPickerViewport, ScEmojiPickerLoading, ScEmojiPickerEmpty,',
      '  ScEmojiPickerError, ScEmojiPickerAnnouncer, ScEmojiPickerList,',
      '  ScEmojiPickerCategory, ScEmojiPickerCategoryHeader,',
      '  ScEmojiPickerRow, ScEmojiPickerEmoji, ScEmojiPickerFooter,',
      '  ScEmojiPickerSkinTone,',
      "} from '@semantic-components/ui/emoji-picker';",
    ].join('\n'),
    markup: [
      '<div scEmojiPicker #picker="scEmojiPicker">',
      '  <div scEmojiPickerSearchField>',
      '    <input scEmojiPickerSearch aria-label="…" />',
      '  </div>',
      '  <div scEmojiPickerViewport>',
      '    <span scEmojiPickerLoading>…</span>',
      '    <span scEmojiPickerEmpty>…</span>',
      '    <span scEmojiPickerError>…</span>',
      '    <span scEmojiPickerAnnouncer></span>',
      '    <div scEmojiPickerList aria-label="…" #list="scEmojiPickerList">',
      '      <div [scEmojiPickerCategory]="category">',
      '        <div scEmojiPickerCategoryHeader>…</div>',
      '      </div>',
      '      <div [scEmojiPickerRow]="row">',
      '        <button [scEmojiPickerEmoji]="emoji">…</button>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div scEmojiPickerFooter>',
      '    <button scEmojiPickerSkinTone>…</button>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly inputs = [
    {
      name: 'columns',
      type: 'number',
      default: '10',
      description: 'Emojis per row.',
    },
    {
      name: 'skinTone',
      type: 'ScEmojiSkinTone',
      default: "'none'",
      description:
        "Two-way: the tone emojis are shown in ('light', 'medium-light', 'medium', 'medium-dark', 'dark').",
    },
    {
      name: 'emojiVersion',
      type: 'number | null',
      default: 'null',
      description:
        'The newest Emoji version shown; by default the newest the system draws.',
    },
    {
      name: 'data',
      type: 'ScEmojiData | null',
      default: 'null',
      description: "Your emojis instead of Emojibase's.",
    },
    {
      name: 'sticky',
      type: 'boolean',
      default: 'true',
      description: 'Category headers stick while their emojis scroll.',
    },
    {
      name: 'recent',
      type: 'ScEmoji[]',
      default: '[]',
      description:
        'Two-way: the recently picked emojis, latest first — keep them to restore them.',
    },
    {
      name: 'maxRecent',
      type: 'number',
      default: '20',
      description: 'How many recent emojis are kept.',
    },
    {
      name: 'recentLabel',
      type: 'string | null',
      default: 'null',
      description:
        'The name of a first category of the recent emojis; none without it.',
    },
    {
      name: '(emojiSelect)',
      type: 'ScEmoji',
      default: '—',
      description: 'An emoji was picked: { emoji, label }.',
    },
  ];

  private readonly layout = [
    {
      name: 'ScEmojiPicker',
      selector: 'div[scEmojiPicker]',
      description:
        'The picker (#picker="scEmojiPicker"): activeEmoji(), categories(), currentCategory(), skinToneNames(), loading(), failed(), empty(), search(); focus(), scrollToCategory(i), nextSkinTone().',
    },
    {
      name: 'ScEmojiPickerSearchField',
      selector: 'div[scEmojiPickerSearchField]',
      description: 'The search row: your icon, then the field.',
    },
    {
      name: 'ScEmojiPickerSearch',
      selector: 'input[scEmojiPickerSearch]',
      description:
        'Filters as you type (names, then keywords); the first result becomes active. Name it.',
    },
    {
      name: 'ScEmojiPickerViewport',
      selector: 'div[scEmojiPickerViewport]',
      description:
        'The scrolling frame; focusable, so the arrows work from it too.',
    },
    {
      name: 'ScEmojiPickerList',
      selector: 'div[scEmojiPickerList]',
      description:
        'The grid (#list="scEmojiPickerList"): categories() — all — and rows() — the ones in view. Name it.',
    },
    {
      name: 'ScEmojiPickerCategory, ScEmojiPickerCategoryHeader',
      selector:
        'div[scEmojiPickerCategory]="category", div[scEmojiPickerCategoryHeader]',
      description:
        "A category's place over its rows; its header (write category.label), sticky.",
    },
    {
      name: 'ScEmojiPickerRow, ScEmojiPickerEmoji',
      selector:
        'div[scEmojiPickerRow]="row", button[scEmojiPickerEmoji]="emoji"',
      description:
        'A row of row.emojis; an emoji (write emoji.emoji): picks it, data-active when hovered or moved to.',
    },
  ];

  private readonly states = [
    {
      name: 'ScEmojiPickerLoading',
      selector: '[scEmojiPickerLoading]',
      description: 'Shown while the data loads.',
    },
    {
      name: 'ScEmojiPickerEmpty',
      selector: '[scEmojiPickerEmpty]',
      description:
        'Shown when nothing matches (#empty="scEmojiPickerEmpty": search() for your text).',
    },
    {
      name: 'ScEmojiPickerError',
      selector: '[scEmojiPickerError]',
      description: "Shown (an alert) when the data couldn't be loaded.",
    },
    {
      name: 'ScEmojiPickerAnnouncer',
      selector: '[scEmojiPickerAnnouncer]',
      description:
        'A hidden live region: says the emoji moved to with the keyboard.',
    },
  ];

  private readonly extras = [
    {
      name: 'ScEmojiPickerFooter',
      selector: 'div[scEmojiPickerFooter]',
      description: 'A row under the list, as wide as it.',
    },
    {
      name: 'ScEmojiPickerSkinTone',
      selector: 'button[scEmojiPickerSkinTone]',
      description:
        'Cycles the skin tone; write variation() — ✋, or your emoji (scEmojiPickerSkinTone="👍"), in the tone. Name it.',
    },
    {
      name: 'ScEmojiPickerCategoryNav',
      selector: 'div[scEmojiPickerCategoryNav]',
      description:
        'A toolbar of category buttons: one Tab stop, the arrow keys. Name it.',
    },
    {
      name: 'ScEmojiPickerCategoryButton',
      selector: 'button[scEmojiPickerCategoryButton]="category"',
      description:
        'Scrolls to the category (picker.categories()), pressed while it is at the top, named by it. Write its icon (category.key).',
    },
  ];
}
