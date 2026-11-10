import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBoldIcon, SiItalicIcon } from '@semantic-icons/lucide-icons';

/** variant="outline": a border round it. */
@Component({
  selector: 'app-outline-toggle-demo',
  imports: [ScToggle, SiBoldIcon, SiItalicIcon],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <button scToggle variant="outline" [(pressed)]="italic">
        <svg siItalicIcon></svg>
        Italic
      </button>
      <button scToggle variant="outline" [(pressed)]="bold">
        <svg siBoldIcon></svg>
        Bold
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OutlineToggleDemo {
  protected readonly italic = signal(false);
  protected readonly bold = signal(false);
}
