import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSpinnerDemo } from './rtl-spinner-demo';

@Component({
  selector: 'app-rtl-spinner-demo-container',
  imports: [DemoContainer, RtlSpinnerDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/spinner/rtl-spinner-demo"
      [code]="code"
    >
      <app-rtl-spinner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSpinnerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge, ScButton, ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: before the text, on the right. */
@Component({
  selector: 'app-rtl-spinner-demo',
  imports: [ScBadge, ScButton, ScSpinner, SiLoaderCircleIcon],
  template: \`
    <div dir="rtl" lang="ar" class="flex flex-col items-center gap-4">
      <button scButton disabled size="sm">
        <svg
          scSpinner
          siLoaderCircleIcon
          aria-label="جارٍ التحميل"
          data-icon="inline-start"
        ></svg>
        جارٍ التحميل...
      </button>
      <span scBadge variant="secondary">
        <svg
          scSpinner
          siLoaderCircleIcon
          aria-label="جارٍ التحديث"
          data-icon="inline-start"
        ></svg>
        جارٍ التحديث
      </span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSpinnerDemo {}`;
}
