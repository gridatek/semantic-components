import type { Extensions, JSONContent } from '@tiptap/core';
import { InjectionToken, type Provider, inject } from '@angular/core';
import type { ScEditor } from './editor';

/** Reads and writes Markdown (`withMarkdown()`). */
export interface ScEditorMarkdown {
  parse(source: string): JSONContent;
  serialize(doc: JSONContent): string;
}

/**
 * A feature of the editor — tables, images, search… — from its own entry
 * point (`withTables()` from `@semantic-components/editor/tables`), given to
 * `provideEditor`.
 */
export interface ScEditorFeature {
  /** The function that makes it (`withTables`): parts check for it. */
  readonly name: string;
  /** What the document can hold: the editor and `scEditorView` read it. */
  readonly content?: Extensions;
  /** What only the editor does: its shortcuts, drops, searches. */
  readonly behaviour?: (editor: ScEditor) => Extensions;
  /** Reads and writes Markdown with the document's extensions. */
  readonly markdown?: (extensions: Extensions) => ScEditorMarkdown;
}

const NO_FEATURES: readonly ScEditorFeature[] = [];

/** The features the editors and displays below read (`provideEditor`). */
export const SC_EDITOR_FEATURES = new InjectionToken<
  readonly ScEditorFeature[]
>('SC_EDITOR_FEATURES', { factory: () => NO_FEATURES });

/**
 * The features of the editors and `scEditorView`s below (a component's
 * `providers`, or the app's): `provideEditor(withTables(), withMarkdown())`.
 * Without it, the editor has its core — text, headings, lists and task lists,
 * quotes, code, links. Give the editor and the display the same features, so
 * they hold the same documents.
 */
export function provideEditor(...features: ScEditorFeature[]): Provider {
  return { provide: SC_EDITOR_FEATURES, useValue: features };
}

/**
 * Your own Tiptap extensions — a mention, an embed —
 * `provideEditor(withExtensions(Mention.configure({ … })))`: the document holds
 * what they add, in the editor and `scEditorView`. Run their commands with
 * the editor's `run`.
 */
export function withExtensions(...extensions: Extensions): ScEditorFeature {
  return { name: 'withExtensions', content: extensions };
}

const warned = new Set<string>();

/**
 * For a feature's parts: warns, in development, when the feature isn't
 * provided (`ɵassertEditorFeature('withTables', 'scEditorTable')`). Call it
 * in the part's constructor. Internal: for the library's own parts.
 */
export function ɵassertEditorFeature(feature: string, part: string): void {
  if (typeof ngDevMode === 'undefined' || !ngDevMode) return;
  if (inject(SC_EDITOR_FEATURES).some((f) => f.name === feature)) return;
  const message = `${part} needs ${feature}() in provideEditor(…).`;
  if (warned.has(message)) return;
  warned.add(message);
  console.warn(message);
}
