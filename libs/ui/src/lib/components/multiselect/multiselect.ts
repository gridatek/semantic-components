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
import { ScMultiselectList } from './multiselect-list';
import { ScMultiselectOrigin } from './multiselect-origin';
import { ScMultiselectPortal } from './multiselect-portal';

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
  selector: 'div[scMultiselect]',
  imports: [ComboboxPopupContainer, OverlayModule, NgTemplateOutlet],
  hostDirectives: [
    {
      directive: Combobox,
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
          <ng-container [ngTemplateOutlet]="multiselectPortal().templateRef" />
        </ng-template>
      }
    </ng-template>
  `,
  host: {
    'data-slot': 'multiselect',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiselect {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly positions = positions;

  protected readonly class = computed(() => cn('relative', this.classInput()));

  private readonly trigger = contentChild(ScMultiselectOrigin);
  private readonly list = contentChild(ScMultiselectList, {
    descendants: true,
  });
  protected readonly multiselectPortal =
    contentChild.required(ScMultiselectPortal);

  readonly origin = computed(() => this.trigger()?.elementRef);

  // Persist selected values across overlay destroy/create cycles
  private readonly _storedValues = signal<unknown[]>([]);

  readonly values = computed(
    () => this.list()?.values() ?? this._storedValues(),
  );

  protected readonly combobox = inject(Combobox);

  constructor() {
    effect(() => signalSetFn(this.combobox.readonly[SIGNAL], true));

    // Store values when selection changes
    effect(() => {
      const list = this.list();
      if (!list) return;
      const vals = list.values();
      if (vals.length > 0) {
        untracked(() => this._storedValues.set([...vals]));
      }
    });

    // Restore values when Listbox is recreated (overlay reopen)
    effect(() => {
      const list = this.list();
      if (list) {
        const stored = untracked(() => this._storedValues());
        if (stored.length > 0) {
          list.setValues(stored);
        }
      }
    });
  }
}
