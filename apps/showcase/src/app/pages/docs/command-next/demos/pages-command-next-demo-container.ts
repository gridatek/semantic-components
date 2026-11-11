import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PagesCommandNextDemo } from './pages-command-next-demo';

@Component({
  selector: 'app-pages-command-next-demo-container',
  imports: [DemoContainer, PagesCommandNextDemo],
  template: `
    <app-demo-container
      title="Pages"
      demoUrl="/demos/command-next/pages-command-next-demo"
      [code]="code"
    >
      <app-pages-command-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PagesCommandNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCommandNext,
  ScCommandNextEmpty,
  ScCommandNextGroup,
  ScCommandNextGroupLabel,
  ScCommandNextInput,
  ScCommandNextInputGroup,
  ScCommandNextItem,
  ScCommandNextList,
  ScCommandNextStatus,
  ScFrame,
} from '@semantic-components/ui';
import {
  SiFolderIcon,
  SiFolderPlusIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';

/** Nested pages, as cmdk and kbar show them: an item opens a page, Backspace in an empty search goes back. */
@Component({
  selector: 'app-pages-command-next-demo',
  imports: [
    ScCommandNext,
    ScCommandNextEmpty,
    ScCommandNextGroup,
    ScCommandNextGroupLabel,
    ScCommandNextInput,
    ScCommandNextInputGroup,
    ScCommandNextItem,
    ScCommandNextList,
    ScCommandNextStatus,
    ScFrame,
    SiFolderIcon,
    SiFolderPlusIcon,
    SiSearchIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scCommandNext #cmd="scCommandNext" scFrame>
        <div scCommandNextInputGroup>
          <svg siSearchIcon></svg>
          <input
            scCommandNextInput
            [placeholder]="
              page() === 'home' ? 'What do you need?' : 'Search projects...'
            "
            [attr.aria-label]="
              page() === 'home' ? 'Search commands' : 'Search projects'
            "
            [(value)]="search"
            (keydown.backspace)="back()"
          />
        </div>
        <div
          scCommandNextList
          [attr.aria-label]="page() === 'home' ? 'Commands' : 'Projects'"
        >
          <div scCommandNextEmpty>No results found.</div>
          @if (page() === 'home') {
            <div scCommandNextGroup>
              <div scCommandNextGroupLabel>Actions</div>
              <div scCommandNextItem (select)="openProjects()">
                <svg siFolderIcon></svg>
                <span>Search projects…</span>
              </div>
              <div scCommandNextItem (select)="ran('New project')">
                <svg siFolderPlusIcon></svg>
                <span>New project</span>
              </div>
            </div>
          } @else {
            <div scCommandNextGroup>
              <div scCommandNextGroupLabel>Projects</div>
              @for (project of projects; track project) {
                <div scCommandNextItem (select)="ran(project)">
                  {{ project }}
                </div>
              }
            </div>
          }
        </div>
        <div scCommandNextStatus>{{ cmd.count() }} results</div>
      </div>
      <p class="text-muted-foreground text-sm">
        @if (page() === 'projects') {
          Backspace in the empty search goes back.
        }
      </p>
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
export class PagesCommandNextDemo {
  protected readonly page = signal<'home' | 'projects'>('home');
  protected readonly search = signal('');
  protected readonly last = signal('');
  protected readonly projects = [
    'Website redesign',
    'Mobile app',
    'Design system',
    'Docs',
  ];

  protected openProjects(): void {
    this.page.set('projects');
    this.search.set('');
  }

  /** Backspace in an empty search: the page before. */
  protected back(): void {
    if (!this.search() && this.page() !== 'home') this.page.set('home');
  }

  protected ran(name: string): void {
    this.last.set(name);
  }
}`;
}
