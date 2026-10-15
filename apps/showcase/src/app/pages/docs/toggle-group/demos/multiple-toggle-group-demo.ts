import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

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
    <div class="space-y-4">
      <div
        scToggleGroup
        type="multiple"
        [(value)]="formatting"
        aria-label="Text formatting"
      >
        <button scToggleGroupItem value="bold">
          <svg siBoldIcon></svg>
          <span class="sr-only">Toggle bold</span>
        </button>
        <button scToggleGroupItem value="italic">
          <svg siItalicIcon></svg>
          <span class="sr-only">Toggle italic</span>
        </button>
        <button scToggleGroupItem value="underline">
          <svg siUnderlineIcon></svg>
          <span class="sr-only">Toggle underline</span>
        </button>
      </div>
      <p class="text-muted-foreground text-sm">
        Selected: {{ formattingDisplay() }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleToggleGroupDemo {
  readonly formatting = signal<string[]>(['bold']);

  readonly formattingDisplay = computed(() => {
    const val = this.formatting();
    return val.length > 0 ? val.join(', ') : 'none';
  });
}
