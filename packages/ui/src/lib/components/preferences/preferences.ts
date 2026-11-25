import {
  DOCUMENT,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { type ScPreferenceDefinition, ScPreferences } from './preference';

/**
 * Writes preferences as `data-*` attributes — `data-view="grid"` — on its
 * element, or on `<html>` for a `global` one, and keeps them up to date: style
 * by them (`in-data-[view=grid]:grid-cols-2`). On the server too: a page
 * rendered per request has them from its first paint.
 */
@Directive({
  selector: '[scPreferences]',
  host: {
    'data-slot': 'preferences',
    '[class]': 'class()',
  },
})
export class ScPreferencesApply {
  private readonly preferences = inject(ScPreferences);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The preferences it shows. */
  readonly definitions = input.required<
    readonly ScPreferenceDefinition<string>[]
  >({ alias: 'scPreferences' });

  private readonly class = computed(() => cn(this.classInput()));

  constructor() {
    effect((onCleanup) => {
      const written: [HTMLElement, string][] = [];
      for (const definition of this.definitions()) {
        const target = definition.global
          ? this.document.documentElement
          : this.host;
        const value = this.preferences.get(definition).value();
        this.renderer.setAttribute(target, definition.attribute, value);
        written.push([target, definition.attribute]);
      }
      // Gone (or changed): its attributes with it.
      onCleanup(() => {
        for (const [target, attribute] of written)
          this.renderer.removeAttribute(target, attribute);
      });
    });
  }
}
