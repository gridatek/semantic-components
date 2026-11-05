import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  ScTabs,
  ScTabsContent,
  ScTabsList,
  ScTabsPanel,
  ScTabsTab,
  cn,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
} from '@semantic-components/ui/code-block';
import {
  SiCheckIcon,
  SiCopyIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';
import { PackageManagerService } from './package-manager-service';

@Component({
  selector: 'app-package-manager-install',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    SiTerminalIcon,
    ScTabs,
    ScTabsList,
    ScTabsTab,
    ScTabsPanel,
    ScTabsContent,
  ],
  template: `
    <div
      scTabs
      [value]="selected()"
      (valueChange)="$event && selected.set($event)"
    >
      <div scCodeBlock>
        <div scCodeBlockHeader>
          <svg siTerminalIcon></svg>
          <div scTabsList variant="line" class="h-auto">
            <button scTabsTab value="pnpm">pnpm</button>
            <button scTabsTab value="npm">npm</button>
            <button scTabsTab value="yarn">yarn</button>
            <button scTabsTab value="bun">bun</button>
          </div>
          <div scCodeBlockActions>
            <button [scCodeBlockCopy]="command()" #copy="scCodeBlockCopy">
              @if (copy.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
              <span class="sr-only">Copy install command</span>
            </button>
          </div>
        </div>
        @for (entry of commands(); track entry.id) {
          <div scTabsPanel [value]="entry.id">
            <ng-template scTabsContent>
              <pre
                scCodeBlockContent
                [code]="entry.command"
                language="bash"
              ></pre>
            </ng-template>
          </div>
        }
      </div>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class PackageManagerInstall {
  private readonly packageManagerService = inject(PackageManagerService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly packages = input.required<string>();

  protected readonly class = computed(() => cn('block', this.classInput()));
  protected readonly selected = this.packageManagerService.selected;

  protected readonly commands = computed(() => {
    const pkg = this.packages();
    return [
      { id: 'pnpm', command: `pnpm add ${pkg}` },
      { id: 'npm', command: `npm install ${pkg}` },
      { id: 'yarn', command: `yarn add ${pkg}` },
      { id: 'bun', command: `bun add ${pkg}` },
    ];
  });

  protected readonly command = computed(
    () =>
      this.commands().find((entry) => entry.id === this.selected())?.command ??
      '',
  );
}
