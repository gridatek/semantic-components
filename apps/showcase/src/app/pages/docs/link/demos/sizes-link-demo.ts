import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import { SiLinkIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sizes-link-demo',
  imports: [ScLink, SiLinkIcon],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <a scLink size="sm">Small</a>
      <a scLink size="default">Default</a>
      <a scLink size="lg">Large</a>
      <a scLink size="icon" aria-label="Link">
        <svg siLinkIcon></svg>
      </a>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesLinkDemo {}
