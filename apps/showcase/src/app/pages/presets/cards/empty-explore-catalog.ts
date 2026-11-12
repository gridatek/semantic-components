import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
} from '@semantic-components/ui';
import { SiAudioLinesIcon } from '@semantic-icons/lucide-icons';

/** Nothing released yet: an empty state that opens the catalog. */
@Component({
  selector: 'app-preview-empty-explore-catalog',
  imports: [
    ScButton,
    ScCard,
    ScCardContent,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    SiAudioLinesIcon,
  ],
  template: `
    <div scCard>
      <div scCardContent>
        <div scEmpty class="p-4">
          <div scEmptyHeader>
            <div scEmptyMedia variant="icon">
              <svg siAudioLinesIcon></svg>
            </div>
            <h2 scEmptyTitle>Explore Catalog</h2>
            <div scEmptyDescription>
              Check your ISRC codes, metadata, and visual assets before going
              live.
            </div>
          </div>
          <div scEmptyBody>
            <button scButton>View Catalog</button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewEmptyExploreCatalog {}
