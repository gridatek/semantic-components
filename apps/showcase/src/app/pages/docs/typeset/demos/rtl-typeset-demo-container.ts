import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlTypesetDemo } from './rtl-typeset-demo';

@Component({
  selector: 'app-rtl-typeset-demo-container',
  imports: [DemoContainer, RtlTypesetDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/typeset/rtl-typeset-demo"
      [code]="code"
    >
      <app-rtl-typeset-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTypesetDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';

/** Right to left: the text from the right, the quote's rule and the bullets on the right. */
@Component({
  selector: 'app-rtl-typeset-demo',
  imports: [Dir],
  template: \`
    <div dir="rtl" lang="ar">
      <article class="typeset max-w-prose">
        <h2>ضريبة النكات</h2>
        <p>
          كان يا ما كان، في أرض بعيدة، ملك كسول جدًا يقضي يومه كله مستلقيًا على
          عرشه. وذات يوم جاءه مستشاروه بمشكلة: خزينة المملكة تكاد تفرغ.
        </p>
        <blockquote>
          «في النهاية، الجميع يحب النكتة الجيدة، فمن العدل أن يدفعوا ثمن هذا
          الامتياز».
        </blockquote>
        <ul>
          <li>المستوى الأول من التورية: خمس قطع ذهبية</li>
          <li>المستوى الثاني من النكات: عشر قطع ذهبية</li>
        </ul>
      </article>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTypesetDemo {}`;
}
