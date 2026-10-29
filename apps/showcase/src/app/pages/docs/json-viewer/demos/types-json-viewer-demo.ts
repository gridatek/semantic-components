import { Component, ViewEncapsulation } from '@angular/core';
import { ScJsonViewer } from '@semantic-components/ui';

@Component({
  selector: 'app-types-json-viewer-demo',
  imports: [ScJsonViewer],
  template: ` <ul scJsonViewer aria-label="Values" [data]="values"></ul> `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class TypesJsonViewerDemo {
  /** JSON's types, and a few that aren't JSON. */
  readonly values = {
    string: 'text',
    number: 3.14,
    boolean: false,
    null: null,
    undefined: undefined,
    bigint: 9007199254740993n,
    date: Temporal.PlainDate.from('2026-10-29'),
    notANumber: NaN,
    emptyObject: {},
    emptyArray: [],
  };
}
