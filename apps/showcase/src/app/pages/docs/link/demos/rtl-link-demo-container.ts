import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlLinkDemo } from './rtl-link-demo';

@Component({
  selector: 'app-rtl-link-demo-container',
  imports: [DemoContainer, RtlLinkDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/link/rtl-link-demo"
      [code]="code"
    >
      <app-rtl-link-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlLinkDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiArrowRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-link-demo',
  imports: [ScLink, SiArrowLeftIcon, SiArrowRightIcon],
  template: \`
    <div dir="rtl" lang="ar" class="flex flex-wrap items-center gap-2">
      <a scLink href="/docs/components/button">الأزرار</a>
      <a scLink variant="outline" href="/docs/components/badge">
        <svg
          siArrowLeftIcon
          data-icon="inline-start"
          class="rtl:-scale-x-100"
        ></svg>
        السابق
      </a>
      <a scLink variant="outline" href="/docs/components/card">
        التالي
        <svg
          siArrowRightIcon
          data-icon="inline-end"
          class="rtl:-scale-x-100"
        ></svg>
      </a>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlLinkDemo {}`;
}
