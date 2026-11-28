import { injectHotkey } from '@tanstack/angular-hotkeys';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
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
} from '@semantic-components/ui';
import {
  SiBoxIcon,
  SiFileTextIcon,
  SiSearchIcon,
  SiWrenchIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';
import { CommandPaletteService } from '../../services/command-palette-service';
import { DocsNavService } from '../../services/docs-nav-service';
import { PageName } from '../page-name/page-name';

/** The docs' search (Ctrl+K, ⌘K on a Mac): the sidebar's pages, in its groups, by name or description. */
@Component({
  selector: 'app-command-palette',
  imports: [
    PageName,
    RouterLink,
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
    ScDialogProvider,
    ScDialogPortal,
    ScDialog,
    ScDialogTitle,
    ScDialogDescription,
    SiBoxIcon,
    SiFileTextIcon,
    SiSearchIcon,
    SiWrenchIcon,
  ],
  template: `
    <div scDialogProvider [(open)]="commandPaletteService.open">
      <ng-template scDialogPortal>
        <div scDialog scCommandDialog>
          <h2 scDialogTitle class="sr-only">Search the docs</h2>
          <p scDialogDescription class="sr-only">
            The docs' pages, by name or description.
          </p>
          <div scCommand #cmd="scCommand">
            <div scCommandInputGroup>
              <svg siSearchIcon></svg>
              <input
                scCommandInput
                placeholder="Search components..."
                aria-label="Search the docs"
              />
            </div>
            <div scCommandList aria-label="Results">
              <div scCommandEmpty>No results found.</div>
              @for (group of nav.groups(); track group.label) {
                @if (!$first) {
                  <div scCommandSeparator></div>
                }
                <div scCommandGroup>
                  <div scCommandGroupLabel>{{ group.label }}</div>
                  @for (page of group.pages; track page.path) {
                    <a
                      scCommandItem
                      [routerLink]="page.path"
                      [keywords]="page.description ? [page.description] : []"
                      (select)="close()"
                    >
                      @switch (group.kind) {
                        @case ('page') {
                          <svg siFileTextIcon></svg>
                        }
                        @case ('utility') {
                          <svg siWrenchIcon></svg>
                        }
                        @default {
                          <svg siBoxIcon></svg>
                        }
                      }
                      <span app-page-name [name]="page.name"></span>
                    </a>
                  }
                </div>
              }
            </div>
            <div scCommandStatus>{{ cmd.count() }} results</div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class CommandPalette {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('block', this.classInput()));

  /** The sidebar's groups, the same pages. */
  private readonly nav = inject(DocsNavService);
  private readonly commandPaletteService = inject(CommandPaletteService);

  constructor() {
    // Mod+K: ⌘K on a Mac, Ctrl+K elsewhere — in a field too.
    injectHotkey('Mod+K', () => this.toggleOpen());
  }

  private toggleOpen(): void {
    this.commandPaletteService.toggle();
  }

  /** A result followed: the link navigates, the palette closes. */
  private close(): void {
    this.commandPaletteService.open.set(false);
  }
}
