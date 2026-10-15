import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ScButton, ScToaster } from '@semantic-components/ui';

/** One toast, changed in place: a loading toast becomes a success one. */
@Component({
  selector: 'app-update-toast-demo',
  imports: [ScButton],
  template: `
    <div class="flex gap-2">
      <button scButton variant="outline" (click)="start()">Start upload</button>
      <button
        scButton
        variant="outline"
        [disabled]="!toastId()"
        (click)="finish()"
      >
        Finish upload
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class UpdateToastDemo {
  private readonly toaster = inject(ScToaster);
  protected readonly toastId = signal<string | null>(null);

  start(): void {
    this.toastId.set(this.toaster.loading({ description: 'Uploading…' }));
  }

  finish(): void {
    const id = this.toastId();
    if (!id) return;
    this.toaster.update(id, {
      variant: 'success',
      description: 'Upload complete.',
    });
    this.toastId.set(null);
  }
}
