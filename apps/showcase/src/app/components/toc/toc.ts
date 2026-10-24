import { Location } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { TocItem } from './toc.service';

@Component({
  selector: 'app-toc',
  template: `
    @if (items().length > 0) {
      <nav aria-label="Table of contents">
        <p class="mb-4 text-sm font-semibold">On This Page</p>
        <ul class="space-y-2 text-sm">
          @for (item of items(); track item.id) {
            <li>
              <a
                [href]="href(item.id)"
                [class]="
                  'hover:text-foreground block transition-colors ' +
                  (item.level === 3 ? 'pl-4 ' : '') +
                  (activeId() === item.id
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground')
                "
                (click)="scrollToSection($event, item.id)"
              >
                {{ item.text }}
              </a>
            </li>
          }
        </ul>
      </nav>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class Toc {
  private readonly location = inject(Location);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly items = input<TocItem[]>([]);
  readonly activeId = input<string>('');

  /**
   * This page, at the section — not `#id` alone: relative to `<base href="/">`
   * it is the home page's.
   */
  protected href(id: string): string {
    return this.location.prepareExternalUrl(this.location.path() + '#' + id);
  }

  scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // A jump, as a `#` link does: a smooth scroll is cut short by any
      // scroll on the way — a virtual list's correcting it, for one.
      element.scrollIntoView({ block: 'start' });
      history.pushState(null, '', this.href(id));
    }
  }
}
