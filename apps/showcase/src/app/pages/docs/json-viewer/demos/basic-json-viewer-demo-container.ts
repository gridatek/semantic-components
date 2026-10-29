import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicJsonViewerDemo } from './basic-json-viewer-demo';

@Component({
  selector: 'app-basic-json-viewer-demo-container',
  imports: [DemoContainer, BasicJsonViewerDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/json-viewer/basic-json-viewer-demo"
      [code]="code"
    >
      <app-basic-json-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicJsonViewerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScJsonViewer } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-json-viewer-demo',
  imports: [ScJsonViewer],
  template: \` <ul scJsonViewer aria-label="User" [data]="user"></ul> \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicJsonViewerDemo {
  readonly user = {
    id: 42,
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    active: true,
    manager: null,
    roles: ['admin', 'editor', 'viewer'],
    address: { city: 'London', postcode: 'W1', country: 'United Kingdom' },
  };
}`;
}
