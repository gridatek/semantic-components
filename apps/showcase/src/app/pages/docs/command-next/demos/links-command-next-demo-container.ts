import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LinksCommandNextDemo } from './links-command-next-demo';

@Component({
  selector: 'app-links-command-next-demo-container',
  imports: [DemoContainer, LinksCommandNextDemo],
  template: `
    <app-demo-container
      title="Links"
      demoUrl="/demos/command-next/links-command-next-demo"
      [code]="code"
    >
      <app-links-command-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LinksCommandNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
import { SiFileTextIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** Items on links (a[scCommandNextItem]): Enter or a click follows them — here to a fragment of this page. */
@Component({
  selector: 'app-links-command-next-demo',
  imports: [
    RouterLink,
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
    SiFileTextIcon,
    SiSearchIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scCommandNext #cmd="scCommandNext" scFrame>
        <div scCommandNextInputGroup>
          <svg siSearchIcon></svg>
          <input
            scCommandNextInput
            placeholder="Go to..."
            aria-label="Go to a page"
          />
        </div>
        <div scCommandNextList aria-label="Pages">
          <div scCommandNextEmpty>No pages found.</div>
          <div scCommandNextGroup>
            <div scCommandNextGroupLabel>Pages</div>
            @for (page of pages; track page.fragment) {
              <a
                scCommandNextItem
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
        <div scCommandNextStatus>{{ cmd.count() }} results</div>
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
export class LinksCommandNextDemo {
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
