import type {
  ScPdfAnnotationType,
  ScPdfComment,
  ScPdfEditorMode,
} from './pdf-viewer-types';

/** pdf.js's editor modes (`AnnotationEditorType`), by our names. */
export const EDITOR_MODES: Record<ScPdfEditorMode, number> = {
  none: 0,
  freetext: 3,
  highlight: 9,
  stamp: 13,
  ink: 15,
  // pdf.js's comment mode: the comments listed, every annotation editable.
  comment: 16,
  signature: 101,
};

/** pdf.js's editor parameters (`AnnotationEditorParamsType`). */
export const EDITOR_PARAMS = {
  CREATE: 2,
  FREETEXT_SIZE: 11,
  FREETEXT_COLOR: 12,
  INK_COLOR: 21,
  INK_THICKNESS: 22,
  INK_OPACITY: 23,
  HIGHLIGHT_COLOR: 31,
  HIGHLIGHT_THICKNESS: 32,
  HIGHLIGHT_SHOW_ALL: 34,
} as const;

/** A placed signature's height on the page, in PDF units (as pdf.js). */
export const SIGNATURE_HEIGHT = 40;

/** What the viewer uses of a pdf.js editor (`AnnotationEditor`). */
export interface ScPdfJsEditor {
  /** Its id: its element's, and `getEditor`'s key. */
  readonly id: string;
  readonly uid: string;
  /** Its element on the page (its toolbar goes in it). */
  readonly div: HTMLElement | null;
  readonly isSelected: boolean;
  /**
   * Off while focus is in its toolbar: focus there doesn't select it again,
   * or commit it (pdf.js's own toolbar buttons do the same).
   */
  _focusEventsAllowed: boolean;
  readonly pageIndex: number;
  readonly editorType: string;
  /** Alt text (images): `{ altText, decorative }`. */
  altTextData: { altText?: string | null; decorative?: boolean } | undefined;
  altTextFinish(): void;
  /** Its comment: read `{ text }`; write the text, or `null` to delete it. */
  comment: { text?: string | null } | string | null;
  getData(): ScPdfJsComment;
  remove(): void;
  /** Opens its comment for writing (pdf.js's comment manager: ours). */
  editComment(): unknown;
  /** Its alt text (images): made with its toolbar. */
  createAltText(): unknown;
  hasAltText(): boolean;
  /** A signature from an image (`SignatureEditor`). */
  getFromImage?(bitmap: ImageBitmap): unknown;
  addSignature?(
    data: unknown,
    heightInPage: number,
    description: string,
    uuid: string | null,
  ): void;
}

/** What the viewer uses of pdf.js's `AnnotationEditorUIManager`. */
export interface ScPdfJsUiManager {
  getEditor(id: string): ScPdfJsEditor | undefined;
  /** Selects one editor (and no other). */
  setSelected(editor: ScPdfJsEditor): void;
  /** Deletes the selected editors (undoable: the undo bar). */
  delete(): void;
  removeEditListeners(): void;
  addEditListeners(): void;
  selectComment(pageIndex: number, uid: string): void;
  deleteComment(editor: ScPdfJsEditor, savedData: unknown): void;
}

/** A comment as pdf.js describes it (an editor's `getData()`, or an annotation). */
export interface ScPdfJsComment {
  id: string;
  pageIndex: number;
  rect?: number[];
  contentsObj?: { str?: string };
  creationDate?: unknown;
  modificationDate?: unknown;
  color?: unknown;
  popupRef?: unknown;
}

/** What the managers below ask of the viewer. */
export interface ScPdfEditingHost {
  editAltText(uiManager: ScPdfJsUiManager, editor: ScPdfJsEditor): void;
  getSignature(editor: ScPdfJsEditor): void;
  setCommentsUiManager(uiManager: ScPdfJsUiManager): void;
  /** What comment buttons control (`aria-controls`): where the comments are written. */
  commentDialogElement(): Element;
  editComment(editor: ScPdfJsEditor): void;
  setComments(comments: ScPdfJsComment[]): void;
  updateComment(comment: ScPdfJsComment): void;
  removeComments(ids: string[]): void;
  showComment(editor: ScPdfJsEditor | null): void;
  showUndo(undo: () => void, what: string | number): void;
  hideUndo(): void;
}

/**
 * pdf.js's editors ask its viewer application for dialogs and bars — alt
 * text, signatures, comments, the undo bar (`altTextManager`,
 * `signatureManager`, `commentManager`, `editorUndoBar`). These hand the
 * asks to the viewer, whose parts are the dialogs and the bar.
 */
