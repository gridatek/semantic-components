import { ComboboxPopupContainer } from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ScSelect } from './select';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-select-portal]',
  imports: [ComboboxPopupContainer, OverlayModule],
  template: `
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
          <ng-content />
        </ng-template>
      }
    </ng-template>
  `,
  host: {
    'data-slot': 'select-portal',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectPortal {
  private readonly select = inject(ScSelect);

  protected readonly origin = computed(() => this.select.origin());

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
