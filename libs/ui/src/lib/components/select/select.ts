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
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';
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
  protected readonly selectPortal = contentChild.required(ScSelectPortal);
  readonly origin = computed(() => this.trigger()?.elementRef);

  protected readonly class = computed(() =>
    cn('relative min-w-36 w-fit', this.classInput()),
  );

  protected readonly combobox = inject(Combobox);

  constructor() {
    effect(() => signalSetFn(this.combobox.readonly[SIGNAL], true));
  }
}
