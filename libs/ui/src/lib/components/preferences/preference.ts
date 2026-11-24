import { isPlatformBrowser } from '@angular/common';
import {
  DOCUMENT,
  DestroyRef,
  PLATFORM_ID,
  Service,
  type Signal,
  inject,
  signal,
} from '@angular/core';
import { ScStorage } from '../../utils/storage';

/** A choice of the user's from a fixed list, kept and shown as a `data-*` attribute. */
export interface ScPreferenceDefinition<V extends string = string> {
  /** The attribute it is written in: `data-view`, `data-density`… */
  readonly attribute: `data-${string}`;
  /** The values it can take. */
  readonly values: readonly V[];
  /** Its value while none is saved (or the one saved isn't in `values`). */
  readonly defaultValue: V;
  /** Kept under this name, after the setup's `storagePrefix` (a cookie the server reads, copied to `localStorage`); without it, for the app's life. */
  readonly storageKey?: string;
  /** On `<html>`, for the whole page — not on the element that applies it. */
  readonly global?: boolean;
}

/** A preference, declared once in a file of yours; `injectPreference` gives its value. */
export function definePreference<const V extends string>(
  definition: ScPreferenceDefinition<V>,
): ScPreferenceDefinition<V> {
  return definition;
}

/** A preference's value, the same everywhere in the app. */
export interface ScPreference<V extends string = string> {
  readonly definition: ScPreferenceDefinition<V>;
  /** Its value: the one saved, or its default. */
  readonly value: Signal<V>;
  /** Chosen: saved (if it has a `storageKey`), shown everywhere it applies. */
  set(value: V): boolean;
}

/**
 * The app's preferences: one each, read from `ScStorage` (the request's
 * cookie on the server — a page rendered per request is drawn with them),
 * kept in step with other tabs (the `storage` event).
 */
@Service()
export class ScPreferences {
  private readonly storage = inject(ScStorage);
  private readonly document = inject(DOCUMENT);
  private readonly instances = new Map<
    ScPreferenceDefinition,
    {
      readonly preference: ScPreference;
      readonly value: ReturnType<typeof signal<string>>;
    }
  >();

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const window = this.document.defaultView;
    // Another tab chose: here too.
    const onStorage = (event: StorageEvent) => {
      for (const [definition, { value }] of this.instances) {
        if (
          !definition.storageKey ||
          event.key !== this.storage.key(definition.storageKey)
        )
          continue;
        value.set(this.valid(definition, event.newValue));
      }
    };
    window?.addEventListener('storage', onStorage);
    inject(DestroyRef).onDestroy(() =>
      window?.removeEventListener('storage', onStorage),
    );
  }

  /** The preference's instance. */
  get<V extends string>(
    definition: ScPreferenceDefinition<V>,
  ): ScPreference<V> {
    let entry = this.instances.get(definition);
    if (!entry) {
      const value = signal<string>(
        this.valid(
          definition,
          definition.storageKey
            ? this.storage.get(definition.storageKey)
            : null,
        ),
      );
      const preference: ScPreference = {
        definition: definition as ScPreferenceDefinition,
        value: value.asReadonly(),
        set: (next: string) => {
          if (
            !(definition.values as readonly string[]).includes(next) ||
            next === value()
          )
            return false;
          value.set(next);
          if (definition.storageKey)
            this.storage.set(definition.storageKey, next);
          return true;
        },
      };
      entry = { preference, value };
      this.instances.set(definition, entry);
    }
    return entry.preference as ScPreference<V>;
  }

  /** A value it can take, else its default. */
  private valid(
    definition: ScPreferenceDefinition,
    saved: string | null,
  ): string {
    return saved !== null &&
      (definition.values as readonly string[]).includes(saved)
      ? saved
      : definition.defaultValue;
  }
}

/** A preference's value, in a component or a service: `value()`, `set()`. */
export function injectPreference<V extends string>(
  definition: ScPreferenceDefinition<V>,
): ScPreference<V> {
  return inject(ScPreferences).get(definition);
}
