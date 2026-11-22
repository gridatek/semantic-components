import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScKbd,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTypeset,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CodecTokenInputDemoContainer } from './demos/codec-token-input-demo-container';
import { DeletionTokenInputDemoContainer } from './demos/deletion-token-input-demo-container';
import { FormTokenInputDemoContainer } from './demos/form-token-input-demo-container';
import { MentionsTokenInputDemoContainer } from './demos/mentions-token-input-demo-container';
import { MethodsTokenInputDemoContainer } from './demos/methods-token-input-demo-container';
import { PromptTokenInputDemoContainer } from './demos/prompt-token-input-demo-container';
import { RtlTokenInputDemoContainer } from './demos/rtl-token-input-demo-container';
import { SubmitShortcutTokenInputDemoContainer } from './demos/submit-shortcut-token-input-demo-container';
import { TokenInputUsageDemoContainer } from './demos/token-input-usage-demo-container';

@Component({
  selector: 'app-token-input-page',
  imports: [
    ScKbd,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    TokenInputUsageDemoContainer,
    MentionsTokenInputDemoContainer,
    PromptTokenInputDemoContainer,
    DeletionTokenInputDemoContainer,
    CodecTokenInputDemoContainer,
    FormTokenInputDemoContainer,
    MethodsTokenInputDemoContainer,
    SubmitShortcutTokenInputDemoContainer,
    RtlTokenInputDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Token Input</h1>
        <p class="text-muted-foreground">
          A text field that holds tokens in its text — people mentioned, files
          attached to a prompt — each moving, deleting and copying whole. With a
          Trigger Menu, typing &#64; or / suggests them.
        </p>
        <app-component-badges path="token-input" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-token-input-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The root holds the value; the editor is where you type; the
          token&apos;s template is written once and stamped in each token&apos;s
          chip. A Trigger Menu and a status go inside the root too.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The value</h2>
        <p>
          Text and tokens in order:
          <code scTypeset>(string | ScToken)[]</code>, a token
          <code scTypeset>{{ tokenShape }}</code
          >. As text — to copy, paste or send — each token is written by the
          codec, by default <code scTypeset>{{ defaultCodec }}</code
          >; <code scTypeset>tokenInputToText</code>,
          <code scTypeset>tokenInputFromText</code> and
          <code scTypeset>tokenInputToLabel</code> turn a value into text and
          back. In a form, the value is the array: an empty one is not
          <em>empty</em> to Signal Forms&apos;
          <code scTypeset>required()</code> — check its text with
          <code scTypeset>validate()</code>, as the Form example does.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Token Input keys"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Key</th>
                <th scTableHeaderCell>Does</th>
              </tr>
            </thead>
            <tbody scTableBody>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>←</kbd> / <kbd scKbd>→</kbd></td>
                <td scTableCell>
                  Over a token in one press: the caret never stops inside one
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Backspace</kbd> / <kbd scKbd>Delete</kbd>
                </td>
                <td scTableCell>
                  The token before / after the caret, as
                  <code scTypeset>tokenDeletion</code> says; a word or a line
                  stops at a token
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Shift + Enter</kbd></td>
                <td scTableCell>A new line</td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Enter</kbd> / <kbd scKbd>Ctrl + Enter</kbd>
                </td>
                <td scTableCell>
                  Sends, as <code scTypeset>submitShortcut</code> says (else a
                  new line)
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell><kbd scKbd>Ctrl + Z</kbd></td>
                <td scTableCell>
                  Undo: typing a second at a time, each paste or token a step
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell>
                  <kbd scKbd>Ctrl + Shift + Z</kbd> /
                  <kbd scKbd>Ctrl + Y</kbd>
                </td>
                <td scTableCell>Redo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The editor is a multi-line textbox, named by its field&apos;s label
            or <code scTypeset>aria-label</code>; spellcheck and input methods
            work as in any text field.
          </li>
          <li>
            A token reads as what its template writes: its label, and its kind
            in an <code scTypeset>sr-only</code> span (&quot;routes.ts
            file&quot;). Its remove button is hidden from screen readers — the
            keyboard removes a token with <kbd scKbd>Backspace</kbd>.
          </li>
          <li>
            <code scTypeset>scTokenInputStatus</code> is a polite live region:
            write in it, from <code scTypeset>lastChange()</code>, what to
            announce when a token is added or removed.
          </li>
          <li>
            With a Trigger Menu, the editor points at the list (<code scTypeset
              >aria-controls</code
            >, <code scTypeset>aria-activedescendant</code>); focus never leaves
            it.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-mentions-token-input-demo-container />
        <app-prompt-token-input-demo-container />
        <app-deletion-token-input-demo-container />
        <app-codec-token-input-demo-container />
        <app-form-token-input-demo-container />
        <app-methods-token-input-demo-container />
        <app-submit-shortcut-token-input-demo-container />
        <app-rtl-token-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own (cn:
          a later class wins). The editor has the style&apos;s textarea look, a
          token the style&apos;s combobox chip.
        </p>
        <app-parts-table label="Token Input parts" [parts]="parts" />
        <app-api-table label="ScTokenInput inputs" [inputs]="inputs" />
        <app-api-table
          label="ScTokenInputEditor inputs"
          [inputs]="editorInputs"
        />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TokenInputPage {
  private readonly tokenShape =
    "{ type, value, label, id?, status?: 'pending' | 'unresolved' }";
  private readonly defaultCodec = '[@label](type:value)';

  private readonly anatomy = {
    imports:
      "import { ScTokenInput, ScTokenInputEditor, ScTokenInputStatus, ScTokenInputToken, ScTokenInputTokenRemove } from '@semantic-components/ui';",
    markup: [
      '<div scTokenInput #input="scTokenInput" [formField]="form.prompt">',
      '  <div scTokenInputEditor placeholder="…"></div>',
      '  <ng-template scTokenInputToken let-token>',
      '    {{ token.label }}',
      '    <span scTokenInputTokenRemove><svg siXIcon></svg></span>',
      '  </ng-template>',
      '  <div scTokenInputStatus>…</div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScTokenInput',
      selector: 'div[scTokenInput]',
      description:
        'The root: the value. exportAs scTokenInput: insert(), updateToken(), removeToken(), undo(), redo(), canUndo(), canRedo(), clear(), focus(), lastChange(), selectedToken().',
    },
    {
      name: 'ScTokenInputEditor',
      selector: 'div[scTokenInputEditor]',
      description:
        'Where you type: a contenteditable textbox (multi-line). Writes its own content.',
    },
    {
      name: 'ScTokenInputToken',
      selector: 'ng-template[scTokenInputToken]',
      description:
        "A token's content, written once (let-token). Without it, a token shows its label.",
    },
    {
      name: 'ScTokenInputTokenRemove',
      selector: '[scTokenInputTokenRemove]',
      description:
        'Inside the token template: removes its token; hidden from screen readers, focus stays in the editor.',
    },
    {
      name: 'ScTokenInputStatus',
      selector: 'div[scTokenInputStatus]',
      description:
        'A polite live region (sr-only): your words, from lastChange().',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'ScTokenInputValue',
      default: '[]',
      description: 'Two-way, or [formField]: text and tokens in order.',
    },
    {
      name: 'tokenDeletion',
      type: "'whole' | 'select' | 'revert'",
      default: "'whole'",
      description:
        'Backspace or Delete at a token: removes it; selects then removes it; turns it back into its text (the menu opens on it).',
    },
    {
      name: 'submitShortcut',
      type: "'enter' | 'mod+enter' | null",
      default: 'null',
      description: 'The key that emits (submitted); null: Enter is a new line.',
    },
    {
      name: 'codec',
      type: 'ScTokenCodec',
      default: '[@label](type:value)',
      description: 'Tokens as text: copy and paste.',
    },
    {
      name: 'disabled, readonly, required, invalid, touched',
      type: 'boolean',
      default: 'false',
      description: 'Bound by [formField].',
    },
  ];

  private readonly editorInputs: ApiInput[] = [
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Shown while it is empty (aria-placeholder).',
    },
  ];
}
