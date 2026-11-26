import {
  DestroyRef,
  Service,
  type Signal,
  inject,
  signal,
} from '@angular/core';
import { ScStorage } from '../../utils/storage';

/**
 * A choice of the user's from a fixed list, kept and shown as a `data-*`
 * attribute. Without a `defaultValue`, nothing chosen is `undefined` (and
 * no attribute): the app decides.
 */
export interface ScPreferenceDefinition<
  V extends string = string,
  D extends V | undefined = V | undefined,
> {
  /** The attribute it is written in: `data-view`, `data-density`… */
  readonly attribute: `data-${string}`;
  /** The values it can take. */
  readonly values: readonly V[];
  /** Its value while none is saved (or the one saved isn't in `values`); left out, `undefined`. */
  readonly defaultValue?: D;
  /** Kept under this name (a cookie the server reads, copied to `localStorage`); without it, for the app's life. */
  readonly storageKey?: string;
  /** On `<html>`, for the whole page — not on the element that applies it. */
  readonly global?: boolean;
}

/** A preference, declared once in a file of yours; `injectPreference` gives its value. */
export function definePreference<
  const V extends string,
  const D extends V | undefined = undefined,
>(definition: ScPreferenceDefinition<V, D>): ScPreferenceDefinition<V, D> {
  return definition;
}

/** A preference's value, the same everywhere in the app. */
export interface ScPreference<
  V extends string = string,
  D extends V | undefined = V | undefined,
> {
  readonly definition: ScPreferenceDefinition<V, D>;
  /** Its value: the one saved, or its default (`undefined` without one). */
  readonly value: Signal<V | D>;
  /**
   * Chosen: saved (if it has a `storageKey`), shown everywhere it applies;
   * `undefined` forgets the choice.
   */
  set(value: V | undefined): boolean;
}

/**
 * The app's preferences: one each, read from `ScStorage` (the request's
 * cookie on the server — a page rendered per request is drawn with them),
 * kept in step with other tabs (the `storage` event).
 */
@Service()
export class ScPreferences {
  private readonly storage = inject(ScStorage);
  private readonly instances = new Map<
    ScPreferenceDefinition,
    {
      readonly preference: ScPreference;
      readonly value: ReturnType<typeof signal<string | undefined>>;
    }
  >();

  /** Watching other tabs: stopped with the app. */
  private readonly stops: (() => void)[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stops.forEach((stop) => stop()));
  }

  /** The preference's instance. */
  get<V extends string, D extends V | undefined>(
    definition: ScPreferenceDefinition<V, D>,
  ): ScPreference<V, D> {
    let entry = this.instances.get(definition);
    if (!entry) {
      const value = signal<string | undefined>(
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
        set: (next: string | undefined) => {
          if (next === undefined) {
            // Forgotten: its default, or nothing.
            if (value() === definition.defaultValue) return false;
            value.set(definition.defaultValue);
            if (definition.storageKey)
              this.storage.remove(definition.storageKey);
            return true;
          }
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
      // Another tab chose: here too.
      if (definition.storageKey)
        this.stops.push(
          this.storage.watch(definition.storageKey, (saved) =>
            value.set(this.valid(definition, saved)),
          ),
        );
    }
    return entry.preference as unknown as ScPreference<V, D>;
  }

  /** A value it can take, else its default (`undefined` without one). */
  private valid(
    definition: ScPreferenceDefinition,
    saved: string | null,
  ): string | undefined {
    return saved !== null &&
      (definition.values as readonly string[]).includes(saved)
      ? saved
      : definition.defaultValue;
  }
}

/** A preference's value, in a component or a service: `value()`, `set()`. */
export function injectPreference<V extends string, D extends V | undefined>(
  definition: ScPreferenceDefinition<V, D>,
): ScPreference<V, D> {
  return inject(ScPreferences).get(definition);
}
