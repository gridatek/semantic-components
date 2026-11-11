import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCommandNextDemo } from './basic-command-next-demo';

@Component({
  selector: 'app-basic-command-next-demo-container',
  imports: [DemoContainer, BasicCommandNextDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/command-next/basic-command-next-demo"
      [code]="code"
    >
      <app-basic-command-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCommandNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  ScCommandNextStatus,
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
  selector: 'app-basic-command-next-demo',
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
    ScCommandNextStatus,
    ScDialog,
    ScDialogDescription,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScDialogTrigger,
    SiSearchIcon,
  ],
  template: \`
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
                  <div scCommandNextGroupLabel>Suggestions</div>
                  <div scCommandNextItem (select)="ran('Calendar')">
                    Calendar
                  </div>
                  <div scCommandNextItem (select)="ran('Search Emoji')">
                    Search Emoji
                  </div>
                  <div scCommandNextItem (select)="ran('Calculator')">
                    Calculator
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCommandNextDemo {
  protected readonly open = signal(false);

  protected ran(name: string): void {
    this.open.set(false);
    this.last.set(name);
  }

  protected readonly last = signal('');
}`;
}
