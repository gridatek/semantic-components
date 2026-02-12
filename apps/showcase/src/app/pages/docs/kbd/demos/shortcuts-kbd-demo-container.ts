import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ShortcutsKbdDemo } from './shortcuts-kbd-demo';

@Component({
  selector: 'app-shortcuts-kbd-demo-container',
  imports: [DemoContainer, ShortcutsKbdDemo],
  template: `
    <app-demo-container
      title="Keyboard Shortcuts"
      demoUrl="/demos/kbd/shortcuts-kbd-demo"
      [code]="code"
    >
      <app-shortcuts-kbd-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortcutsKbdDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-shortcuts-kbd-demo',
  imports: [ScKbd],
  template: \`
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-24">Copy</span>
        <kbd sc-kbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd sc-kbd>C</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-24">Paste</span>
        <kbd sc-kbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd sc-kbd>V</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-24">Undo</span>
        <kbd sc-kbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd sc-kbd>Z</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-24">Save</span>
        <kbd sc-kbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd sc-kbd>S</kbd>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground w-24">Search</span>
        <kbd sc-kbd>⌘</kbd>
        <span class="text-muted-foreground">+</span>
        <kbd sc-kbd>K</kbd>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortcutsKbdDemo {}`;
}
