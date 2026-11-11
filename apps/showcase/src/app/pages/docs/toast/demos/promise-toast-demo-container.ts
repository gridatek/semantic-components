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

/** One toast while a promise runs, then its result: loading, success or error. */
@Component({
  selector: 'app-promise-toast-demo',
  imports: [ScButton],
  template: \`
    <button scButton variant="outline" (click)="create()">Create Event</button>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PromiseToastDemo {
  private readonly toaster = inject(ScToaster);

  create(): void {
    const creating = new Promise<{ name: string }>((resolve) =>
      setTimeout(() => resolve({ name: 'Event' }), 2000),
    );
    this.toaster
      .promise(creating, {
        loading: { description: 'Creating event…' },
        success: (data) => ({ description: \`\${data.name} created.\` }),
        error: { description: 'Could not create event.' },
      })
      .catch(() => undefined);
  }
}`;
}
