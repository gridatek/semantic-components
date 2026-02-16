import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import { SiExternalLinkIcon, SiMailIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-with-icons-link-demo',
  imports: [ScLink, SiExternalLinkIcon, SiMailIcon],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <a scLink href="#">
        <svg si-mail-icon></svg>
        Email
      </a>
      <a scLink variant="outline" href="#">
        Open
        <svg si-external-link-icon></svg>
      </a>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconsLinkDemo {}
