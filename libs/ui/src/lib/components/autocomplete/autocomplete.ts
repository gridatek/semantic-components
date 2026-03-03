import { Combobox, ComboboxPopupContainer } from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScAutocompleteGroup } from './autocomplete-group';
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

  private readonly group = contentChild(ScAutocompleteGroup);
  protected readonly autocompletePortal =
    contentChild.required(ScAutocompletePortal);

  readonly origin = computed(() => this.group()?.elementRef);
  protected readonly combobox = inject(Combobox);

  protected readonly class = computed(() => cn('relative', this.classInput()));
}
