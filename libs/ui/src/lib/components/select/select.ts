import { NgTemplateOutlet } from '@angular/common';
import { Combobox } from '@angular/aria/combobox';
import { ComboboxPopupContainer } from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScSelectList } from './select-list';
import { ScSelectPortal } from './select-portal';
import { ScSelectTrigger } from './select-trigger';

@Component({
  selector: 'div[scSelect]',
  exportAs: 'scSelect',
  imports: [Combobox, ComboboxPopupContainer, OverlayModule, NgTemplateOutlet],
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
          <ng-container [ngTemplateOutlet]="selectPortal().templateRef" />
        </ng-template>
      }
    </ng-template>
  `,
  host: {
    'data-slot': 'select',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelect implements FormValueControl<string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('');
  readonly value = model<string>('');

  private readonly trigger = contentChild(ScSelectTrigger);
  private readonly content = contentChild(ScSelectList, {
    descendants: true,
  });
  protected readonly selectPortal = contentChild.required(ScSelectPortal);

  readonly origin = computed(() => this.trigger()?.overlayOrigin);
  readonly values = computed(() => this.content()?.values() ?? []);
  readonly displayValue = computed(() => this.value() || this.placeholder());
  protected readonly class = computed(() =>
    cn('relative min-w-36 w-fit', this.classInput()),
  );

  private readonly combobox = inject(Combobox);

  constructor() {
    effect(() => signalSetFn(this.combobox.readonly[SIGNAL], true));

    // Sync listbox selection → model
    effect(() => {
      const vals = this.values();
      const selected = vals.length > 0 ? String(vals[0]) : '';
      this.value.set(selected);
    });
  }
}
