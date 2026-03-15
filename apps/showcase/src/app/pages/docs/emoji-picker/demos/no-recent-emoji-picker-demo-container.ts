import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoRecentEmojiPickerDemo } from './no-recent-emoji-picker-demo';

@Component({
  selector: 'app-no-recent-emoji-picker-demo-container',
  imports: [DemoContainer, NoRecentEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Without Recently Used"
      demoUrl="/demos/emoji-picker/no-recent-emoji-picker-demo"
      [code]="code"
    >
      <app-no-recent-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoRecentEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmojiPicker,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerSearch,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-recent-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerSearch,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerGrid,
  ],
  template: \`
    <div scEmojiPicker>
      <div class="p-2">
        <input scEmojiPickerSearch />
      </div>
      <div scEmojiPickerCategoryTabs></div>
      <div scEmojiPickerGrid></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoRecentEmojiPickerDemo {}`;
}
