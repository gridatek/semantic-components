import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlBadgeDemo } from './rtl-badge-demo';

@Component({
  selector: 'app-rtl-badge-demo-container',
  imports: [DemoContainer, RtlBadgeDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/badge/rtl-badge-demo"
      [code]="code"
    >
      <app-rtl-badge-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlBadgeDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ScBadge } from '@semantic-components/ui';
import { SiBadgeCheckIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the badges from the right, the icon at the start (right). */
@Component({
  selector: 'app-rtl-badge-demo',
  imports: [Dir, ScBadge, SiBadgeCheckIcon],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full flex-wrap justify-center gap-2">
      <span scBadge>شارة</span>
      <span scBadge variant="secondary">
        <svg siBadgeCheckIcon data-icon="inline-start"></svg>
        موثّق
      </span>
      <span scBadge variant="destructive">مدمّر</span>
      <span scBadge variant="outline">محدد</span>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlBadgeDemo {}`;
}
