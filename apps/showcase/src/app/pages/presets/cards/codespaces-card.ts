import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
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
  ScField,
  ScFieldDescription,
  ScFrame,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemTitle,
  ScLabel,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
  ScSeparator,
  ScSpinner,
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
  ScTooltip,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import {
  SiContainerIcon,
  SiCopyIcon,
  SiDownloadIcon,
  SiEllipsisIcon,
  SiInfoIcon,
  SiLoaderCircleIcon,
  SiMonitorIcon,
  SiPlusIcon,
  SiServerIcon,
  SiShareIcon,
  SiZapIcon,
} from '@semantic-icons/lucide-icons';

/**
 * GitHub's Code menu: codespaces (none yet, one to create) or a local clone
 * (HTTPS, SSH or the CLI, nested tabs).
 */
@Component({
  selector: 'app-preview-codespaces-card',
  imports: [
    ScFrame,
    ScButton,
    ScCard,
    ScCardBody,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScField,
    ScFieldDescription,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemTitle,
    ScLabel,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
    ScSeparator,
    ScSpinner,
    ScTabs,
    ScTabsPanelContent,
    ScTabsList,
    ScTabsPanel,
    ScTabsTab,
    ScTooltip,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
    SiContainerIcon,
    SiCopyIcon,
    SiDownloadIcon,
    SiEllipsisIcon,
    SiInfoIcon,
    SiLoaderCircleIcon,
    SiMonitorIcon,
    SiPlusIcon,
    SiServerIcon,
    SiShareIcon,
    SiZapIcon,
  ],
  template: `
    <div scCard>
      <div scCardBody>
        <div scTabs value="codespaces">
          <div scTabsList class="w-full">
            <button scTabsTab value="codespaces" class="flex-1">
              Codespaces
            </button>
            <button scTabsTab value="local" class="flex-1">Local</button>
          </div>
          <div scTabsPanel value="codespaces">
            <ng-template scTabsPanelContent>
              <div scItem size="sm" class="px-1 pt-2">
                <div scItemBody>
                  <div scItemTitle>Codespaces</div>
                  <p scItemDescription>Your workspaces in the cloud</p>
                </div>
                <div scItemActions>
                  <div scTooltipProvider side="bottom">
                    <button
                      scButton
                      scTooltipTrigger
                      variant="ghost"
                      size="icon-sm"
                    >
                      <svg siPlusIcon></svg>
                      <span class="sr-only">New codespace</span>
                    </button>
                    <ng-template scTooltipPortal>
                      <div scTooltip>Create a codespace on main</div>
                    </ng-template>
                  </div>
                  <div scMenuProvider alignment="end">
                    <button
                      scButton
                      scMenuTrigger
                      variant="ghost"
                      size="icon-sm"
                    >
                      <svg siEllipsisIcon></svg>
                      <span class="sr-only">Codespace options</span>
                    </button>
                    <ng-template scMenuPortal>
                      <div scMenu class="w-56">
                        <ng-template scMenuContent>
                          <div scMenuGroup>
                            <div scMenuItem value="new">
                              <svg siPlusIcon></svg>
                              New with options...
                            </div>
                            <div scMenuItem value="container">
                              <svg siContainerIcon></svg>
                              Configure container
                            </div>
                            <div scMenuItem value="prebuilds">
                              <svg siZapIcon></svg>
                              Set up prebuilds
                            </div>
                          </div>
                          <div scMenuSeparator></div>
                          <div scMenuGroup>
                            <div scMenuItem value="manage">
                              <svg siServerIcon></svg>
                              Manage codespaces
                            </div>
                            <div scMenuItem value="share">
                              <svg siShareIcon></svg>
                              Share deep link
                            </div>
                            <div scMenuItem value="about">
                              <svg siInfoIcon></svg>
                              What are codespaces?
                            </div>
                          </div>
                        </ng-template>
                      </div>
                    </ng-template>
                  </div>
                </div>
              </div>
              <div
                scSeparator
                aria-hidden="true"
                class="-mx-2 my-2 w-auto"
              ></div>
              <div scEmpty class="p-4">
                <div scEmptyHeader>
                  <div scEmptyMedia variant="icon">
                    <svg siServerIcon></svg>
                  </div>
                  <h2 scEmptyTitle>No codespaces</h2>
                  <div scEmptyDescription>
                    You don't have any codespaces with this repository checked
                    out
                  </div>
                </div>
                <div scEmptyBody>
                  <button
                    scButton
                    size="sm"
                    [disabled]="creating()"
                    (click)="create()"
                  >
                    @if (creating()) {
                      <svg
                        scSpinner
                        siLoaderCircleIcon
                        aria-label="Creating"
                        data-icon="inline-start"
                      ></svg>
                    }
                    Create Codespace
                  </button>
                  <a
                    href="#learn-more"
                    class="text-muted-foreground text-xs underline underline-offset-4"
                  >
                    Learn more about codespaces
                  </a>
                </div>
              </div>
              <div
                scSeparator
                aria-hidden="true"
                class="-mx-2 my-2 w-auto"
              ></div>
              <p class="text-muted-foreground p-1.5 text-xs">
                Codespace usage for this repository is paid for by
                <span class="font-medium">shadcn</span>.
              </p>
            </ng-template>
          </div>
          <div scTabsPanel value="local">
            <ng-template scTabsPanelContent>
              <div scTabs value="https">
                <div
                  scTabsList
                  variant="line"
                  class="w-full justify-start border-b *:[button]:flex-0"
                >
                  @for (remote of remotes; track remote.value) {
                    <button scTabsTab [value]="remote.value">
                      {{ remote.label }}
                    </button>
                  }
                </div>
                <div scFrame size="sm" class="bg-muted/30 p-2">
                  @for (remote of remotes; track remote.value) {
                    <div scTabsPanel [value]="remote.value">
                      <ng-template scTabsPanelContent>
                        <div scField class="gap-2">
                          <label scLabel class="sr-only">{{
                            remote.name
                          }}</label>
                          <div scInputGroup>
                            <input scInput readonly [value]="remote.url" />
                            <div scInputGroupAddon side="inline-end">
                              <button
                                scInputGroupButton
                                variant="ghost"
                                size="icon-xs"
                              >
                                <svg siCopyIcon></svg>
                                <span class="sr-only">Copy</span>
                              </button>
                            </div>
                          </div>
                          <p scFieldDescription>{{ remote.description }}</p>
                        </div>
                      </ng-template>
                    </div>
                  }
                </div>
              </div>
              <div
                scSeparator
                aria-hidden="true"
                class="-mx-2 my-2 w-auto"
              ></div>
              <div class="flex flex-col">
                <button
                  scButton
                  variant="ghost"
                  size="sm"
                  class="justify-start gap-1.5"
                >
                  <svg siMonitorIcon data-icon="inline-start"></svg>
                  Open with GitHub Desktop
                </button>
                <button
                  scButton
                  variant="ghost"
                  size="sm"
                  class="justify-start gap-1.5"
                >
                  <svg siDownloadIcon data-icon="inline-start"></svg>
                  Download ZIP
                </button>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewCodespacesCard {
  protected readonly creating = signal(false);
  protected readonly remotes = [
    {
      value: 'https',
      label: 'HTTPS',
      name: 'HTTPS URL',
      url: 'https://github.com/shadcn-ui/ui.git',
      description: 'Clone using the web URL.',
    },
    {
      value: 'ssh',
      label: 'SSH',
      name: 'SSH URL',
      url: 'git@github.com:shadcn-ui/ui.git',
      description: 'Use a password-protected SSH key.',
    },
    {
      value: 'cli',
      label: 'GitHub CLI',
      name: 'CLI Command',
      url: 'gh repo clone shadcn-ui/ui',
      description: 'Work fast with our official CLI.',
    },
  ];
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected create(): void {
    this.creating.set(true);
    this.timer = setTimeout(() => this.creating.set(false), 2000);
  }
}
