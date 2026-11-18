import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlyRadioGroupDemo } from './read-only-radio-group-demo';

@Component({
  selector: 'app-read-only-radio-group-demo-container',
  imports: [DemoContainer, ReadOnlyRadioGroupDemo],
  template: `
    <app-demo-container
      title="Read-only"
      demoUrl="/demos/radio-group/read-only-radio-group-demo"
      [code]="code"
    >
      <app-read-only-radio-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyRadioGroupDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, readonly } from '@angular/forms/signals';
import { ScField, ScRadio, ScRadioGroup } from '@semantic-components/ui';

/** Read-only in its form: the choice shows and takes focus, but doesn't change. */
@Component({
  selector: 'app-read-only-radio-group-demo',
  imports: [FormField, ScRadio, ScRadioGroup, ScField],
  template: \`
    <div
      scRadioGroup
      [formField]="planForm.plan"
      aria-label="Plan"
      class="w-fit"
    >
      <label scField orientation="horizontal">
        <input scRadio value="free" />
        Free
      </label>
      <label scField orientation="horizontal">
        <input scRadio value="pro" />
        Pro
      </label>
      <label scField orientation="horizontal">
        <input scRadio value="team" />
        Team
      </label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyRadioGroupDemo {
  private readonly planForm = form(signal({ plan: 'pro' }), (path) => {
    readonly(path.plan);
  });
}`;
}
