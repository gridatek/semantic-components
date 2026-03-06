import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Directive,
  PLATFORM_ID,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

function detectMac(platformId: object): boolean {
  if (!isPlatformBrowser(platformId)) return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
}

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

@Directive({
  selector: '[scHotkey]',
  exportAs: 'scHotkey',
})
export class ScHotkey {
  /** Key combo string, e.g. 'ctrl+j', 'meta+k', 'mod+j' (mod = meta or ctrl) */
  readonly key = input.required<string>({ alias: 'scHotkey' });
  readonly scHotkeyPressed = output();

  private readonly isMac = detectMac(inject(PLATFORM_ID));
  private readonly modifierSymbols = this.isMac ? MAC_SYMBOLS : OTHER_SYMBOLS;

  readonly displayKey = computed(() => {
    const parts = this.key().toLowerCase().split('+');
    const mapped = parts.map((p) => this.modifierSymbols[p] ?? p.toUpperCase());
    return mapped.join(this.isMac ? '' : '+');
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    const doc = inject(DOCUMENT);
    const isMac = this.isMac;

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

    doc.addEventListener('keydown', handler);
    destroyRef.onDestroy(() => doc.removeEventListener('keydown', handler));
  }
}
