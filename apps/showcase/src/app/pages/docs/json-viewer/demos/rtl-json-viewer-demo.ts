import { Component, ViewEncapsulation } from '@angular/core';
import { ScJsonViewer } from '@semantic-components/ui';

@Component({
  selector: 'app-rtl-json-viewer-demo',
  imports: [ScJsonViewer],
  template: `
    <ul
      scJsonViewer
      dir="rtl"
      lang="ar"
      aria-label="المستخدم"
      rootName="المستخدم"
      [data]="user"
    ></ul>
  `,
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
}
