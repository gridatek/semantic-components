import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LiveQrCodeNextDemo } from './live-qr-code-next-demo';

@Component({
  selector: 'app-live-qr-code-next-demo-container',
  imports: [DemoContainer, LiveQrCodeNextDemo],
  template: `
    <app-demo-container
      title="Live"
      [code]="code"
      demoUrl="/demos/qr-code-next/live-qr-code-next-demo"
    >
      <app-live-qr-code-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LiveQrCodeNextDemoContainer {
  private readonly code = `import { FormField, form } from '@angular/forms/signals';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScField, ScLabel, ScInput, ScButton } from '@semantic-components/ui';
import { ScQrCodeNext } from '@semantic-components/ui/qr-code';

/** Drawn as you type. A value too long to encode draws nothing and sets error(). */
@Component({
  selector: 'app-live-qr-code-next-demo',
  imports: [FormField, ScField, ScLabel, ScInput, ScButton, ScQrCodeNext],
  template: \`
    <div class="flex w-full max-w-sm flex-col items-center gap-4">
      <svg
        scQrCodeNext
        #qr="scQrCodeNext"
        [value]="text()"
        aria-label="QR code for the text below"
      ></svg>
      @if (qr.error()) {
        <p class="text-destructive text-sm" role="alert">
          Too long to fit in a QR code.
        </p>
      }
      <div scField class="w-full">
        <label scLabel for="qr-live-text">Text or link</label>
        <input id="qr-live-text" scInput [formField]="textForm.text" />
      </div>
      <div class="flex gap-2">
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="set('https://angular.dev')"
        >
          Link
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="set('mailto:hello@example.com')"
        >
          Email
        </button>
        <button scButton variant="outline" size="sm" (click)="set(long)">
          Too long
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LiveQrCodeNextDemo {
  private readonly model = signal({ text: 'https://angular.dev' });
  private readonly textForm = form(this.model);
  private readonly text = computed(() => this.model().text);

  /** More than a QR code holds. */
  private readonly long = 'x'.repeat(3000);

  private set(text: string): void {
    this.model.set({ text });
  }
}`;
}
