import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StackedToastDemo } from './stacked-toast-demo';

@Component({
  selector: 'app-stacked-toast-demo-container',
  imports: [DemoContainer, StackedToastDemo],
  template: `
    <app-demo-container
      title="Stacked"
      [code]="code"
      demoUrl="/demos/toast/stacked-toast-demo"
    >
      <app-stacked-toast-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedToastDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ScButton, ScToaster } from '@semantic-components/ui';

/** Toasts stack, the newest in front; hover or focus them to spread them out. */
@Component({
  selector: 'app-stacked-toast-demo',
  imports: [ScButton],
  template: \`
    <button scButton variant="outline" (click)="showThree()">
      Show three toasts
    </button>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedToastDemo {
  private readonly toaster = inject(ScToaster);

  showThree(): void {
    for (const n of [1, 2, 3]) {
      this.toaster.show({
        title: \`Toast \${n}\`,
        description: 'Hover or focus the stack to see them all.',
      });
    }
  }
}`;
}
