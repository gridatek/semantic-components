import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HeadingsTypesetDemo } from './headings-typeset-demo';

@Component({
  selector: 'app-headings-typeset-demo-container',
  imports: [DemoContainer, HeadingsTypesetDemo],
  template: `
    <app-demo-container
      title="Headings"
      demoUrl="/demos/typeset/headings-typeset-demo"
      [code]="code"
    >
      <app-headings-typeset-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HeadingsTypesetDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-headings-typeset-demo',
  imports: [ScHeading],
  template: \`
    <div class="space-y-4">
      <h1 scHeading>This is an H1 Heading</h1>
      <h2 scHeading>This is an H2 Heading</h2>
      <h3 scHeading>This is an H3 Heading</h3>
      <h4 scHeading>This is an H4 Heading</h4>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HeadingsTypesetDemo {}`;
}
