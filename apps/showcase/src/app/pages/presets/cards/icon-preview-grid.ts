import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardContent } from '@semantic-components/ui';
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
          class="*:ring-border grid grid-cols-8 place-items-center gap-4 *:flex *:size-8 *:items-center *:justify-center *:rounded-md *:ring *:[&_svg]:size-4"
        >
          <span><svg siCopyIcon></svg></span>
          <span><svg siCircleAlertIcon></svg></span>
          <span><svg siTrashIcon></svg></span>
          <span><svg siShareIcon></svg></span>
          <span><svg siShoppingBagIcon></svg></span>
          <span><svg siEllipsisIcon></svg></span>
          <span><svg siLoaderCircleIcon></svg></span>
          <span><svg siPlusIcon></svg></span>
          <span><svg siMinusIcon></svg></span>
          <span><svg siArrowLeftIcon></svg></span>
          <span><svg siArrowRightIcon></svg></span>
          <span><svg siCheckIcon></svg></span>
          <span><svg siChevronDownIcon></svg></span>
          <span><svg siChevronRightIcon></svg></span>
          <span><svg siSearchIcon></svg></span>
          <span><svg siSettingsIcon></svg></span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewIconPreviewGrid {}
