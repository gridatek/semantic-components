import { Component, ViewEncapsulation, computed, input } from '@angular/core';

/** Names that say nothing as a link's text, alone ("Link" reads as a link to WAVE). */
const VAGUE = new Set(['link']);

/**
 * A page's name in a link (the sidebar, the menus, the Components page):
 * the name, and — when it alone would be a vague link text, the Link
 * component's "Link" — " component" for screen readers (WAVE's suspicious
 * link text).
 */
@Component({
  // On the link's span, as the Logo on its svg: an attribute.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'span[app-page-name]',
  template: `{{ name() }}
    @if (vague()) {
      <span class="sr-only"> component</span>
    }`,
  encapsulation: ViewEncapsulation.None,
})
export class PageName {
  readonly name = input.required<string>();

  private readonly vague = computed(() =>
    VAGUE.has(this.name().trim().toLowerCase()),
  );
}
