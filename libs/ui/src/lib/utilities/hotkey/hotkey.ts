import {
  DestroyRef,
  Directive,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

const MODIFIER_SYMBOLS: Record<string, string> = {
  mod: '⌘',
  meta: '⌘',
  ctrl: '⌃',
  alt: '⌥',
  shift: '⇧',
};

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
    return parts.map((p) => MODIFIER_SYMBOLS[p] ?? p.toUpperCase()).join('');
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    const handler = (e: KeyboardEvent) => {
      const parts = this.key().toLowerCase().split('+');
      const targetKey = parts.pop();

      const hasMod = parts.includes('mod');
      const needsCtrl = parts.includes('ctrl') || hasMod;
      const needsMeta = parts.includes('meta') || hasMod;
      const needsAlt = parts.includes('alt');
      const needsShift = parts.includes('shift');

      const ctrlOrMetaMatch = hasMod
        ? e.ctrlKey || e.metaKey
        : e.ctrlKey === needsCtrl && e.metaKey === needsMeta;

      if (
        e.key.toLowerCase() === targetKey &&
        ctrlOrMetaMatch &&
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
