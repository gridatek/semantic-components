import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
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

/** A 404 as an empty state: a search, and the way home. */
@Component({
  selector: 'app-preview-not-found',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
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
    <div scCard>
      <div scCardBody>
        <div scEmpty class="h-72">
          <div scEmptyHeader>
            <h2 scEmptyTitle>404 - Not Found</h2>
            <div scEmptyDescription>
              The page you're looking for doesn't exist. Try searching for what
              you need below.
            </div>
          </div>
          <div scEmptyBody>
            <div scInputGroup class="w-3/4">
              <input
                scInput
                type="search"
                placeholder="Try searching for pages..."
                aria-label="Search pages"
              />
              <div scInputGroupAddon><svg siSearchIcon></svg></div>
              <div scInputGroupAddon side="inline-end">
                <kbd scKbd>/</kbd>
              </div>
            </div>
            <button scButton variant="link">Go to homepage</button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewNotFound {}
