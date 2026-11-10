import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { KbdUsageDemo } from './kbd-usage-demo';

@Component({
  selector: 'app-kbd-usage-demo-container',
  imports: [UsageCode, KbdUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-kbd-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class KbdUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScKbdGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-kbd-usage-demo',
  imports: [ScKbd, ScKbdGroup],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <kbd scKbdGroup>
        <kbd scKbd>⌘<span class="sr-only"> Command</span></kbd>
        <kbd scKbd>⇧<span class="sr-only"> Shift</span></kbd>
        <kbd scKbd>⌥<span class="sr-only"> Option</span></kbd>
        <kbd scKbd>⌃<span class="sr-only"> Control</span></kbd>
      </kbd>
      <kbd scKbdGroup>
        <kbd scKbd>Ctrl</kbd>
        <span>+</span>
        <kbd scKbd>B</kbd>
      </kbd>
      <kbd scKbdGroup>
        <kbd scKbd>←<span class="sr-only"> Left</span></kbd>
        <kbd scKbd>↑<span class="sr-only"> Up</span></kbd>
        <kbd scKbd>↓<span class="sr-only"> Down</span></kbd>
        <kbd scKbd>→<span class="sr-only"> Right</span></kbd>
      </kbd>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class KbdUsageDemo {}`;
}
