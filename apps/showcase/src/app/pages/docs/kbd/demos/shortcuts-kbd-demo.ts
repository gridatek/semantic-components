import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-shortcuts-kbd-demo',
  imports: [ScKbd],
  template: `
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground w-24 text-sm">Copy</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>C</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground w-24 text-sm">Paste</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>V</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground w-24 text-sm">Undo</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>Z</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground w-24 text-sm">Save</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>S</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground w-24 text-sm">Search</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>K</kbd>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortcutsKbdDemo {}
