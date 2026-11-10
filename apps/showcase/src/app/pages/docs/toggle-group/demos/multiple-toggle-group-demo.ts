import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

/** Several pressed at a time: the value lists them. */
@Component({
  selector: 'app-multiple-toggle-group-demo',
  imports: [
    ScToggleGroup,
    ScToggleGroupItem,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
  ],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div
        scToggleGroup
        multiple
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
      <p class="text-muted-foreground text-sm">
        Formatting: {{ formatting().join(', ') || 'none' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleToggleGroupDemo {
  protected readonly formatting = signal(['bold']);
}
