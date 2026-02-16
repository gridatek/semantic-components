import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CompactEmojiPickerDemo } from './compact-emoji-picker-demo';

@Component({
  selector: 'app-compact-emoji-picker-demo-container',
  imports: [DemoContainer, CompactEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Compact (6 columns)"
      demoUrl="/demos/emoji-picker/compact-emoji-picker-demo"
      [code]="code"
    >
      <app-compact-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-compact-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: \`
    <sc-emoji-picker [columns]="6" class="w-56" />
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class CompactEmojiPickerDemo {}`;
}
