import { Combobox, ComboboxPopupContainer } from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';
import { ScSelectList } from './select-list';
import { ScSelectOrigin } from './select-origin';
import { ScSelectPortal } from './select-portal';

const positions = [
  {
    originX: 'start' as const,
    originY: 'bottom' as const,
    overlayX: 'start' as const,
    overlayY: 'top' as const,
    offsetY: 4,
  },
  {
    originX: 'start' as const,
    originY: 'top' as const,
    overlayX: 'start' as const,
    overlayY: 'bottom' as const,
    offsetY: -4,
  },
];

@Component({
  selector: 'div[scSelect]',
  exportAs: 'scSelect',
  imports: [Combobox, ComboboxPopupContainer, OverlayModule, NgTemplateOutlet],
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['disabled'],
    },
  ],
  template: `
    <ng-content />
    <ng-template ngComboboxPopupContainer>
      @if (origin(); as origin) {
        <ng-template
          [cdkConnectedOverlay]="{
            origin,
            usePopover: 'inline',
            matchWidth: true,
          }"
          [cdkConnectedOverlayOpen]="combobox.expanded()"
          [cdkConnectedOverlayPositions]="positions"
        >
          <ng-container [ngTemplateOutlet]="selectPortal().templateRef" />
        </ng-template>
      }
    </ng-template>
  `,
  host: {
    'data-slot': 'select',
    '[class]': 'class()',
    '[attr.aria-disabled]': 'combobox.disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelect {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly positions = positions;

  private readonly trigger = contentChild(ScSelectOrigin);
  private readonly content = contentChild(ScSelectList, {
    descendants: true,
  });
  protected readonly selectPortal = contentChild.required(ScSelectPortal);

  readonly origin = computed(() => this.trigger()?.elementRef);

  // Persist selected values across overlay destroy/create cycles
  private readonly _storedValues = signal<unknown[]>([]);
  private readonly _storedLabel = signal('');

  readonly values = computed(
    () => this.content()?.values() ?? this._storedValues(),
  );
  readonly value = computed(() => {
    const vals = this.values();
    return vals.length > 0 ? vals[0] : undefined;
  });
  readonly label = computed(() => {
    const value = this.value();
    if (value == null) return '';
    const list = this.content();
    if (list) {
      return list.labelForValue(value);
    }
    return this._storedLabel();
  });
  protected readonly class = computed(() =>
    cn('relative min-w-36 w-fit', this.classInput()),
  );

  protected readonly combobox = inject(Combobox);

  constructor() {
    effect(() => signalSetFn(this.combobox.readonly[SIGNAL], true));

    // Store values and label when selection changes
    effect(() => {
      const content = this.content();
      if (!content) return;
      const vals = content.values();
      if (vals.length > 0) {
        const label = content.labelForValue(vals[0]);
        untracked(() => {
          this._storedValues.set([...vals]);
          this._storedLabel.set(label);
        });
      }
    });

    // Restore values and scroll to selected when Listbox is recreated (overlay reopen)
    effect(() => {
      const content = this.content();
      if (content) {
        const stored = untracked(() => this._storedValues());
        if (stored.length > 0) {
          content.setValues(stored);
          requestAnimationFrame(() => content.scrollToSelected());
        }
      }
    });
  }
}
