import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithtextCopyButtonDemo } from './withtext-copy-button-demo';

@Component({
  selector: 'app-withtext-copy-button-demo-container',
  imports: [DemoContainer, WithtextCopyButtonDemo],
  template: `
    <app-demo-container title="With Text Label" [code]="code">
      <app-withtext-copy-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithtextCopyButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyButtonWithText } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-withtext-copy-button-demo',
  imports: [ScCopyButtonWithText],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <div sc-copy-button-with-text [value]="'Copy me!'"></div>
      <div
        sc-copy-button-with-text
        [value]="'Custom text'"
        copyText="Copy Link"
        copiedText="Link Copied!"
        variant="outline"
      ></div>
      <div sc-copy-button-with-text [value]="'Small button'" size="sm"></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithtextCopyButtonDemo {}`;
}
