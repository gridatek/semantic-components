import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-complex-shortcuts-kbd-demo',
  imports: [ScKbd],
  template: `
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-32">Screenshot</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>Shift</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>4</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-32">Force Quit</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>Option</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>Esc</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-32">Dev Tools</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>Option</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>I</kbd>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexShortcutsKbdDemo {}
