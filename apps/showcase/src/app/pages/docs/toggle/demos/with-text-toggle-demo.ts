import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiItalicIcon } from '@semantic-icons/lucide-icons';

/** An icon and its text: the text names it. */
@Component({
  selector: 'app-with-text-toggle-demo',
  imports: [ScToggle, SiItalicIcon],
  template: `
    <button scToggle [(pressed)]="italic">
      <svg siItalicIcon></svg>
      Italic
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class WithTextToggleDemo {
  protected readonly italic = signal(false);
}
