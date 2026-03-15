import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoCategoriesEmojiPickerDemo } from './no-categories-emoji-picker-demo';

@Component({
  selector: 'app-no-categories-emoji-picker-demo-container',
  imports: [DemoContainer, NoCategoriesEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Without Category Tabs"
      demoUrl="/demos/emoji-picker/no-categories-emoji-picker-demo"
      [code]="code"
    >
      <app-no-categories-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoCategoriesEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmojiPicker,
  ScEmojiPickerGrid,
  ScEmojiPickerRecent,
  ScEmojiPickerSearch,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-categories-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerSearch,
    ScEmojiPickerGrid,
    ScEmojiPickerRecent,
  ],
  template: \`
    <div scEmojiPicker class="h-72">
      <div class="p-2">
        <input scEmojiPickerSearch />
      </div>
      <div scEmojiPickerGrid></div>
      <div scEmojiPickerRecent></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCategoriesEmojiPickerDemo {}`;
}
