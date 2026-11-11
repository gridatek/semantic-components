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
  ScCommandStatus,
  ScDialog,
  ScDialogDescription,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** In a dialog: opened by a button, focus in the search, closed by Escape or a run command. */
@Component({
  selector: 'app-basic-command-demo',
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
    ScCommandStatus,
    ScDialog,
    ScDialogDescription,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScDialogTrigger,
    SiSearchIcon,
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
                  <div scCommandGroupLabel>Suggestions</div>
                  <div scCommandItem (select)="ran('Calendar')">Calendar</div>
                  <div scCommandItem (select)="ran('Search Emoji')">
                    Search Emoji
                  </div>
                  <div scCommandItem (select)="ran('Calculator')">
                    Calculator
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
export class BasicCommandDemo {
  protected readonly open = signal(false);

  protected ran(name: string): void {
    this.open.set(false);
    this.last.set(name);
  }

  protected readonly last = signal('');
}
