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
        <span class="text-sm text-muted-foreground w-24">Copy</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>C</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-24">Paste</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>V</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-24">Undo</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>Z</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-24">Save</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>S</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-24">Search</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>K</kbd>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortcutsKbdDemo {}
