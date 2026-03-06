import {
  DestroyRef,
  Directive,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad|iPod/.test(navigator.platform);

const MAC_SYMBOLS: Record<string, string> = {
  mod: '⌘',
  meta: '⌘',
  ctrl: '⌃',
  alt: '⌥',
  shift: '⇧',
};

const OTHER_SYMBOLS: Record<string, string> = {
  mod: 'Ctrl',
  meta: 'Ctrl',
  ctrl: 'Ctrl',
  alt: 'Alt',
  shift: 'Shift',
};

const MODIFIER_SYMBOLS = isMac ? MAC_SYMBOLS : OTHER_SYMBOLS;

@Directive({
  selector: '[scHotkey]',
  exportAs: 'scHotkey',
})
export class ScHotkey {
  /** Key combo string, e.g. 'ctrl+j', 'meta+k', 'mod+j' (mod = meta or ctrl) */
  readonly key = input.required<string>({ alias: 'scHotkey' });
  readonly scHotkeyPressed = output();

  readonly displayKey = computed(() => {
    const parts = this.key().toLowerCase().split('+');
    const mapped = parts.map((p) => MODIFIER_SYMBOLS[p] ?? p.toUpperCase());
    return mapped.join(isMac ? '' : '+');
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    const handler = (e: KeyboardEvent) => {
      const parts = this.key().toLowerCase().split('+');
      const targetKey = parts.pop();

      const hasMod = parts.includes('mod');
      const needsCtrl = parts.includes('ctrl') || (hasMod && !isMac);
      const needsMeta = parts.includes('meta') || (hasMod && isMac);
      const needsAlt = parts.includes('alt');
      const needsShift = parts.includes('shift');

      if (
        e.key.toLowerCase() === targetKey &&
        e.ctrlKey === needsCtrl &&
        e.metaKey === needsMeta &&
        e.altKey === needsAlt &&
        e.shiftKey === needsShift
      ) {
        e.preventDefault();
        this.scHotkeyPressed.emit();
      }
    };

    document.addEventListener('keydown', handler);
    destroyRef.onDestroy(() =>
      document.removeEventListener('keydown', handler),
    );
  }
}
