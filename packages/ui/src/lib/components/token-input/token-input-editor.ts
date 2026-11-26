import {
  ApplicationRef,
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  type EmbeddedViewRef,
  HostAttributeToken,
  Injector,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { SC_FIELD } from '../field';
import { ScTokenInput, type ScTokenInputEditorHost } from './token-input';
import {
  SC_TOKEN_INPUT_TOKEN,
  type ScTokenInputToken,
  type ScTokenInputTokenContext,
} from './token-input-token';
import {
  type ScToken,
  type ScTokenInputValue,
  scTokenValueAt,
  scTokenValueEqual,
  scTokenValueFlat,
  scTokenValueLength,
  scTokenValueNormalize,
  scTokenValueSlice,
  scTokenValueSplice,
  tokenInputFromText,
  tokenInputToText,
} from './token-input-value';

interface ScTokenChip {
  readonly token: ScToken;
  readonly span: HTMLElement;
  readonly view?: EmbeddedViewRef<ScTokenInputTokenContext>;
}

const TEXT = 3;
const ELEMENT = 1;

/**
 * The text the user types into: a `contenteditable` textbox (multi-line),
 * each token a chip that can't be typed into — the token's template stamped
 * in it. Typing is the browser's (spellcheck, input methods); deleting next
 * to a token, the arrows over one, new lines, the clipboard (tokens as the
 * codec's text) and undo are its own. The style's textarea look; the
 * placeholder from `placeholder`. Named by its field's label, or `aria-label`.
 */
@Directive({
  selector: 'div[scTokenInputEditor]',
  host: {
    'data-slot': 'token-input-editor',
    role: 'textbox',
    'aria-multiline': 'true',
    '[attr.id]': 'id()',
    '[attr.contenteditable]': 'root.editable() ? "true" : "false"',
    '[attr.tabindex]': 'root.disabled() ? -1 : 0',
    '[attr.aria-placeholder]': 'placeholder() || null',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-disabled]': 'root.disabled() || null',
    '[attr.aria-readonly]': 'root.readonly() || null',
    '[attr.aria-required]': 'root.required() || null',
    '[attr.aria-invalid]': 'showInvalid() || null',
    '[attr.aria-autocomplete]': 'autocomplete()',
    '[attr.aria-controls]': 'controls()',
    '[attr.aria-activedescendant]': 'activeDescendant()',
    '[attr.data-empty]': 'empty() || null',
    '[attr.data-disabled]': 'root.disabled() || null',
    '[attr.data-readonly]': 'root.readonly() || null',
    '[class]': 'class()',
    '(beforeinput)': 'onBeforeInput($event)',
    '(input)': 'onInput($event)',
    '(keydown)': 'onKeydown($event)',
    '(compositionstart)': 'onCompositionStart()',
    '(compositionend)': 'onCompositionEnd()',
    '(copy)': 'onCopy($event)',
    '(cut)': 'onCut($event)',
    '(paste)': 'onPaste($event)',
    '(dragstart)': '$event.preventDefault()',
    '(drop)': '$event.preventDefault()',
    '(focus)': 'onFocus()',
    '(blur)': 'focused.set(false)',
    '(pointerdown)': 'root.selectedToken.set(null)',
  },
})
export class ScTokenInputEditor implements ScTokenInputEditorHost {
  private readonly root = inject(ScTokenInput);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });
  private readonly styles = injectStyle();
  private readonly document = inject(DOCUMENT);
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  readonly labelledByInput = input('', { alias: 'aria-labelledby' });
  /** Shown while it is empty. */
  readonly placeholder = input('');

  readonly caret = signal<number | null>(null);
  readonly focused = signal(false);

  /** The chips shown, by token. */
  private chips = new Map<ScToken, ScTokenChip>();
  /** Each chip's element. */
  private readonly chipOf = new WeakMap<Node, ScTokenChip>();
  /** The value the page shows. */
  private shown: ScTokenInputValue | null = null;
  private template: ScTokenInputToken | undefined;
  private composing = false;

  private readonly id = computed(
    () => this.idInput() || this.field?.id() || null,
  );
  private readonly labelledBy = computed(
    () =>
      this.labelledByInput() ||
      (this.field && !this.ariaLabel ? `${this.field.id()}-label` : null),
  );
  private readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );
  private readonly showInvalid = computed(
    () => this.root.invalid() && this.root.touched(),
  );
  private readonly empty = computed(() => this.root.value().length === 0);
  /** With a trigger menu: suggestions in a list. */
  private readonly autocomplete = computed(() =>
    this.root.ɵmenu() ? 'list' : null,
  );
  /** The menu's list, while it shows. */
  private readonly controls = computed(() => {
    const menu = this.root.ɵmenu();
    return menu?.visible() ? menu.listId : null;
  });
  /** The menu's highlighted item, while it shows. */
  private readonly activeDescendant = computed(() => {
    const menu = this.root.ɵmenu();
    return menu?.visible() ? menu.activeId() : null;
  });

  private readonly chipClass = computed(() =>
    cn(
      this.styles.combobox.chip,
      'mx-px inline-flex cursor-default align-middle select-none',
      // Its icons sized; no end padding beside the remove part (as shadcn's chip).
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
      'has-data-[slot=token-input-token-remove]:pe-0',
      'data-selected:ring-2 data-selected:ring-ring',
      'data-pending:animate-pulse data-unresolved:line-through data-unresolved:opacity-70',
    ),
  );

  private readonly class = computed(() =>
    cn(
      this.styles.textarea,
      'relative block cursor-text wrap-break-word whitespace-pre-wrap',
      'data-empty:before:pointer-events-none data-empty:before:absolute data-empty:before:text-muted-foreground data-empty:before:content-[attr(aria-placeholder)]',
      'aria-disabled:cursor-not-allowed aria-disabled:bg-input/50 aria-disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    this.root.ɵeditor.set(this);

    afterRenderEffect(() => {
      const value = this.root.value();
      const template = this.root.ɵtokenTemplate();
      untracked(() => this.show(value, template));
    });
    afterRenderEffect(() => {
      const selected = this.root.selectedToken();
      for (const [token, chip] of this.chips)
        chip.span.toggleAttribute('data-selected', token === selected);
    });

    afterNextRender(() => {
      const onSelectionChange = () => {
        if (this.document.activeElement === this.element)
          this.caret.set(this.readCaret());
      };
      this.document.addEventListener('selectionchange', onSelectionChange);
      this.destroyRef.onDestroy(() =>
        this.document.removeEventListener('selectionchange', onSelectionChange),
      );
    });

    this.destroyRef.onDestroy(() => {
      for (const chip of this.chips.values()) this.destroyChip(chip);
      this.chips.clear();
      if (this.root.ɵeditor() === this) this.root.ɵeditor.set(undefined);
    });
  }

  focus(): void {
    // Where it was: focusing puts the browser's caret at the start.
    const at = this.caret() ?? scTokenValueLength(this.root.value());
    this.element.focus();
    this.setCaret(at);
    this.caret.set(at);
  }

  refresh(): void {
    this.show(this.root.value(), this.template);
  }

  readCaret(): number | null {
    return this.readRange()?.[1] ?? null;
  }

  rectAt(offset: number): DOMRect | null {
    const { node, offset: at } = this.position(offset);
    const range = this.document.createRange();
    if (node.nodeType === TEXT && at < (node as Text).length) {
      range.setStart(node, at);
      range.setEnd(node, at + 1);
    } else {
      range.setStart(node, at);
      range.collapse(true);
    }
    const rect = range.getClientRects()[0] ?? range.getBoundingClientRect();
    return rect.width || rect.height ? rect : null;
  }

  /** The value on the page: kept when it is what the page shows. */
  private show(
    value: ScTokenInputValue,
    template: ScTokenInputToken | undefined,
  ): void {
    if (template !== this.template) {
      this.template = template;
      for (const chip of this.chips.values()) this.destroyChip(chip);
      this.chips.clear();
      this.shown = null;
    }
    const caret = this.root.ɵcaretAfter;
    this.root.ɵcaretAfter = null;
    if (this.shown && scTokenValueEqual(this.shown, value)) {
      if (caret !== null) this.placeCaret(caret);
      return;
    }
    const keep =
      caret ??
      (this.document.activeElement === this.element ? this.readCaret() : null);
    this.render(value);
    if (keep !== null) this.placeCaret(keep);
  }

  private placeCaret(offset: number): void {
    const at = Math.min(offset, scTokenValueLength(this.root.value()));
    this.caret.set(at);
    if (this.document.activeElement === this.element) this.setCaret(at);
  }

  private render(value: ScTokenInputValue): void {
    const kept = new Map<ScToken, ScTokenChip>();
    const nodes: Node[] = [];
    for (const part of value) {
      if (typeof part === 'string') {
        nodes.push(this.document.createTextNode(part));
        continue;
      }
      // The same token twice: a chip each.
      const reuse = kept.has(part) ? undefined : this.chips.get(part);
      const chip = reuse ?? this.createChip(part);
      if (!kept.has(part)) kept.set(part, chip);
      nodes.push(chip.span);
    }
    const shown = new Set(nodes);
    for (const chip of this.chips.values())
      if (!shown.has(chip.span)) this.destroyChip(chip);
    this.chips = kept;
    // A last new line shows only with a line break after it; a last token
    // needs one for the caret to go after it (Firefox puts it before the
    // token otherwise: Ctrl+End, then Backspace, took the space before it).
    const last = value[value.length - 1];
    if (
      last !== undefined &&
      (typeof last !== 'string' || last.endsWith('\n'))
    ) {
      const end = this.document.createElement('br');
      end.setAttribute('data-sc-end', '');
      nodes.push(end);
    }
    this.element.replaceChildren(...nodes);
    this.shown = value;
  }

  private createChip(token: ScToken): ScTokenChip {
    const span = this.document.createElement('span');
    span.contentEditable = 'false';
    span.setAttribute('data-slot', 'token-input-token');
    span.setAttribute('data-token-type', token.type);
    if (token.status === 'pending') span.setAttribute('data-pending', '');
    if (token.status === 'unresolved') span.setAttribute('data-unresolved', '');
    span.className = this.chipClass();
    const template = this.template;
    if (!template) {
      span.textContent = token.label;
      const chip = { token, span };
      this.chipOf.set(span, chip);
      return chip;
    }
    const injector = Injector.create({
      providers: [
        {
          provide: SC_TOKEN_INPUT_TOKEN,
          useValue: {
            token,
            remove: () => this.root.ɵremove(token, 'remove-press'),
          },
        },
      ],
      parent: this.injector,
    });
    const view = template.templateRef.createEmbeddedView(
      { $implicit: token },
      injector,
    );
    this.appRef.attachView(view);
    view.detectChanges();
    span.append(...view.rootNodes);
    const chip = { token, span, view };
    this.chipOf.set(span, chip);
    return chip;
  }

  private destroyChip(chip: ScTokenChip): void {
    if (!chip.view) return;
    this.appRef.detachView(chip.view);
    chip.view.destroy();
  }

  private onFocus(): void {
    this.focused.set(true);
    this.caret.set(this.readCaret());
  }

  private onBeforeInput(event: InputEvent): void {
    const root = this.root;
    if (!root.editable()) {
      event.preventDefault();
      return;
    }
    const type = event.inputType;
    root.ɵcaretBefore = this.readRange()?.[0] ?? null;
    if (type.startsWith('format')) {
      event.preventDefault();
    } else if (type === 'historyUndo' || type === 'historyRedo') {
      event.preventDefault();
      if (type === 'historyUndo') root.undo();
      else root.redo();
    } else if (type === 'insertParagraph' || type === 'insertLineBreak') {
      event.preventDefault();
      this.replaceSelection(['\n']);
    } else if (type === 'insertFromDrop' || type === 'deleteByDrag') {
      event.preventDefault();
    } else if (
      type.startsWith('delete') &&
      type !== 'deleteByCut' &&
      !event.isComposing &&
      this.delete(type)
    ) {
      event.preventDefault();
    }
  }

  /** A deletion that touches a token, or a word or line: its own. */
  private delete(type: string): boolean {
    const range = this.readRange();
    if (!range) return false;
    const root = this.root;
    const value = root.value();
    const [start, end] = range;
    if (start !== end) {
      if (
        !scTokenValueSlice(value, start, end).some((p) => typeof p !== 'string')
      )
        return false;
      root.ɵcommit(
        scTokenValueSplice(value, start, end, []),
        'input-change',
        start,
      );
      return true;
    }
    const backward = type.includes('Backward');
    const at = backward ? start - 1 : start;
    const next = scTokenValueAt(value, at);
    if (next === undefined) return false;
    if (typeof next !== 'string') {
      root.ɵdeleteToken(next, at, at);
      return true;
    }
    const word = type.includes('Word');
    const line = type.includes('Line');
    if (!word && !line) return false;
    const flat = scTokenValueFlat(value);
    let from = start;
    let to = start;
    if (backward) {
      if (line) while (from > 0 && !/[\n￼]/.test(flat[from - 1])) from--;
      else {
        while (from > 0 && /[^\S\n]/.test(flat[from - 1])) from--;
        while (from > 0 && !/[\s￼]/.test(flat[from - 1])) from--;
      }
      if (from === start) from = start - 1;
    } else {
      if (line) while (to < flat.length && !/[\n￼]/.test(flat[to])) to++;
      else {
        while (to < flat.length && /[^\S\n]/.test(flat[to])) to++;
        while (to < flat.length && !/[\s￼]/.test(flat[to])) to++;
      }
      if (to === start) to = start + 1;
    }
    root.ɵcommit(scTokenValueSplice(value, from, to, []), 'input-change', from);
    return true;
  }

  private onInput(event: Event): void {
    if (this.composing || (event as InputEvent).isComposing) return;
    this.readBack();
  }

  private onCompositionStart(): void {
    this.composing = true;
  }

  private onCompositionEnd(): void {
    this.composing = false;
    this.readBack();
  }

  /** What the browser typed: read from the page into the value. */
  private readBack(): void {
    const { value, clean } = this.read();
    const caret = this.readCaret();
    if (!clean) this.shown = null;
    else this.shown = value;
    if (!scTokenValueEqual(value, this.root.value())) {
      this.root.ɵcommit(value, 'input-change', caret, { typing: true });
    } else if (!clean) {
      this.render(value);
      if (caret !== null) this.placeCaret(caret);
    }
    this.caret.set(caret);
  }

  /** The page's text and chips — and whether it is as the editor writes it. */
  private read(): { value: ScTokenInputValue; clean: boolean } {
    const parts: (string | ScToken)[] = [];
    let clean = true;
    const walk = (parent: Node, top: boolean) => {
      const nodes = Array.from(parent.childNodes);
      nodes.forEach((node, index) => {
        if (node.nodeType === TEXT) {
          parts.push((node as Text).data);
          return;
        }
        if (node.nodeType !== ELEMENT) return;
        const element = node as HTMLElement;
        const chip = this.chipOf.get(element);
        if (chip) {
          parts.push(chip.token);
          if (!top) clean = false;
          return;
        }
        if (element.tagName === 'BR') {
          // The last line break only shows the line before it.
          if (top && index === nodes.length - 1) {
            if (!element.hasAttribute('data-sc-end')) clean = false;
            return;
          }
          parts.push('\n');
          clean = false;
          return;
        }
        clean = false;
        if (/^(DIV|P)$/.test(element.tagName) && parts.length) parts.push('\n');
        walk(element, false);
      });
    };
    walk(this.element, true);
    return { value: scTokenValueNormalize(parts), clean };
  }

  private onKeydown(event: KeyboardEvent): void {
    const root = this.root;
    if (root.ɵmenu()?.onKeydown(event)) return;
    if (event.isComposing) return;
    const mod = event.ctrlKey || event.metaKey;
    if (
      !['Backspace', 'Delete', 'Shift', 'Control', 'Alt', 'Meta'].includes(
        event.key,
      )
    )
      root.selectedToken.set(null);
    if (event.key === 'Enter') {
      const shortcut = root.submitShortcut();
      if (
        (shortcut === 'enter' && !event.shiftKey && !mod) ||
        (shortcut === 'mod+enter' && mod)
      ) {
        event.preventDefault();
        root.ɵsubmit();
      }
      return;
    }
    const key = event.key.toLowerCase();
    if (mod && !event.altKey && key === 'z') {
      event.preventDefault();
      if (event.shiftKey) root.redo();
      else root.undo();
      return;
    }
    if (mod && !event.altKey && !event.shiftKey && key === 'y') {
      event.preventDefault();
      root.redo();
      return;
    }
    if (
      (event.key === 'ArrowLeft' || event.key === 'ArrowRight') &&
      !event.shiftKey &&
      !mod &&
      !event.altKey
    ) {
      const range = this.readRange();
      if (!range || range[0] !== range[1]) return;
      const rtl = getComputedStyle(this.element).direction === 'rtl';
      const forward = (event.key === 'ArrowRight') !== rtl;
      const at = forward ? range[0] : range[0] - 1;
      const next = scTokenValueAt(root.value(), at);
      if (next !== undefined && typeof next !== 'string') {
        // Over the token in one press: the caret never stops inside one.
        event.preventDefault();
        const caret = forward ? range[0] + 1 : range[0] - 1;
        this.setCaret(caret);
        this.caret.set(caret);
      }
    }
  }

  private onCopy(event: ClipboardEvent): void {
    const range = this.readRange();
    if (!range || range[0] === range[1] || !event.clipboardData) return;
    event.preventDefault();
    event.clipboardData.setData(
      'text/plain',
      tokenInputToText(
        scTokenValueSlice(this.root.value(), range[0], range[1]),
        this.root.codec(),
      ),
    );
  }

  private onCut(event: ClipboardEvent): void {
    const range = this.readRange();
    if (!range || range[0] === range[1]) return;
    this.onCopy(event);
    if (!this.root.editable()) return;
    event.preventDefault();
    this.root.ɵcaretBefore = range[0];
    this.root.ɵcommit(
      scTokenValueSplice(this.root.value(), range[0], range[1], []),
      'cut',
      range[0],
    );
  }

  private onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    if (!this.root.editable()) return;
    const text = (event.clipboardData?.getData('text/plain') ?? '').replace(
      /\r\n?/g,
      '\n',
    );
    if (!text) return;
    // Tokens pasted are new ones: new ids.
    const parts = tokenInputFromText(text, this.root.codec()).map((part) =>
      typeof part === 'string'
        ? part
        : { type: part.type, value: part.value, label: part.label },
    );
    this.replaceSelection(parts, 'paste');
  }

  private replaceSelection(
    parts: ScTokenInputValue,
    reason: 'input-change' | 'paste' = 'input-change',
  ): void {
    const value = this.root.value();
    const length = scTokenValueLength(value);
    const [start, end] = this.readRange() ?? [length, length];
    const inserted = scTokenValueNormalize(parts);
    this.root.ɵcommit(
      scTokenValueSplice(value, start, end, inserted),
      reason,
      start + scTokenValueLength(inserted),
    );
  }

  /** The selection, as offsets (a character each, a token one). */
  private readRange(): [number, number] | null {
    const selection = this.document.getSelection();
    if (!selection?.rangeCount) return null;
    const range = selection.getRangeAt(0);
    if (
      !this.element.contains(range.startContainer) ||
      !this.element.contains(range.endContainer)
    )
      return null;
    const start = this.offsetOf(range.startContainer, range.startOffset);
    const end = this.offsetOf(range.endContainer, range.endOffset);
    return start <= end ? [start, end] : [end, start];
  }

  private offsetOf(node: Node, offset: number): number {
    const element = this.element;
    const nodes = Array.from(element.childNodes);
    if (node === element) return this.lengthOf(nodes.slice(0, offset));
    let child: Node = node;
    while (child.parentNode && child.parentNode !== element)
      child = child.parentNode;
    if (child.parentNode !== element) return 0;
    const before = this.lengthOf(
      nodes.slice(0, nodes.indexOf(child as ChildNode)),
    );
    if (this.isChip(child))
      return before + (node === child && offset === 0 ? 0 : 1);
    if (child.nodeType === TEXT)
      return before + Math.min(offset, (child as Text).length);
    const range = this.document.createRange();
    range.setStart(child, 0);
    range.setEnd(node, offset);
    return before + range.toString().length;
  }

  private lengthOf(nodes: Node[]): number {
    let length = 0;
    for (const node of nodes) length += this.lengthOfNode(node);
    return length;
  }

  private lengthOfNode(node: Node): number {
    if (node.nodeType === TEXT) return (node as Text).length;
    if (node.nodeType !== ELEMENT) return 0;
    if (this.isChip(node)) return 1;
    const element = node as HTMLElement;
    if (element.tagName === 'BR')
      return node === this.element.lastChild ? 0 : 1;
    return element.textContent?.length ?? 0;
  }

  private isChip(node: Node): boolean {
    return this.chipOf.has(node);
  }

  /** The page's place for an offset. */
  private position(offset: number): { node: Node; offset: number } {
    const element = this.element;
    const nodes = Array.from(element.childNodes);
    let rest = offset;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const length = this.lengthOfNode(node);
      if (node.nodeType === TEXT && rest <= length)
        return { node, offset: rest };
      if (rest === 0) return { node: element, offset: i };
      rest -= length;
      if (rest < 0) return { node: element, offset: i + 1 };
    }
    const end = element.lastChild?.nodeName === 'BR' ? 1 : 0;
    return { node: element, offset: nodes.length - end };
  }

  private setCaret(offset: number): void {
    const selection = this.document.getSelection();
    if (!selection) return;
    const { node, offset: at } = this.position(offset);
    selection.collapse(node, at);
  }
}
