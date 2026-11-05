import { TabList } from '@angular/aria/tabs';
import {
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import type { ScTabsListVariant } from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';
import { bindInput, cn, elementDirection, setInput } from '../../utils';
import { ScTabs } from './tabs';

/** The list of tabs (role tablist): one tab stop, the arrows inside. */
@Directive({
  selector: '[scTabsList]',
  exportAs: 'scTabsList',
  hostDirectives: [TabList],
  host: {
    '[class]': 'class()',
    '[attr.data-variant]': 'variant()',
  },
})
export class ScTabsList {
  private readonly styles = injectPreset().tabs;
  private readonly tabs = inject(ScTabs);
  private readonly tabList = inject(TabList);

  readonly classInput = input<string>('', { alias: 'class' });
  /** `default`: a filled box, the selected tab raised; `line`: underlined. */
  readonly variant = input<ScTabsListVariant>('default');
  /**
   * The arrow keys select the tab they move to. Off (Base UI's default):
   * they move focus, Enter or Space selects.
   */
  readonly activateOnFocus = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  /** The arrow keys go round from the last tab to the first. */
  readonly wrap = input<boolean, unknown>(true, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(this.styles.list({ variant: this.variant() }), this.classInput()),
  );

  constructor() {
    bindInput(this.tabList.orientation, this.tabs.orientation);
    bindInput(this.tabList.wrap, this.wrap);
    bindInput(
      this.tabList.selectionMode,
      computed(() => (this.activateOnFocus() ? 'follow' : 'explicit')),
    );
    // The root's value, both ways.
    effect(() => {
      const value = this.tabs.value();
      if (value !== untracked(this.tabList.selectedTab)) {
        setInput(this.tabList.selectedTab, value);
      }
    });
    effect(() => {
      const selected = this.tabList.selectedTab();
      if (selected !== untracked(this.tabs.value))
        this.tabs.value.set(selected);
    });
    // Aria reads the document's direction; the list's area may differ (a
    // right-to-left section): its arrows then follow the area.
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() =>
      this.tabList.textDirection.set(elementDirection(host)),
    );
  }
}
