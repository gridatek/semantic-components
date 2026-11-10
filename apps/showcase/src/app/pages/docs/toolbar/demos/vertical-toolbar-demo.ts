import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScToggle,
  ScToolbar,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

/** orientation="vertical": stacked; Up and Down move between the widgets. */
@Component({
  selector: 'app-vertical-toolbar-demo',
  imports: [
    ScToggle,
    ScToolbar,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
  ],
  template: `
    <div scToolbar orientation="vertical" aria-label="Text formatting">
      <div
        scToolbarWidgetGroup
        multiple
        aria-label="Marks"
        class="flex-col"
        [(value)]="marks"
      >
        <button scToolbarWidget scToggle size="sm" value="bold">
          <svg siBoldIcon></svg>
          <span class="sr-only">Bold</span>
        </button>
        <button scToolbarWidget scToggle size="sm" value="italic">
          <svg siItalicIcon></svg>
          <span class="sr-only">Italic</span>
        </button>
        <button scToolbarWidget scToggle size="sm" value="underline">
          <svg siUnderlineIcon></svg>
          <span class="sr-only">Underline</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalToolbarDemo {
  protected readonly marks = signal(['bold']);
}
