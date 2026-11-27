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
import { CustomDataEmojiPickerDemoContainer } from './demos/custom-data-emoji-picker-demo-container';
import { InputEmojiPickerDemoContainer } from './demos/input-emoji-picker-demo-container';
import { LocaleEmojiPickerDemoContainer } from './demos/locale-emoji-picker-demo-container';
import { ReactionsEmojiPickerDemoContainer } from './demos/reactions-emoji-picker-demo-container';
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
    ReactionsEmojiPickerDemoContainer,
    CustomDataEmojiPickerDemoContainer,
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
          >; the data is Emojibase&apos;s (below), bundled with your app.
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
          draws the emojis — only the rows in view — under their categories. The
          rest is yours: the search field&apos;s icon, the states&apos; text, a
          footer with a preview and a skin tone, a category toolbar — parts on
          your elements.
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
          In a popover, opened by your button: the search field takes focus, and
          a pick closes it (<code scTypeset>closeOnPick</code>;
          <code scTypeset>false</code> keeps it open for more).
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
        <p>
          Just the list: fewer columns (<code scTypeset>columns</code>), no
          search, no footer.
        </p>
        <app-compact-emoji-picker-demo-container />
        <p>
          Into a message: with <code scTypeset>insertInto</code>, the emoji goes
          in at the caret, the form value follows, and focus is back in the
          field after it.
        </p>
        <app-input-emoji-picker-demo-container />
        <p>
          Reactions: a few quick ones, the rest from the picker. A reaction is a
          toggle — yours or not — with its count.
        </p>
        <app-reactions-emoji-picker-demo-container />
        <p>
          Your own emojis (<code scTypeset>data</code>): a team&apos;s set, with
          its categories, names and search words. The picker works the same.
        </p>
        <app-custom-data-emoji-picker-demo-container />
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
      '  ScEmojiPickerFooter, ScEmojiPickerPreview, ScEmojiPickerSkinTone,',
      "} from '@semantic-components/ui/emoji-picker';",
    ].join('\n'),
    markup: [
      '<div scEmojiPicker>',
      '  <div scEmojiPickerSearchField>',
      '    <input scEmojiPickerSearch aria-label="…" />',
      '  </div>',
      '  <div scEmojiPickerViewport>',
      '    <span scEmojiPickerLoading>…</span>',
      '    <span scEmojiPickerEmpty>…</span>',
      '    <span scEmojiPickerError>…</span>',
      '    <span scEmojiPickerAnnouncer></span>',
      '    <div scEmojiPickerList aria-label="…"></div>',
      '  </div>',
      '  <div scEmojiPickerFooter>',
      '    <div scEmojiPickerPreview>…</div>',
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
      name: 'closeOnPick',
      type: 'boolean',
      default: 'true',
      description:
        'In a popover, a pick closes it; false: it stays open for more.',
    },
    {
      name: 'insertInto',
      type: 'HTMLInputElement | HTMLTextAreaElement | null',
      default: 'null',
      description:
        'Your text field: a pick goes in at its caret, its value follows (an input event), focus is back in it.',
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
        'The picker (#picker="scEmojiPicker"): categories() for a toolbar, skinToneNames(), activeEmoji(), loading(), failed(), empty(), search(); focus(), scrollToCategory(i), nextSkinTone().',
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
        'The grid: draws the emojis — only the rows in view — under their categories, whose headers stick. Name it.',
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
      name: 'ScEmojiPickerPreview',
      selector: 'div[scEmojiPickerPreview]',
      description:
        "The emoji hovered or moved to and its name; your text (Select an emoji…) while there's none.",
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
