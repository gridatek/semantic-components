import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScListbox,
  ScListboxItem,
  ScListboxItemIcon,
  ScListboxItemIndicator,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiFileTextIcon,
  SiInboxIcon,
  SiReplyIcon,
  SiSendIcon,
} from '@semantic-icons/lucide-icons';

/** An icon at the start of each option (scListboxItemIcon), hidden from screen readers and typeahead; mirror turns an arrow right to left. */
@Component({
  selector: 'app-icons-listbox-demo',
  imports: [
    ScListbox,
    ScListboxItem,
    ScListboxItemIcon,
    ScListboxItemIndicator,
    SiCheckIcon,
    SiFileTextIcon,
    SiInboxIcon,
    SiReplyIcon,
    SiSendIcon,
  ],
  template: `
    <div class="w-56">
      <div scListbox aria-label="Mailbox" [(value)]="box">
        <div scListboxItem value="inbox">
          <span scListboxItemIcon><svg siInboxIcon></svg></span>
          Inbox
          <span scListboxItemIndicator><svg siCheckIcon></svg></span>
        </div>
        <div scListboxItem value="sent">
          <span scListboxItemIcon><svg siSendIcon></svg></span>
          Sent
          <span scListboxItemIndicator><svg siCheckIcon></svg></span>
        </div>
        <div scListboxItem value="drafts">
          <span scListboxItemIcon><svg siFileTextIcon></svg></span>
          Drafts
          <span scListboxItemIndicator><svg siCheckIcon></svg></span>
        </div>
        <div scListboxItem value="replies">
          <span scListboxItemIcon mirror><svg siReplyIcon></svg></span>
          Replies
          <span scListboxItemIndicator><svg siCheckIcon></svg></span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsListboxDemo {
  private readonly box = signal<string | null>('inbox');
}
