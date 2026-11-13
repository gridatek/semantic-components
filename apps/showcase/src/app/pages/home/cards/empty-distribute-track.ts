import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
} from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

/** Nothing yet: an empty state with its action. */
@Component({
  selector: 'app-home-empty-distribute-track',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    SiPlusIcon,
  ],
  template: `
    <div scCard>
      <div scCardBody>
        <div scEmpty class="p-4">
          <div scEmptyHeader>
            <div scEmptyMedia variant="icon"><svg siPlusIcon></svg></div>
            <h2 scEmptyTitle>Distribute Track</h2>
            <div scEmptyDescription>
              Upload your first master to start reaching listeners on Spotify,
              Apple Music, and more.
            </div>
          </div>
          <div scEmptyBody>
            <button scButton>Create Release</button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HomeEmptyDistributeTrack {}
