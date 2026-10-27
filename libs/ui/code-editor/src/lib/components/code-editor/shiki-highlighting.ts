import {
  type Extension,
  type Range,
  StateEffect,
  StateField,
  type Text,
} from '@codemirror/state';
import {
  Decoration,
  type DecorationSet,
  EditorView,
  ViewPlugin,
  type ViewUpdate,
} from '@codemirror/view';
import type {
  ScCodeHighlighter,
  ScCodeToken,
} from '@semantic-components/ui/code-block';

/** The token's colors, as in a code block: light, and dark under `.dark`. */
const TOKEN_CLASS = 'text-(--shiki-light) dark:text-(--shiki-dark)';

const setTokens = StateEffect.define<DecorationSet>();

/** The colored tokens: replaced by each answer, moved along with the edits in between. */
const tokens = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(decorations, transaction) {
    let next = decorations.map(transaction.changes);
    for (const effect of transaction.effects)
      if (effect.is(setTokens)) next = effect.value;
    return next;
  },
  provide: (field) => EditorView.decorations.from(field),
});

/**
 * Shiki's colors in CodeMirror: the whole text highlighted by the app's
 * highlighter (`provideCodeHighlighter()`) after each pause in typing, its
 * tokens painted as decorations — the same colors as the code block and the
 * diff viewer.
 */
export function shikiHighlighting(
  highlighter: ScCodeHighlighter,
  language: string,
  delay = 100,
): Extension {
  const plugin = ViewPlugin.fromClass(
    class {
      private request = 0;
      private timer: ReturnType<typeof setTimeout> | undefined;

      constructor(private readonly view: EditorView) {
        this.schedule(0);
      }

      update(update: ViewUpdate): void {
        if (update.docChanged) this.schedule(delay);
      }

      destroy(): void {
        clearTimeout(this.timer);
        this.request++;
      }

      private schedule(wait: number): void {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.run(), wait);
      }

      private async run(): Promise<void> {
        const doc = this.view.state.doc;
        const id = ++this.request;
        const lines = await highlighter
          .highlight(doc.toString(), language)
          .catch(() => null);
        // A newer text, or a newer request: its own answer will come.
        if (id !== this.request || this.view.state.doc !== doc) return;
        this.view.dispatch({
          effects: setTokens.of(lines ? decorate(doc, lines) : Decoration.none),
        });
      }
    },
  );
  return [tokens, plugin];
}

/** The tokens as marks, one decoration per color (shared). */
function decorate(doc: Text, lines: ScCodeToken[][]): DecorationSet {
  const marks = new Map<string, Decoration>();
  const ranges: Range<Decoration>[] = [];
  lines.forEach((line, index) => {
    if (index >= doc.lines) return;
    let at = doc.line(index + 1).from;
    for (const token of line) {
      const end = at + token.content.length;
      const style = Object.entries(token.style)
        .map(([name, value]) => `${name}:${value}`)
        .join(';');
      if (style && end > at) {
        let mark = marks.get(style);
        if (!mark) {
          mark = Decoration.mark({ attributes: { style, class: TOKEN_CLASS } });
          marks.set(style, mark);
        }
        ranges.push(mark.range(at, end));
      }
      at = end;
    }
  });
  return Decoration.set(ranges, true);
}
