import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UpdateToastDemo } from './update-toast-demo';

@Component({
  selector: 'app-update-toast-demo-container',
  imports: [DemoContainer, UpdateToastDemo],
  template: `
    <app-demo-container
      title="Update"
      [code]="code"
      demoUrl="/demos/toast/update-toast-demo"
    >
      <app-update-toast-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class UpdateToastDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ScButton, ScToaster } from '@semantic-components/ui';

/** One toast, changed in place: a loading toast becomes a success one. */
@Component({
  selector: 'app-update-toast-demo',
  imports: [ScButton],
  template: \`
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
  \`,
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
}`;
}
