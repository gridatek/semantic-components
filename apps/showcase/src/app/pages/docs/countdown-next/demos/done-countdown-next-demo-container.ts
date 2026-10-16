import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DoneCountdownNextDemo } from './done-countdown-next-demo';

@Component({
  selector: 'app-done-countdown-next-demo-container',
  imports: [DemoContainer, DoneCountdownNextDemo],
  template: `
    <app-demo-container
      title="Done"
      [code]="code"
      demoUrl="/demos/countdown-next/done-countdown-next-demo"
    >
      <app-done-countdown-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DoneCountdownNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScCountdownNext, ScCountdownNextUnit, ScCountdownNextText } from '@semantic-components/ui-lab';

/** Ten seconds; at zero, (completed) — once — and data-done to style what is over. */
@Component({
  selector: 'app-done-countdown-next-demo',
  imports: [ScCountdownNext, ScCountdownNextUnit, ScCountdownNextText, ScButton],
  template: \`
    <div class="flex flex-col items-center gap-3">
      @if (run(); as at) {
        <div
          scCountdownNext
          [until]="at"
          (completed)="over.set(true)"
          aria-label="Doors open in"
          class="data-done:text-muted-foreground gap-1 text-4xl font-semibold"
        >
          <span scCountdownNextUnit="seconds"></span>
          <span scCountdownNextText></span>
        </div>
      }
      <p class="text-sm" role="status">
        {{ over() ? 'The doors are open.' : 'Not yet.' }}
      </p>
      <button scButton variant="outline" (click)="again()">Again</button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DoneCountdownNextDemo {
  readonly run = signal(Temporal.Now.instant().add({ seconds: 10 }));
  readonly over = signal(false);

  again(): void {
    this.over.set(false);
    this.run.set(Temporal.Now.instant().add({ seconds: 10 }));
  }
}`;
}
