import { Component, ViewEncapsulation } from '@angular/core';
import { ScJsonViewer } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-json-viewer-demo',
  imports: [ScJsonViewer],
  template: ` <ul scJsonViewer aria-label="User" [data]="user"></ul> `,
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
}