export function editorManagers(host: ScPdfEditingHost) {
  return {
    altTextManager: {
      editAltText: (uiManager: ScPdfJsUiManager, editor: ScPdfJsEditor) =>
        host.editAltText(uiManager, editor),
      destroy: () => undefined,
    },
    signatureManager: {
      getSignature: ({ editor }: { editor: ScPdfJsEditor }) =>
        host.getSignature(editor),
      // The saved signatures are yours (`savedSignatures`), in your toolbar.
      loadSignatures: () => Promise.resolve(),
      // No button of pdf.js's own in the signature's toolbar.
      renderEditButton: () => Promise.resolve(null),
      destroy: () => undefined,
    },
    commentManager: {
      get dialogElement() {
        return host.commentDialogElement();
      },
      setSidebarUiManager: (uiManager: ScPdfJsUiManager) =>
        host.setCommentsUiManager(uiManager),
      showDialog: (_uiManager: ScPdfJsUiManager, editor: ScPdfJsEditor) =>
        host.editComment(editor),
      showSidebar: (comments: ScPdfJsComment[]) => host.setComments(comments),
      hideSidebar: () => undefined,
      updateComment: (comment: ScPdfJsComment) => host.updateComment(comment),
      removeComments: (ids: string[]) => host.removeComments(ids),
      toggleCommentPopup: (editor: ScPdfJsEditor | null, isSelected: boolean) =>
        host.showComment(editor && isSelected ? editor : null),
      destroyPopup: () => host.showComment(null),
      updatePopupColor: () => undefined,
      makeCommentColor: (color: unknown, opacity?: number) =>
        cssColor(color, opacity),
      destroy: () => undefined,
    },
    editorUndoBar: {
      show: (undo: () => void, what: string | number) =>
        host.showUndo(undo, what),
      hide: () => host.hideUndo(),
      destroy: () => host.hideUndo(),
    },
  };
}

/** What the undo bar says pdf.js deleted: one annotation (its type), several, a comment. */
export function undoneAnnotation(what: string | number): {
  kind: 'annotation-deleted' | 'annotations-deleted' | 'comment-deleted';
  count: number;
  annotation?: ScPdfAnnotationType;
} {
  if (typeof what === 'number') {
    return { kind: 'annotations-deleted', count: what };
  }
  if (what === 'comment') return { kind: 'comment-deleted', count: 1 };
  return {
    kind: 'annotation-deleted',
    count: 1,
    annotation: what as ScPdfAnnotationType,
  };
}

/** A comment of pdf.js's, as the viewer lists it. */
export function toComment(data: ScPdfJsComment): ScPdfComment {
  return {
    id: data.id,
    pageNumber: data.pageIndex + 1,
    text: data.contentsObj?.str ?? '',
    date: toInstant(data.modificationDate ?? data.creationDate),
    color: cssColor(data.color),
  };
}

/** pdf.js's colours: CSS already, or `[r, g, b]` (0–255). */
function cssColor(color: unknown, opacity = 1): string | null {
  if (typeof color === 'string') return color;
  if (color && typeof color === 'object' && 'length' in color) {
    const [r, g, b] = Array.from(color as ArrayLike<number>);
    return opacity < 1
      ? `rgb(${r} ${g} ${b} / ${opacity})`
      : `rgb(${r} ${g} ${b})`;
  }
  return null;
}

/**
 * pdf.js's dates: a PDF date (`D:20250131120000+01'00'`), or a JavaScript
 * date object (an edited comment).
 */
function toInstant(value: unknown): Temporal.Instant | null {
  if (value && typeof value === 'object' && 'getTime' in value) {
    const ms = (value as { getTime(): number }).getTime();
    return Number.isFinite(ms)
      ? Temporal.Instant.fromEpochMilliseconds(ms)
      : null;
  }
  if (typeof value !== 'string') return null;
  const match =
    /^D:(\d{4})(\d{2})?(\d{2})?(\d{2})?(\d{2})?(\d{2})?([Z+-])?(\d{2})?'?(\d{2})?/.exec(
      value,
    );
  if (!match) return null;
  const [
    ,
    year,
    month = '01',
    day = '01',
    hour = '00',
    minute = '00',
    second = '00',
    sign,
    offsetHours = '00',
    offsetMinutes = '00',
  ] = match;
  const offset =
    sign === '+' || sign === '-'
      ? `${sign}${offsetHours}:${offsetMinutes}`
      : 'Z';
  try {
    return Temporal.Instant.from(
      `${year}-${month}-${day}T${hour}:${minute}:${second}${offset}`,
    );
  } catch {
    return null;
  }
}
