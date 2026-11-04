import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AnnouncedAlertDemo } from './announced-alert-demo';

@Component({
  selector: 'app-announced-alert-demo-container',
  imports: [DemoContainer, AnnouncedAlertDemo],
  template: `
    <app-demo-container
      title="Announced"
      demoUrl="/demos/alert/announced-alert-demo"
      [code]="code"
    >
      <app-announced-alert-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AnnouncedAlertDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAlert,
  ScAlertDescription,
  ScAlertTitle,
  ScButton,
} from '@semantic-components/ui';
import { SiCircleCheckIcon } from '@semantic-icons/lucide-icons';

/**
 * An alert that appears after an action, announced: role="status" (polite:
 * read when the reader is free). role="alert" is for the urgent — it
 * interrupts. The region is on the page from the start, so the change is
 * heard; an alert already there needs no role.
 */
@Component({
  selector: 'app-announced-alert-demo',
  imports: [
    ScAlert,
    ScAlertDescription,
    ScAlertTitle,
    ScButton,
    SiCircleCheckIcon,
  ],
  template: \`
    <div class="grid w-full max-w-md gap-4">
      <button
        scButton
        variant="outline"
        class="justify-self-start"
        (click)="save()"
      >
        Save changes
      </button>
      <div role="status">
        @if (saved()) {
          <div scAlert>
            <svg siCircleCheckIcon></svg>
            <div scAlertTitle>Changes saved</div>
            <div scAlertDescription>Your settings are up to date.</div>
          </div>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AnnouncedAlertDemo {
  protected readonly saved = signal(false);

  protected save(): void {
    this.saved.set(true);
  }
}`;
}
