import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ScOptionLegacy, ScSelectLegacy } from '../select-legacy';
import { PaginatorService } from './paginator.service';

@Component({
  selector: 'div[sc-page-size-select]',
  imports: [ScSelectLegacy, ScOptionLegacy, ReactiveFormsModule],
  template: `
    <sc-select-legacy [formControl]="paginatorService.pageSizeFormControl">
      @for (pageSizeOption of paginatorService.pageSizeOptions(); track $index) {
        <sc-option-legacy [value]="pageSizeOption">{{ pageSizeOption }}</sc-option-legacy>
      }
    </sc-select-legacy>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPageSizeSelect {
  protected readonly paginatorService = inject(PaginatorService);
}
