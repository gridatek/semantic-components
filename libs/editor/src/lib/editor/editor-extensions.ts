import { Injectable, computed, signal } from '@angular/core';

/**
 * Service that manages TipTap editor extensions state.
 * Extensions are automatically enabled when their corresponding actions are added to templates.
 * This service provides reactive signals to track which extensions are currently active.
 */
@Injectable()
export class ScEditorExtensions {
  // =============================================================================
  // FORMATTING EXTENSIONS
  // =============================================================================

  /** Tracks bold text formatting extension */
  readonly bold = signal<boolean>(false);

  /** Tracks italic text formatting extension */
  readonly italic = signal<boolean>(false);

  /** Tracks underline text formatting extension */
  readonly underline = signal<boolean>(false);

  /** Tracks strikethrough text formatting extension */
  readonly strike = signal<boolean>(false);

  /** Tracks inline code formatting extension */
  readonly code = signal<boolean>(false);

  /** Tracks text highlighting extension */
  readonly highlight = signal<boolean>(false);

  /** Tracks text color extension */
  readonly color = signal<boolean>(false);

  /** Tracks font family selection extension */
  readonly fontFamily = signal<boolean>(false);

  /** Tracks text style extension (required for color/font family) */
  readonly textStyle = signal<boolean>(false);

  // =============================================================================
  // TEXT ALIGNMENT EXTENSIONS
  // =============================================================================

  /** Tracks left text alignment extension */
  readonly textAlignLeft = signal<boolean>(false);

  /** Tracks center text alignment extension */
  readonly textAlignCenter = signal<boolean>(false);

  /** Tracks right text alignment extension */
  readonly textAlignRight = signal<boolean>(false);

  /** Computed: true if any text alignment extension is active */
  readonly textAlign = computed(
    () => this.textAlignLeft() || this.textAlignCenter() || this.textAlignRight(),
  );

  // =============================================================================
  // LIST EXTENSIONS
  // =============================================================================

  /** Tracks bullet list extension */
  readonly bulletList = signal<boolean>(false);

  /** Tracks ordered/numbered list extension */
  readonly orderedList = signal<boolean>(false);

  /** Computed: true if any list extension is active */
  readonly list = computed(() => this.bulletList() || this.orderedList());

  // =============================================================================
  // BLOCK EXTENSIONS
  // =============================================================================

  /** Tracks blockquote extension */
  readonly blockquote = signal<boolean>(false);

  /** Tracks code block extension */
  readonly codeBlock = signal<boolean>(false);

  /** Tracks horizontal rule extension */
  readonly horizontalRule = signal<boolean>(false);

  // =============================================================================
  // LINK EXTENSIONS
  // =============================================================================

  /** Tracks link insertion extension */
  readonly setLink = signal<boolean>(false);

  /** Tracks link removal extension */
  readonly unsetLink = signal<boolean>(false);

  /** Computed: true if any link extension is active */
  readonly link = computed(() => this.setLink() || this.unsetLink());

  // =============================================================================
  // MEDIA EXTENSIONS
  // =============================================================================

  /** Tracks image insertion extension */
  readonly image = signal<boolean>(false);

  /** Tracks YouTube video embedding extension */
  readonly youtube = signal<boolean>(false);

  // =============================================================================
  // TABLE EXTENSIONS
  // =============================================================================

  /** Tracks table functionality extension */
  readonly table = signal<boolean>(false);

  // =============================================================================
  // HISTORY EXTENSIONS
  // =============================================================================

  /** Tracks undo functionality extension */
  readonly undo = signal<boolean>(false);

  /** Tracks redo functionality extension */
  readonly redo = signal<boolean>(false);

  /** Computed: true if any history extension is active */
  readonly undoRedo = computed(() => this.undo() || this.redo());
}
