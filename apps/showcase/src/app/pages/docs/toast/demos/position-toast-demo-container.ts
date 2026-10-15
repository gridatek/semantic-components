import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PositionToastDemo } from './position-toast-demo';

@Component({
  selector: 'app-position-toast-demo-container',
  imports: [DemoContainer, PositionToastDemo],
  template: `
    <app-demo-container
      title="Position"
      [code]="code"
      demoUrl="/demos/toast/position-toast-demo"
    >
      <app-position-toast-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PositionToastDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScButton,
  type ScToastPosition,
  ScToaster,
} from '@semantic-components/ui';

/** Each toast at its own position: the others stay where they are. */
@Component({
  selector: 'app-position-toast-demo',
  imports: [ScButton],
  template: \`
    <div class="grid w-fit grid-cols-3 gap-2">
      @for (position of positions; track position.value) {
        <button scButton variant="outline" (click)="show(position.value)">
          {{ position.label }}
        </button>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PositionToastDemo {
  private readonly toaster = inject(ScToaster);

  /** Start and end follow the text's direction (start is on the right in Arabic). */
  readonly positions: { value: ScToastPosition; label: string }[] = [
    { value: 'top-start', label: 'Top start' },
    { value: 'top-center', label: 'Top center' },
    { value: 'top-end', label: 'Top end' },
    { value: 'bottom-start', label: 'Bottom start' },
    { value: 'bottom-center', label: 'Bottom center' },
    { value: 'bottom-end', label: 'Bottom end' },
  ];

  show(position: ScToastPosition): void {
    this.toaster.show({ position, description: \`Shown at \${position}.\` });
  }
}`;
}
