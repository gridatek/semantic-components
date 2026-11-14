import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlToggleDemo } from './rtl-toggle-demo';

@Component({
  selector: 'app-rtl-toggle-demo-container',
  imports: [DemoContainer, RtlToggleDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/toggle/rtl-toggle-demo"
      [code]="code"
    >
      <app-rtl-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlToggleDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiBookmarkIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the icon at the start, on the right. */
@Component({
  selector: 'app-rtl-toggle-demo',
  imports: [Dir, ScToggle, SiBookmarkIcon],
  template: \`
    <div dir="rtl" lang="ar">
      <button scToggle variant="outline" size="sm" [(pressed)]="bookmarked">
        <svg
          siBookmarkIcon
          class="group-aria-pressed/toggle:fill-foreground"
        ></svg>
        إشارة مرجعية
      </button>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlToggleDemo {
  protected readonly bookmarked = signal(false);
}`;
}
