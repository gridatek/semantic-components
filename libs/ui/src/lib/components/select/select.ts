import { Combobox, ComboboxPopupContainer } from '@angular/aria/combobox';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
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
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';
import { ScSelectList } from './select-list';
import { ScSelectOrigin } from './select-origin';
import { ScSelectPortal } from './select-portal';

const positions: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 4,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
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
          cdkConnectedOverlay
          [cdkConnectedOverlayOrigin]="origin"
          [cdkConnectedOverlayOpen]="overlayOpen()"
          [cdkConnectedOverlayPositions]="positions"
          [cdkConnectedOverlayWidth]="origin.nativeElement.offsetWidth"
          [cdkConnectedOverlayFlexibleDimensions]="true"
          [cdkConnectedOverlayGrowAfterOpen]="true"
          [cdkConnectedOverlayPush]="true"
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
  protected readonly positions = positions;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly overlayOpen = signal(false);

  private readonly trigger = contentChild(ScSelectOrigin);
  private readonly content = contentChild(ScSelectList, {
    descendants: true,
  });
  protected readonly selectPortal = contentChild.required(ScSelectPortal);

  readonly origin = computed(() => this.trigger()?.elementRef);
  readonly values = computed(() => this.content()?.values() ?? []);
  // TODO: may remove — will use value from input instead
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
    return String(value);
  });
  protected readonly class = computed(() =>
    cn('relative min-w-36 w-fit', this.classInput()),
  );

  protected readonly combobox = inject(Combobox);

  constructor() {
    effect(() => signalSetFn(this.combobox.readonly[SIGNAL], true));

    // Open overlay immediately when expanded, but keep it open during exit animation
    effect(() => {
      if (this.combobox.expanded()) {
        this.overlayOpen.set(true);
      }
    });
  }

  closeOverlay(): void {
    this.overlayOpen.set(false);
  }
}
