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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoSearchEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmojiPicker,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerRecent,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-search-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerGrid,
    ScEmojiPickerRecent,
  ],
  template: \`
    <div scEmojiPicker>
      <div scEmojiPickerCategoryTabs></div>
      <div scEmojiPickerGrid></div>
      <div scEmojiPickerRecent></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoSearchEmojiPickerDemo {}`;
}
