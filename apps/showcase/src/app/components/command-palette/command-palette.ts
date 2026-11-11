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
  ScHotkey,
  cn,
} from '@semantic-components/ui';
import {
  SiBoxIcon,
  SiFileTextIcon,
  SiSearchIcon,
  SiWrenchIcon,
} from '@semantic-icons/lucide-icons';
import { CommandPaletteService } from '../../services/command-palette-service';
import { ComponentsService } from '../../services/components-service';

/** The docs' search (Ctrl+K, ⌘K on a Mac): pages, components and utilities, by name or description. */
@Component({
  selector: 'app-command-palette',
  imports: [
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
    ScHotkey,
    SiBoxIcon,
    SiFileTextIcon,
    SiSearchIcon,
    SiWrenchIcon,
  ],
  template: `
    <div scDialogProvider [(open)]="commandPaletteService.open">
      <span
        scHotkey="mod+k"
        (scHotkeyPressed)="toggleOpen()"
        class="hidden"
      ></span>
      <ng-template scDialogPortal>
        <div scDialog scCommandDialog>
          <h2 scDialogTitle class="sr-only">Search the docs</h2>
          <p scDialogDescription class="sr-only">
            Pages, components and utilities, by name or description.
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
              <div scCommandGroup>
                <div scCommandGroupLabel>Pages</div>
                @for (page of pages; track page.path) {
                  <a scCommandItem [routerLink]="page.path" (select)="close()">
                    <svg siFileTextIcon></svg>
                    <span>{{ page.name }}</span>
                  </a>
                }
              </div>
              <div scCommandSeparator></div>
              <div scCommandGroup>
                <div scCommandGroupLabel>Components</div>
                @for (
                  component of componentsService.visibleComponents();
                  track component.path
                ) {
                  <a
                    scCommandItem
                    [routerLink]="'/docs/components/' + component.path"
                    [keywords]="[component.description]"
                    (select)="close()"
                  >
                    <svg siBoxIcon></svg>
                    <span>{{ component.name }}</span>
                  </a>
                }
              </div>
              <div scCommandSeparator></div>
              <div scCommandGroup>
                <div scCommandGroupLabel>Utilities</div>
                @for (
                  utility of componentsService.visibleUtilities();
                  track utility.path
                ) {
                  <a
                    scCommandItem
                    [routerLink]="'/docs/components/' + utility.path"
                    [keywords]="[utility.description]"
                    (select)="close()"
                  >
                    <svg siWrenchIcon></svg>
                    <span>{{ utility.name }}</span>
                  </a>
                }
              </div>
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

  protected readonly class = computed(() => cn('block', this.classInput()));

  protected readonly componentsService = inject(ComponentsService);
  protected readonly commandPaletteService = inject(CommandPaletteService);

  protected readonly pages = [
    { name: 'Introduction', path: '/docs/getting-started/introduction' },
    { name: 'Prerequisites', path: '/docs/getting-started/prerequisites' },
    { name: 'Components', path: '/docs/components' },
  ];

  toggleOpen(): void {
    this.commandPaletteService.toggle();
  }

  /** A result followed: the link navigates, the palette closes. */
  protected close(): void {
    this.commandPaletteService.open.set(false);
  }
}
