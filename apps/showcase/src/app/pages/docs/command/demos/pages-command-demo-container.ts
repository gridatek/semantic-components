import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PagesCommandDemo } from './pages-command-demo';

@Component({
  selector: 'app-pages-command-demo-container',
  imports: [DemoContainer, PagesCommandDemo],
  template: `
    <app-demo-container
      title="Pages"
      demoUrl="/demos/command/pages-command-demo"
      [code]="code"
    >
      <app-pages-command-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PagesCommandDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandGroupLabel,
  ScCommandInput,
  ScCommandInputGroup,
  ScCommandItem,
  ScCommandList,
  ScCommandStatus,
  ScFrame,
} from '@semantic-components/ui';
import {
  SiFolderIcon,
  SiFolderPlusIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';

/** Nested pages, as cmdk and kbar show them: an item opens a page, Backspace in an empty search goes back. */
@Component({
  selector: 'app-pages-command-demo',
  imports: [
    ScCommand,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandGroupLabel,
    ScCommandInput,
    ScCommandInputGroup,
    ScCommandItem,
    ScCommandList,
    ScCommandStatus,
    ScFrame,
    SiFolderIcon,
    SiFolderPlusIcon,
    SiSearchIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scCommand #cmd="scCommand" scFrame>
        <div scCommandInputGroup>
          <svg siSearchIcon></svg>
          <input
            scCommandInput
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
          scCommandList
          [attr.aria-label]="page() === 'home' ? 'Commands' : 'Projects'"
        >
          <div scCommandEmpty>No results found.</div>
          @if (page() === 'home') {
            <div scCommandGroup>
              <div scCommandGroupLabel>Actions</div>
              <div scCommandItem (select)="openProjects()">
                <svg siFolderIcon></svg>
                <span>Search projects…</span>
              </div>
              <div scCommandItem (select)="ran('New project')">
                <svg siFolderPlusIcon></svg>
                <span>New project</span>
              </div>
            </div>
          } @else {
            <div scCommandGroup>
              <div scCommandGroupLabel>Projects</div>
              @for (project of projects; track project) {
                <div scCommandItem (select)="ran(project)">
                  {{ project }}
                </div>
              }
            </div>
          }
        </div>
        <div scCommandStatus>{{ cmd.count() }} results</div>
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
export class PagesCommandDemo {
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
