import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCommandNext,
  ScCommandNextDialog,
  ScCommandNextEmpty,
  ScCommandNextGroup,
  ScCommandNextGroupLabel,
  ScCommandNextInput,
  ScCommandNextInputGroup,
  ScCommandNextItem,
  ScCommandNextList,
  ScCommandNextSeparator,
  ScCommandNextShortcut,
  ScCommandNextStatus,
  ScDialog,
  ScDialogDescription,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
} from '@semantic-components/ui';
import {
  SiBellIcon,
  SiCalculatorIcon,
  SiCalendarIcon,
  SiCircleQuestionMarkIcon,
  SiClipboardPasteIcon,
  SiCodeIcon,
  SiCopyIcon,
  SiCreditCardIcon,
  SiFilePlusIcon,
  SiFileTextIcon,
  SiFolderIcon,
  SiFolderPlusIcon,
  SiHouseIcon,
  SiImageIcon,
  SiInboxIcon,
  SiLayoutGridIcon,
  SiListIcon,
  SiScissorsIcon,
  SiSearchIcon,
  SiSettingsIcon,
  SiTrashIcon,
  SiUserIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';

/** Many items: the list scrolls, the highlighted one kept in view. */
@Component({
  selector: 'app-scrollable-command-next-demo',
  imports: [
    ScButton,
    ScCommandNext,
    ScCommandNextDialog,
    ScCommandNextEmpty,
    ScCommandNextGroup,
    ScCommandNextGroupLabel,
    ScCommandNextInput,
    ScCommandNextInputGroup,
    ScCommandNextItem,
    ScCommandNextList,
    ScCommandNextSeparator,
    ScCommandNextShortcut,
    ScCommandNextStatus,
    ScDialog,
    ScDialogDescription,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScDialogTrigger,
    SiBellIcon,
    SiCalculatorIcon,
    SiCalendarIcon,
    SiCircleQuestionMarkIcon,
    SiClipboardPasteIcon,
    SiCodeIcon,
    SiCopyIcon,
    SiCreditCardIcon,
    SiFilePlusIcon,
    SiFileTextIcon,
    SiFolderIcon,
    SiFolderPlusIcon,
    SiHouseIcon,
    SiImageIcon,
    SiInboxIcon,
    SiLayoutGridIcon,
    SiListIcon,
    SiScissorsIcon,
    SiSearchIcon,
    SiSettingsIcon,
    SiTrashIcon,
    SiUserIcon,
    SiZoomInIcon,
    SiZoomOutIcon,
  ],
  template: `
    <div class="flex flex-col gap-3">
      <div scDialogProvider [(open)]="open">
        <button scButton scDialogTrigger variant="outline">Open Menu</button>
        <ng-template scDialogPortal>
          <div scDialog scCommandNextDialog>
            <h2 scDialogTitle class="sr-only">Command Palette</h2>
            <p scDialogDescription class="sr-only">
              Search for a command to run...
            </p>
            <div scCommandNext #cmd="scCommandNext">
              <div scCommandNextInputGroup>
                <svg siSearchIcon></svg>
                <input
                  scCommandNextInput
                  placeholder="Type a command or search..."
                  aria-label="Search commands"
                />
              </div>
              <div scCommandNextList aria-label="Commands">
                <div scCommandNextEmpty>No results found.</div>
                <div scCommandNextGroup>
                  <div scCommandNextGroupLabel>Navigation</div>
                  <div scCommandNextItem (select)="ran('Home')">
                    <svg siHouseIcon></svg>
                    <span>Home</span>
                    <span scCommandNextShortcut>⌘H</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Inbox')">
                    <svg siInboxIcon></svg>
                    <span>Inbox</span>
                    <span scCommandNextShortcut>⌘I</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Documents')">
                    <svg siFileTextIcon></svg>
                    <span>Documents</span>
                    <span scCommandNextShortcut>⌘D</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Folders')">
                    <svg siFolderIcon></svg>
                    <span>Folders</span>
                    <span scCommandNextShortcut>⌘F</span>
                  </div>
                </div>
                <div scCommandNextSeparator></div>
                <div scCommandNextGroup>
                  <div scCommandNextGroupLabel>Actions</div>
                  <div scCommandNextItem (select)="ran('New File')">
                    <svg siFilePlusIcon></svg>
                    <span>New File</span>
                    <span scCommandNextShortcut>⌘N</span>
                  </div>
                  <div scCommandNextItem (select)="ran('New Folder')">
                    <svg siFolderPlusIcon></svg>
                    <span>New Folder</span>
                    <span scCommandNextShortcut>⇧⌘N</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Copy')">
                    <svg siCopyIcon></svg>
                    <span>Copy</span>
                    <span scCommandNextShortcut>⌘C</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Cut')">
                    <svg siScissorsIcon></svg>
                    <span>Cut</span>
                    <span scCommandNextShortcut>⌘X</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Paste')">
                    <svg siClipboardPasteIcon></svg>
                    <span>Paste</span>
                    <span scCommandNextShortcut>⌘V</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Delete')">
                    <svg siTrashIcon></svg>
                    <span>Delete</span>
                    <span scCommandNextShortcut>⌫</span>
                  </div>
                </div>
                <div scCommandNextSeparator></div>
                <div scCommandNextGroup>
                  <div scCommandNextGroupLabel>View</div>
                  <div scCommandNextItem (select)="ran('Grid View')">
                    <svg siLayoutGridIcon></svg>
                    <span>Grid View</span>
                  </div>
                  <div scCommandNextItem (select)="ran('List View')">
                    <svg siListIcon></svg>
                    <span>List View</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Zoom In')">
                    <svg siZoomInIcon></svg>
                    <span>Zoom In</span>
                    <span scCommandNextShortcut>⌘+</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Zoom Out')">
                    <svg siZoomOutIcon></svg>
                    <span>Zoom Out</span>
                    <span scCommandNextShortcut>⌘-</span>
                  </div>
                </div>
                <div scCommandNextSeparator></div>
                <div scCommandNextGroup>
                  <div scCommandNextGroupLabel>Account</div>
                  <div scCommandNextItem (select)="ran('Profile')">
                    <svg siUserIcon></svg>
                    <span>Profile</span>
                    <span scCommandNextShortcut>⌘P</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Billing')">
                    <svg siCreditCardIcon></svg>
                    <span>Billing</span>
                    <span scCommandNextShortcut>⌘B</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Settings')">
                    <svg siSettingsIcon></svg>
                    <span>Settings</span>
                    <span scCommandNextShortcut>⌘S</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Notifications')">
                    <svg siBellIcon></svg>
                    <span>Notifications</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Help & Support')">
                    <svg siCircleQuestionMarkIcon></svg>
                    <span>Help & Support</span>
                  </div>
                </div>
                <div scCommandNextSeparator></div>
                <div scCommandNextGroup>
                  <div scCommandNextGroupLabel>Tools</div>
                  <div scCommandNextItem (select)="ran('Calculator')">
                    <svg siCalculatorIcon></svg>
                    <span>Calculator</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Calendar')">
                    <svg siCalendarIcon></svg>
                    <span>Calendar</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Image Editor')">
                    <svg siImageIcon></svg>
                    <span>Image Editor</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Code Editor')">
                    <svg siCodeIcon></svg>
                    <span>Code Editor</span>
                  </div>
                </div>
              </div>
              <div scCommandNextStatus>{{ cmd.count() }} results</div>
            </div>
          </div>
        </ng-template>
      </div>
      <p class="text-muted-foreground text-sm" aria-live="polite">
        @if (last()) {
          Ran {{ last() }}.
        }
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollableCommandNextDemo {
  protected readonly open = signal(false);

  protected ran(name: string): void {
    this.open.set(false);
    this.last.set(name);
  }

  protected readonly last = signal('');
}
