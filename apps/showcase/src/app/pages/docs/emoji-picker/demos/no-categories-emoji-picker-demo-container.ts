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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoCategoriesEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-categories-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: \`
    <sc-emoji-picker [showCategories]="false" class="h-72" />
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class NoCategoriesEmojiPickerDemo {}`;
}
