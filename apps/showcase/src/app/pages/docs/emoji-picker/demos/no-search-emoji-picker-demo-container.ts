import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoSearchEmojiPickerDemo } from './no-search-emoji-picker-demo';

@Component({
  selector: 'app-no-search-emoji-picker-demo-container',
  imports: [DemoContainer, NoSearchEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Without Search"
      demoUrl="/demos/emoji-picker/no-search-emoji-picker-demo"
      [code]="code"
    >
      <app-no-search-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoSearchEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-search-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: \`
    <sc-emoji-picker [showSearch]="false" />
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class NoSearchEmojiPickerDemo {}`;
}
