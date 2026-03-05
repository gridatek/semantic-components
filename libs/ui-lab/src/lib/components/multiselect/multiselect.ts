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
import { cn } from '@semantic-components/ui';
import { ScMultiselectPortal } from './multiselect-portal';
import { ScMultiselectTrigger } from './multiselect-trigger';

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
          [cdkConnectedOverlayOpen]="true"
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

  protected readonly class = computed(() => cn('relative', this.classInput()));

  private readonly trigger = contentChild(ScMultiselectTrigger);
  protected readonly multiselectPortal =
    contentChild.required(ScMultiselectPortal);

  readonly origin = computed(() => this.trigger()?.elementRef);

  private readonly combobox = inject(Combobox);

  constructor() {
    effect(() => signalSetFn(this.combobox.readonly[SIGNAL], true));
  }
}
