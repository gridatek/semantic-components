import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A long message in a Collapsible: its first paragraph, the rest behind Show more. */
@Component({
  selector: 'app-show-more-bubble-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScCollapsible,
    ScCollapsibleTrigger,
    ScCollapsiblePanel,
    SiChevronDownIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scBubble variant="muted">
        <div scBubbleContent>How can I help you today?</div>
      </div>
      <div scBubble variant="muted" align="end">
        <div scBubbleContent>
          <div
            scCollapsible
            #details="scCollapsible"
            class="flex flex-col gap-2"
          >
            <p>
              The accessibility review found two focus states that were visually
              too subtle in dark mode.
            </p>
            <div scCollapsiblePanel class="flex flex-col gap-2">
              <p>
                I checked the dialog, menu, and drawer paths because each one
                renders focusable controls inside a layered surface.
              </p>
              <p>
                The dialog and drawer are fine. The menu needs the hover and
                focus tokens split so keyboard focus stays visible when the
                pointer is not involved.
              </p>
            </div>
            <button
              scButton
              scCollapsibleTrigger
              variant="link"
              class="text-muted-foreground h-auto self-start p-0"
            >
              {{ details.open() ? 'Show less' : 'Show more' }}
              <svg siChevronDownIcon [class.rotate-180]="details.open()"></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ShowMoreBubbleDemo {}
