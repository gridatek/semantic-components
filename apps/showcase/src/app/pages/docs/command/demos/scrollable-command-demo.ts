import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCommand,
  ScCommandDialog,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandGroupLabel,
  ScCommandInput,
  ScCommandInputGroup,
  ScCommandItem,
  ScCommandList,
  ScCommandSeparator,
  ScCommandStatus,
  ScDialog,
  ScDialogDescription,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
  ScKbd,
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
  selector: 'app-scrollable-command-demo',
  imports: [
    ScButton,
    ScCommand,
    ScCommandDialog,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandGroupLabel,
    ScCommandInput,
    ScCommandInputGroup,
    ScCommandItem,
    ScCommandList,
    ScCommandSeparator,
    ScKbd,
    ScCommandStatus,
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
          <div scDialog scCommandDialog>
            <h2 scDialogTitle class="sr-only">Command Palette</h2>
            <p scDialogDescription class="sr-only">
              Search for a command to run...
            </p>
            <div scCommand #cmd="scCommand">
              <div scCommandInputGroup>
                <svg siSearchIcon></svg>
                <input
                  scCommandInput
                  placeholder="Type a command or search..."
                  aria-label="Search commands"
                />
              </div>
              <div scCommandList aria-label="Commands">
                <div scCommandEmpty>No results found.</div>
                <div scCommandGroup>
                  <div scCommandGroupLabel>Navigation</div>
                  <div scCommandItem (select)="ran('Home')">
                    <svg siHouseIcon></svg>
                    <span>Home</span>
                    <kbd scKbd>⌘H</kbd>
                  </div>
                  <div scCommandItem (select)="ran('Inbox')">
                    <svg siInboxIcon></svg>
                    <span>Inbox</span>
                    <kbd scKbd>⌘I</kbd>
                  </div>
                  <div scCommandItem (select)="ran('Documents')">
                    <svg siFileTextIcon></svg>
                    <span>Documents</span>
                    <kbd scKbd>⌘D</kbd>
                  </div>
                  <div scCommandItem (select)="ran('Folders')">
                    <svg siFolderIcon></svg>
                    <span>Folders</span>
                    <kbd scKbd>⌘F</kbd>
                  </div>
                </div>
                <div scCommandSeparator></div>
                <div scCommandGroup>
                  <div scCommandGroupLabel>Actions</div>
                  <div scCommandItem (select)="ran('New File')">
                    <svg siFilePlusIcon></svg>
                    <span>New File</span>
                    <kbd scKbd>⌘N</kbd>
                  </div>
                  <div scCommandItem (select)="ran('New Folder')">
                    <svg siFolderPlusIcon></svg>
                    <span>New Folder</span>
                    <kbd scKbd>⇧⌘N</kbd>
                  </div>
                  <div scCommandItem (select)="ran('Copy')">
                    <svg siCopyIcon></svg>
                    <span>Copy</span>
                    <kbd scKbd>⌘C</kbd>
                  </div>
                  <div scCommandItem (select)="ran('Cut')">
                    <svg siScissorsIcon></svg>
                    <span>Cut</span>
                    <kbd scKbd>⌘X</kbd>
                  </div>
                  <div scCommandItem (select)="ran('Paste')">
                    <svg siClipboardPasteIcon></svg>
                    <span>Paste</span>
                    <kbd scKbd>⌘V</kbd>
                  </div>
                  <div scCommandItem (select)="ran('Delete')">
                    <svg siTrashIcon></svg>
                    <span>Delete</span>
                    <kbd scKbd>⌫</kbd>
                  </div>
                </div>
                <div scCommandSeparator></div>
                <div scCommandGroup>
                  <div scCommandGroupLabel>View</div>
                  <div scCommandItem (select)="ran('Grid View')">
                    <svg siLayoutGridIcon></svg>
                    <span>Grid View</span>
                  </div>
                  <div scCommandItem (select)="ran('List View')">
                    <svg siListIcon></svg>
                    <span>List View</span>
                  </div>
                  <div scCommandItem (select)="ran('Zoom In')">
                    <svg siZoomInIcon></svg>
                    <span>Zoom In</span>
                    <kbd scKbd>⌘+</kbd>
                  </div>
                  <div scCommandItem (select)="ran('Zoom Out')">
                    <svg siZoomOutIcon></svg>
                    <span>Zoom Out</span>
                    <kbd scKbd>⌘-</kbd>
                  </div>
                </div>
                <div scCommandSeparator></div>
                <div scCommandGroup>
                  <div scCommandGroupLabel>Account</div>
                  <div scCommandItem (select)="ran('Profile')">
                    <svg siUserIcon></svg>
                    <span>Profile</span>
                    <kbd scKbd>⌘P</kbd>
                  </div>
                  <div scCommandItem (select)="ran('Billing')">
                    <svg siCreditCardIcon></svg>
                    <span>Billing</span>
                    <kbd scKbd>⌘B</kbd>
                  </div>
                  <div scCommandItem (select)="ran('Settings')">
                    <svg siSettingsIcon></svg>
                    <span>Settings</span>
                    <kbd scKbd>⌘S</kbd>
                  </div>
                  <div scCommandItem (select)="ran('Notifications')">
                    <svg siBellIcon></svg>
                    <span>Notifications</span>
                  </div>
                  <div scCommandItem (select)="ran('Help & Support')">
                    <svg siCircleQuestionMarkIcon></svg>
                    <span>Help & Support</span>
                  </div>
                </div>
                <div scCommandSeparator></div>
                <div scCommandGroup>
                  <div scCommandGroupLabel>Tools</div>
                  <div scCommandItem (select)="ran('Calculator')">
                    <svg siCalculatorIcon></svg>
                    <span>Calculator</span>
                  </div>
                  <div scCommandItem (select)="ran('Calendar')">
                    <svg siCalendarIcon></svg>
                    <span>Calendar</span>
                  </div>
                  <div scCommandItem (select)="ran('Image Editor')">
                    <svg siImageIcon></svg>
                    <span>Image Editor</span>
                  </div>
                  <div scCommandItem (select)="ran('Code Editor')">
                    <svg siCodeIcon></svg>
                    <span>Code Editor</span>
                  </div>
                </div>
              </div>
              <div scCommandStatus>{{ cmd.count() }} results</div>
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
export class ScrollableCommandDemo {
  private readonly open = signal(false);

  private ran(name: string): void {
    this.open.set(false);
    this.last.set(name);
  }

  private readonly last = signal('');
}
