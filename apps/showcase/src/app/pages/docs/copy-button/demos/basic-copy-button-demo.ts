import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScCopyButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-copy-button-demo',
  imports: [ScCopyButton],
  template: `
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCopyButtonDemo {
  readonly lastCopied = signal<string | null>(null);

  onCopy(value: string): void {
    this.lastCopied.set(value);
    setTimeout(() => this.lastCopied.set(null), 3000);
  }
}
