import { Combobox, ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  contentChild,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScAutocompleteOrigin } from './autocomplete-origin';
import { ScAutocompletePortal } from './autocomplete-portal';

@Component({
  selector: 'div[scAutocomplete]',
  imports: [ComboboxPopupContainer, OverlayModule, NgTemplateOutlet],
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['filterMode'],
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
        >
          <ng-container [ngTemplateOutlet]="autocompletePortal().templateRef" />
        </ng-template>
      }
    </ng-template>
  `,
  host: {
    'data-slot': 'autocomplete',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAutocomplete {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly trigger = contentChild(ScAutocompleteOrigin);
  private readonly listbox = contentChild(Listbox, { descendants: true });
  private readonly options = contentChildren(Option, { descendants: true });
  protected readonly autocompletePortal =
    contentChild.required(ScAutocompletePortal);

  readonly origin = computed(() => this.trigger()?.elementRef);
  protected readonly combobox = inject(Combobox);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  constructor() {
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(
        () => option?.element.scrollIntoView({ block: 'nearest' }),
        50,
      );
    });

    afterRenderEffect(() => {
      if (!this.combobox.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}
