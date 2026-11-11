import { type Highlightable, _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScCommand } from './command';
import { ScCommandGroup } from './command-group';

/**
 * A command (`role="option"`): run by Enter or a click — `(select)`; on a
 * link, the link is followed. Hidden while it doesn't match the search: its
 * text (or `value`) and its `keywords`.
 */
@Directive({
  selector: 'div[scCommandItem], a[scCommandItem]',
  host: {
    'data-slot': 'command-item',
    role: 'option',
    tabindex: '-1',
    '[id]': 'id',
    '[attr.hidden]': 'shown() ? null : ""',
    '[attr.aria-selected]': 'highlighted()',
    '[attr.aria-disabled]': 'disabledInput() || null',
    '[attr.data-disabled]': 'disabledInput() || null',
    '[attr.data-selected]': 'highlighted() || null',
    '[class]': 'class()',
    '(pointermove)':
      'command.highlightItemOnHover() && command.highlight(this)',
    '(mousedown)': '$event.preventDefault()',
    '(click)': 'onClick($event)',
  },
})
export class ScCommandItem implements Highlightable {
  private readonly styles = injectPreset().command;
  protected readonly command = inject(ScCommand);
  /** The group it is in. */
  readonly group = inject(ScCommandGroup, { optional: true });
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly id = inject(_IdGenerator).getId('sc-command-item-');

  readonly classInput = input<string>('', { alias: 'class' });
  /** What the search matches: its text when not set. */
  readonly value = input('');
  /** More words it is found by. */
  readonly keywords = input<readonly string[]>([]);
  readonly disabledInput = input(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  /** Shown whatever the search (a "Search for …" item). */
  readonly forceMount = input(false, { transform: booleanAttribute });

  /** Run: Enter or a click. */
  readonly select = output<void>();

  /** Its text, read once rendered. */
  private readonly text = signal('');
  protected readonly highlighted = signal(false);

  /** Shown: it matches the search, or always shown. */
  readonly shown = computed(
    () =>
      this.forceMount() ||
      this.command.matches(this.value() || this.text(), this.keywords()),
  );

  /** For the key manager: skipped when disabled. */
  get disabled(): boolean {
    return this.disabledInput();
  }

  protected readonly class = computed(() =>
    cn(this.styles.item, this.classInput()),
  );

  constructor() {
    afterNextRender(() =>
      this.text.set(this.element.textContent?.trim() ?? ''),
    );
    this.command.register(this);
    inject(DestroyRef).onDestroy(() => this.command.unregister(this));
  }

  setActiveStyles(): void {
    this.highlighted.set(true);
    this.element.scrollIntoView?.({ block: 'nearest' });
  }

  setInactiveStyles(): void {
    this.highlighted.set(false);
  }

  /** Runs it: a link is followed (its click), anything else emits `select`. */
  run(): void {
    if (this.disabledInput()) return;
    if (this.element instanceof HTMLAnchorElement) this.element.click();
    else this.select.emit();
  }

  protected onClick(event: Event): void {
    if (this.disabledInput()) {
      event.preventDefault();
      return;
    }
    // A link is followed by the browser too.
    this.select.emit();
  }
}
