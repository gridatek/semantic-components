import { _IdGenerator } from '@angular/cdk/a11y';
import { Overlay, type OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  type ComponentRef,
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { buildOverlayPositionsWithFallback } from '../../utils/overlay-positions';
import { ScSidebarMenuTooltipPanel } from './sidebar-menu-tooltip-panel';
import { ScSidebarState } from './sidebar-state';

/** How long the pointer rests before the label shows (the Tooltip's delay). */
const DELAY = 600;
/** The pointer's grace to cross onto the label. */
const HOVER_BRIDGE = 100;

/**
 * A menu button's label, shown beside it while the sidebar is collapsed to
 * icons (there its text is hidden) — the menu button's `tooltip`. Our
 * Tooltip's look and behaviour (the preset's `tooltip`, the delay, focus,
 * Escape, hoverable), as text: the Tooltip itself is markup, which a
 * directive on your button can't write. Exported because a public part hosts
 * it; not for use on its own. (docs/todo.md: to think about.)
 */
@Directive({
  selector: '[scSidebarMenuTooltip]',
  host: {
    '[attr.aria-describedby]': 'ref ? id : null',
    '(pointerenter)': 'onPointerEnter($event)',
    '(pointerleave)': 'onPointerLeave($event)',
    '(focus)': 'onFocus($event)',
    '(blur)': 'hide()',
    '(click)': 'hide()',
    '(keydown.escape)': 'hide()',
  },
})
export class ScSidebarMenuTooltip {
  private readonly overlay = inject(Overlay);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly state = inject(ScSidebarState, { optional: true });

  /** The label (the menu button's `tooltip`). */
  readonly tooltip = input('');

  protected readonly id = inject(_IdGenerator).getId('sc-sidebar-tooltip-');
  protected ref: OverlayRef | null = null;
  private panel: ComponentRef<ScSidebarMenuTooltipPanel> | null = null;
  private timer: ReturnType<typeof setTimeout> | undefined;

  /** Only collapsed to icons, beside the page: there the text is hidden. */
  private readonly enabled = computed(
    () =>
      !!this.tooltip() &&
      this.state?.state() === 'collapsed' &&
      !this.state?.isMobile(),
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => this.hide());
    effect(() => {
      if (!this.enabled()) untracked(() => this.hide());
    });
    effect(() => {
      const text = this.tooltip();
      untracked(() => this.panel?.setInput('text', text));
    });
  }

  protected onPointerEnter(event: PointerEvent): void {
    if (event.pointerType === 'touch' || !this.enabled()) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.show(), this.ref ? 0 : DELAY);
  }

  protected onPointerLeave(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    this.hideSoon();
  }

  protected onFocus(event: FocusEvent): void {
    if ((event.target as HTMLElement).matches(':focus-visible')) this.show();
  }

  private show(): void {
    clearTimeout(this.timer);
    if (this.ref || !this.enabled()) return;
    const element = this.element.nativeElement;
    // Towards the page: the inline end (the left in right to left).
    const rtl = getComputedStyle(element).direction === 'rtl';
    const side = rtl ? 'left' : 'right';
    this.ref = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(element)
        .withPositions(
          buildOverlayPositionsWithFallback(
            side,
            'center',
            4,
            rtl ? 'rtl' : 'ltr',
          ),
        ),
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });
    this.panel = this.ref.attach(
      new ComponentPortal(ScSidebarMenuTooltipPanel),
    );
    this.panel.setInput('text', this.tooltip());
    this.panel.setInput('id', this.id);
    this.panel.setInput('side', side);
    this.panel.instance.hovered.subscribe((on) =>
      on ? clearTimeout(this.timer) : this.hideSoon(),
    );
  }

  private hideSoon(): void {
    clearTimeout(this.timer);
    if (this.ref) this.timer = setTimeout(() => this.hide(), HOVER_BRIDGE);
  }

  hide(): void {
    clearTimeout(this.timer);
    this.ref?.dispose();
    this.ref = null;
    this.panel = null;
  }
}
