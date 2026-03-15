import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
} from '@semantic-components/code';
import {
  ScButton,
  ScCopyToClipboard,
  ScTab,
  ScTabList,
  ScTabs,
} from '@semantic-components/ui';
import { cn } from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiCopyIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';
import { PackageManagerService } from './package-manager.service';

@Component({
  selector: 'app-package-manager-install',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    SiTerminalIcon,
    ScTabs,
    ScTabList,
    ScTab,
  ],
  template: `
    <div scTabs>
      <div scCodeViewer>
        <div scCodeViewerHeader>
          <svg siTerminalIcon class="text-muted-foreground size-4"></svg>
          <div
            scTabList
            [selectedTab]="selected()"
            (selectedTabChange)="$event && selected.set($event)"
            variant="line"
            class="h-auto"
          >
            <button scTab value="pnpm">pnpm</button>
            <button scTab value="npm">npm</button>
            <button scTab value="yarn">yarn</button>
            <button scTab value="bun">bun</button>
          </div>
          <button
            scButton
            variant="ghost"
            size="icon"
            class="ml-auto"
            [scCopyToClipboard]="command()"
            #copy="scCopyToClipboard"
            aria-label="Copy install command"
          >
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
          </button>
        </div>
        <div scCodeViewerContent [code]="command()" language="bash"></div>
      </div>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageManagerInstall {
  private readonly packageManagerService = inject(PackageManagerService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly packages = input.required<string>();

  protected readonly class = computed(() => cn('block', this.classInput()));
  protected readonly selected = this.packageManagerService.selected;

  protected readonly command = computed(() => {
    const pkg = this.packages();
    const commands: Record<string, string> = {
      npm: `npm install ${pkg}`,
      yarn: `yarn add ${pkg}`,
      pnpm: `pnpm add ${pkg}`,
      bun: `bun add ${pkg}`,
    };
    return commands[this.selected()];
  });
}
