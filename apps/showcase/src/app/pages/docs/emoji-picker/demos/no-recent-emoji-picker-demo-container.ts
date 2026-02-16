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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoRecentEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-recent-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: \`
    <sc-emoji-picker [showRecent]="false" />
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class NoRecentEmojiPickerDemo {}`;
}
