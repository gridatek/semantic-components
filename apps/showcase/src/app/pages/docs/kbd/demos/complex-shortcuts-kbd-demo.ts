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
        <span class="text-muted-foreground w-32 text-sm">Screenshot</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>Shift</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>4</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground w-32 text-sm">Force Quit</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>Option</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>Esc</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground w-32 text-sm">Dev Tools</span>
        <kbd scKbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>Option</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd scKbd>I</kbd>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexShortcutsKbdDemo {}
