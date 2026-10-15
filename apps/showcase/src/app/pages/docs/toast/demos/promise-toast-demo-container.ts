import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PromiseToastDemo } from './promise-toast-demo';

@Component({
  selector: 'app-promise-toast-demo-container',
  imports: [DemoContainer, PromiseToastDemo],
  template: `
    <app-demo-container
      title="Promise"
      [code]="code"
      demoUrl="/demos/toast/promise-toast-demo"
    >
      <app-promise-toast-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PromiseToastDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ScButton, ScToaster } from '@semantic-components/ui';

/** A loading toast while a promise runs, then its success or its error. */
@Component({
  selector: 'app-promise-toast-demo',
  imports: [ScButton],
  template: \`
    <div class="flex gap-2">
      <button scButton variant="outline" (click)="save(true)">Save</button>
      <button scButton variant="outline" (click)="save(false)">
        Save (fails)
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PromiseToastDemo {
  private readonly toaster = inject(ScToaster);

  save(succeeds: boolean): void {
    const saving = new Promise<string>((resolve, reject) =>
      setTimeout(
        () =>
          succeeds ? resolve('Settings') : reject(new Error('Network error')),
        1500,
      ),
    );
    this.toaster
      .promise(saving, {
        loading: { description: 'Saving…' },
        success: (name) => ({ description: \`\${name} saved.\` }),
        error: (error) => ({
          description: error instanceof Error ? error.message : 'Not saved.',
        }),
      })
      .catch(() => undefined);
  }
}`;
}
