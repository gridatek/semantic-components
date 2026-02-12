import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCopyButtonDemo } from './basic-copy-button-demo';

@Component({
  selector: 'app-basic-copy-button-demo-container',
  imports: [DemoContainer, BasicCopyButtonDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-copy-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCopyButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-copy-button-demo',
  imports: [ScCopyButton],
  template: \`
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-4">
        <span class="text-sm text-muted-foreground">
          Click to copy "Hello, World!"
        </span>
        <button
          sc-copy-button
          [value]="'Hello, World!'"
          (copySuccess)="onCopy($event)"
        ></button>
      </div>
      @if (lastCopied()) {
        <p class="text-sm text-green-600">Copied: "{{ lastCopied() }}"</p>
      }
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCopyButtonDemo {
  readonly lastCopied = signal<string | null>(null);

  onCopy(value: string): void {
    this.lastCopied.set(value);
    setTimeout(() => this.lastCopied.set(null), 3000);
  }
}`;
}
