import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyTitle,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScKbd,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** A search in the empty state: a page not found. */
@Component({
  selector: 'app-input-group-empty-demo',
  imports: [
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyTitle,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScKbd,
    SiSearchIcon,
  ],
  template: `
    <div scEmpty>
      <div scEmptyHeader>
        <h2 scEmptyTitle>404 - Not Found</h2>
        <div scEmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for
          what you need below.
        </div>
      </div>
      <div scEmptyBody>
        <div scInputGroup class="sm:w-3/4">
          <input
            scInput
            placeholder="Try searching for pages..."
            aria-label="Search pages"
          />
          <div scInputGroupAddon><svg siSearchIcon></svg></div>
          <div scInputGroupAddon alignment="inline-end"><kbd scKbd>/</kbd></div>
        </div>
        <div scEmptyDescription>
          Need help? <a href="#input-group">Contact support</a>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupEmptyDemo {}
