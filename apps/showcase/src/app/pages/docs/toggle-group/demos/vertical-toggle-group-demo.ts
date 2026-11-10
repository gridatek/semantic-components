import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

/** orientation="vertical": stacked; Up and Down move between the items. */
@Component({
  selector: 'app-vertical-toggle-group-demo',
  imports: [
    ScToggleGroup,
    ScToggleGroupItem,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
  ],
  template: `
    <div
      scToggleGroup
      multiple
      orientation="vertical"
      [spacing]="1"
      aria-label="Text formatting"
      [(value)]="formatting"
    >
      <button scToggleGroupItem value="bold">
        <svg siBoldIcon></svg>
        <span class="sr-only">Bold</span>
      </button>
      <button scToggleGroupItem value="italic">
        <svg siItalicIcon></svg>
        <span class="sr-only">Italic</span>
      </button>
      <button scToggleGroupItem value="underline">
        <svg siUnderlineIcon></svg>
        <span class="sr-only">Underline</span>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalToggleGroupDemo {
  protected readonly formatting = signal(['bold', 'italic']);
}
