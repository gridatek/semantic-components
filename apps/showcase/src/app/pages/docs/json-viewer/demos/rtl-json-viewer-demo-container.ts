import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlJsonViewerDemo } from './rtl-json-viewer-demo';

@Component({
  selector: 'app-rtl-json-viewer-demo-container',
  imports: [DemoContainer, RtlJsonViewerDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/json-viewer/rtl-json-viewer-demo"
      [code]="code"
    >
      <app-rtl-json-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlJsonViewerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScJsonViewer } from '@semantic-components/ui';

@Component({
  selector: 'app-rtl-json-viewer-demo',
  imports: [ScJsonViewer],
  template: \`
    <ul
      scJsonViewer
      dir="rtl"
      lang="ar"
      aria-label="المستخدم"
      rootName="المستخدم"
      [data]="user"
    ></ul>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlJsonViewerDemo {
  readonly user = {
    الاسم: 'ليلى',
    المدينة: 'الرباط',
    العمر: 31,
    نشط: true,
    الأدوار: ['مديرة', 'محررة'],
  };
}`;
}
