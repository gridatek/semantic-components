import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LinksCommandDemo } from './links-command-demo';

@Component({
  selector: 'app-links-command-demo-container',
  imports: [DemoContainer, LinksCommandDemo],
  template: `
    <app-demo-container
      title="Links"
      demoUrl="/demos/command/links-command-demo"
      [code]="code"
    >
      <app-links-command-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LinksCommandDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
import { SiFileTextIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** Items on links (a[scCommandItem]): Enter or a click follows them — here to a fragment of this page. */
@Component({
  selector: 'app-links-command-demo',
  imports: [
    RouterLink,
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
    SiFileTextIcon,
    SiSearchIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scCommand #cmd="scCommand" scFrame>
        <div scCommandInputGroup>
          <svg siSearchIcon></svg>
          <input
            scCommandInput
            placeholder="Go to..."
            aria-label="Go to a page"
          />
        </div>
        <div scCommandList aria-label="Pages">
          <div scCommandEmpty>No pages found.</div>
          <div scCommandGroup>
            <div scCommandGroupLabel>Pages</div>
            @for (page of pages; track page.fragment) {
              <a
                scCommandItem
                [routerLink]="[]"
                [fragment]="page.fragment"
                (select)="ran(page.label)"
              >
                <svg siFileTextIcon></svg>
                <span>{{ page.label }}</span>
              </a>
            }
          </div>
        </div>
        <div scCommandStatus>{{ cmd.count() }} results</div>
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
export class LinksCommandDemo {
  protected readonly last = signal('');
  protected readonly pages = [
    { fragment: 'introduction', label: 'Introduction' },
    { fragment: 'installation', label: 'Installation' },
    { fragment: 'theming', label: 'Theming' },
    { fragment: 'changelog', label: 'Changelog' },
  ];

  protected ran(name: string): void {
    this.last.set(name);
  }
}`;
}
