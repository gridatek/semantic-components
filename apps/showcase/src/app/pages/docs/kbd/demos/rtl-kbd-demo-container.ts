import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlKbdDemo } from './rtl-kbd-demo';

@Component({
  selector: 'app-rtl-kbd-demo-container',
  imports: [DemoContainer, RtlKbdDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/kbd/rtl-kbd-demo"
      [code]="code"
    >
      <app-rtl-kbd-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlKbdDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScKbdGroup } from '@semantic-components/ui';

/** In a right-to-left page: the keys in reading order, from the right. */
@Component({
  selector: 'app-rtl-kbd-demo',
  imports: [Dir, ScKbd, ScKbdGroup],
  template: \`
    <div dir="rtl" lang="ar" class="flex flex-col items-center gap-4">
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
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlKbdDemo {}`;
}
