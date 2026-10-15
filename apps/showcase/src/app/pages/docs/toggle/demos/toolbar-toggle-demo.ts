import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiStrikethroughIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-toolbar-toggle-demo',
  imports: [
    ScToggle,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
    SiStrikethroughIcon,
  ],
  template: `
    <div class="flex items-center gap-1 rounded-md border p-1">
      <button scToggle [(pressed)]="bold">
        <svg siBoldIcon></svg>
        <span class="sr-only">Toggle bold</span>
      </button>
      <button scToggle [(pressed)]="italic">
        <svg siItalicIcon></svg>
        <span class="sr-only">Toggle italic</span>
      </button>
      <button scToggle [(pressed)]="underline">
        <svg siUnderlineIcon></svg>
        <span class="sr-only">Toggle underline</span>
      </button>
      <button scToggle [(pressed)]="strike">
        <svg siStrikethroughIcon></svg>
        <span class="sr-only">Toggle strikethrough</span>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarToggleDemo {
  readonly bold = signal(true);
  readonly italic = signal(false);
  readonly underline = signal(false);
  readonly strike = signal(false);
}
