import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandGroupLabel,
  ScCommandInput,
  ScCommandInputGroup,
  ScCommandItem,
  ScCommandList,
  ScCommandListContainer,
  ScCommandSeparator,
  ScDialog,
  ScDialogPortal,
  ScDialogProvider,
  ScHotkey,
  cn,
} from '@semantic-components/ui';
import {
  SiBoxIcon,
  SiFileTextIcon,
  SiSearchIcon,
  SiWrenchIcon,
} from '@semantic-icons/lucide-icons';
import { CommandPaletteService } from '../../services/command-palette.service';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-command-palette',
  imports: [
    ScCommand,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandGroupLabel,
    ScCommandInput,
    ScCommandInputGroup,
    ScCommandItem,
    ScCommandList,
    ScCommandListContainer,
    ScCommandSeparator,
    ScDialogProvider,
    ScDialogPortal,
    ScDialog,
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
        <div scDialog class="w-lg gap-0 p-0">
          <div scCommand>
            <div scCommandInputGroup>
              <svg
                siSearchIcon
                class="mr-2 size-4 shrink-0 opacity-50"
                aria-hidden="true"
              ></svg>
              <input
                scCommandInput
                placeholder="Search components..."
                [(value)]="searchString"
              />
            </div>
            <ng-template scCommandListContainer>
              <div scCommandList>
                @if (
                  filteredComponents().length === 0 &&
                  filteredPages().length === 0 &&
                  filteredUtilities().length === 0
                ) {
                  <div scCommandEmpty>No results found.</div>
                }
                @if (filteredPages().length > 0) {
                  <div scCommandGroup>
                    <span scCommandGroupLabel>Pages</span>
                    @for (page of filteredPages(); track page.path) {
                      <div
                        scCommandItem
                        [value]="page.name"
                        [label]="page.name"
                        (select)="navigate(page.path)"
                      >
                        <svg
                          siFileTextIcon
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        ></svg>
                        <span>{{ page.name }}</span>
                      </div>
                    }
                  </div>
                }
                @if (
                  filteredPages().length > 0 && filteredComponents().length > 0
                ) {
                  <div scCommandSeparator></div>
                }
                @if (filteredComponents().length > 0) {
                  <div scCommandGroup>
                    <span scCommandGroupLabel>Components</span>
                    @for (
                      component of filteredComponents();
                      track component.path
                    ) {
                      <div
                        scCommandItem
                        [value]="component.name"
                        [label]="component.name"
                        (select)="
                          navigate('/docs/components/' + component.path)
                        "
                      >
                        <svg
                          siBoxIcon
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        ></svg>
                        <span>{{ component.name }}</span>
                      </div>
                    }
                  </div>
                }
                @if (
                  (filteredComponents().length > 0 ||
                    filteredPages().length > 0) &&
                  filteredUtilities().length > 0
                ) {
                  <div scCommandSeparator></div>
                }
                @if (filteredUtilities().length > 0) {
                  <div scCommandGroup>
                    <span scCommandGroupLabel>Utilities</span>
                    @for (utility of filteredUtilities(); track utility.path) {
                      <div
                        scCommandItem
                        [value]="utility.name"
                        [label]="utility.name"
                        (select)="navigate('/docs/components/' + utility.path)"
                      >
                        <svg
                          siWrenchIcon
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        ></svg>
                        <span>{{ utility.name }}</span>
                      </div>
                    }
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPalette {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('block', this.classInput()));

  private readonly router = inject(Router);
  private readonly componentsService = inject(ComponentsService);
  protected readonly commandPaletteService = inject(CommandPaletteService);

  readonly searchString = signal('');

  private readonly pages = [
    { name: 'Introduction', path: '/docs/getting-started/introduction' },
    { name: 'Prerequisites', path: '/docs/getting-started/prerequisites' },
    { name: 'Components', path: '/docs/components' },
  ];

  readonly filteredPages = computed(() => {
    const search = this.searchString().toLowerCase();
    if (!search) return this.pages;
    return this.pages.filter((p) => p.name.toLowerCase().includes(search));
  });

  readonly filteredComponents = computed(() => {
    const search = this.searchString().toLowerCase();
    const components = this.componentsService.visibleComponents();
    if (!search) return components;
    return components.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search),
    );
  });

  readonly filteredUtilities = computed(() => {
    const search = this.searchString().toLowerCase();
    const utilities = this.componentsService.visibleUtilities();
    if (!search) return utilities;
    return utilities.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search),
    );
  });

  toggleOpen(): void {
    this.commandPaletteService.toggle();
  }

  navigate(path: string): void {
    this.router.navigateByUrl(path);
    this.commandPaletteService.open.set(false);
  }
}
