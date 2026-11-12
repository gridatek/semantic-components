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
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** Accounts syncing: an empty state with a spinner. */
@Component({
  selector: 'app-preview-syncing-state',
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
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: `
    <div scCard>
      <div scCardContent class="p-0">
        <div scEmpty class="p-4">
          <div scEmptyHeader>
            <div scEmptyMedia variant="icon">
              <svg scSpinner siLoaderCircleIcon aria-label="Syncing"></svg>
            </div>
            <h2 scEmptyTitle>Syncing your accounts</h2>
            <div scEmptyDescription>
              We're pulling in your latest transactions. This usually takes a
              few seconds.
            </div>
          </div>
          <div scEmptyBody>
            <button scButton variant="outline">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewSyncingState {}
