import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-complex-shortcuts-kbd-demo',
  imports: [ScKbd],
  template: `
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-32">Screenshot</span>
        <kbd sc-kbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd sc-kbd>Shift</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd sc-kbd>4</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-32">Force Quit</span>
        <kbd sc-kbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd sc-kbd>Option</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd sc-kbd>Esc</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-32">Dev Tools</span>
        <kbd sc-kbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd sc-kbd>Option</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd sc-kbd>I</kbd>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexShortcutsKbdDemo {}
