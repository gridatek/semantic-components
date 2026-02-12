import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { TocItem } from './toc.service';

@Component({
  selector: 'app-toc',
  template: `
    @if (items().length > 0) {
      <nav aria-label="Table of contents">
        <h4 class="mb-4 text-sm font-semibold">On This Page</h4>
        <ul class="space-y-2 text-sm">
          @for (item of items(); track item.id) {
            <li>
              <a
                [href]="'#' + item.id"
                [class]="
                  'block transition-colors hover:text-foreground ' +
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
    'data-slot': 'toc',
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toc {
  readonly items = input<TocItem[]>([]);
  readonly activeId = input<string>('');

  scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${id}`);
    }
  }
}
