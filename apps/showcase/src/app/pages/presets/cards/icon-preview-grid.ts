import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardContent, ScFrame } from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiArrowRightIcon,
  SiCheckIcon,
  SiChevronDownIcon,
  SiChevronRightIcon,
  SiCircleAlertIcon,
  SiCopyIcon,
  SiEllipsisIcon,
  SiLoaderCircleIcon,
  SiMinusIcon,
  SiPlusIcon,
  SiSearchIcon,
  SiSettingsIcon,
  SiShareIcon,
  SiShoppingBagIcon,
  SiTrashIcon,
} from '@semantic-icons/lucide-icons';

/** The icon library: sixteen icons, each in a small frame. */
@Component({
  selector: 'app-preview-icon-preview-grid',
  imports: [
    ScFrame,
    ScCard,
    ScCardContent,
    SiArrowLeftIcon,
    SiArrowRightIcon,
    SiCheckIcon,
    SiChevronDownIcon,
    SiChevronRightIcon,
    SiCircleAlertIcon,
    SiCopyIcon,
    SiEllipsisIcon,
    SiLoaderCircleIcon,
    SiMinusIcon,
    SiPlusIcon,
    SiSearchIcon,
    SiSettingsIcon,
    SiShareIcon,
    SiShoppingBagIcon,
    SiTrashIcon,
  ],
  template: `
    <div scCard>
      <div scCardContent>
        <div
          class="grid grid-cols-8 place-items-center gap-4 *:flex *:size-8 *:items-center *:justify-center *:[&_svg]:size-4"
        >
          <span scFrame><svg siCopyIcon></svg></span>
          <span scFrame><svg siCircleAlertIcon></svg></span>
          <span scFrame><svg siTrashIcon></svg></span>
          <span scFrame><svg siShareIcon></svg></span>
          <span scFrame><svg siShoppingBagIcon></svg></span>
          <span scFrame><svg siEllipsisIcon></svg></span>
          <span scFrame><svg siLoaderCircleIcon></svg></span>
          <span scFrame><svg siPlusIcon></svg></span>
          <span scFrame><svg siMinusIcon></svg></span>
          <span scFrame><svg siArrowLeftIcon></svg></span>
          <span scFrame><svg siArrowRightIcon></svg></span>
          <span scFrame><svg siCheckIcon></svg></span>
          <span scFrame><svg siChevronDownIcon></svg></span>
          <span scFrame><svg siChevronRightIcon></svg></span>
          <span scFrame><svg siSearchIcon></svg></span>
          <span scFrame><svg siSettingsIcon></svg></span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewIconPreviewGrid {}
