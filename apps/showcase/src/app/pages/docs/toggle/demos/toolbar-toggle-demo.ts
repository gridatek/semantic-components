import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
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
      <button scToggle [(pressed)]="bold" aria-label="Toggle bold">
        <svg si-bold-icon></svg>
      </button>
      <button scToggle [(pressed)]="italic" aria-label="Toggle italic">
        <svg si-italic-icon></svg>
      </button>
      <button scToggle [(pressed)]="underline" aria-label="Toggle underline">
        <svg si-underline-icon></svg>
      </button>
      <button scToggle [(pressed)]="strike" aria-label="Toggle strikethrough">
        <svg si-strikethrough-icon></svg>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarToggleDemo {
  readonly bold = signal(true);
  readonly italic = signal(false);
  readonly underline = signal(false);
  readonly strike = signal(false);
}
