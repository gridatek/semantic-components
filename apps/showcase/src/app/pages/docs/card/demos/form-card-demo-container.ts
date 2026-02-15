import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormCardDemo } from './form-card-demo';

@Component({
  selector: 'app-form-card-demo-container',
  imports: [DemoContainer, FormCardDemo],
  template: `
    <app-demo-container
      title="Card with Form"
      demoUrl="/demos/card/form-card-demo"
      [code]="code"
    >
      <app-form-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
import { ScField, ScFieldGroup, ScInput, ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-card-demo',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
  ],
  template: \`
    <form>
      <div sc-card class="w-[350px]">
        <div sc-card-header>
          <h3 sc-card-title>Create project</h3>
          <p sc-card-description>Deploy your new project in one-click.</p>
        </div>
        <div sc-card-body>
          <div sc-field-group>
            <div sc-field>
              <label sc-label for="name">Name</label>
              <input sc-input id="name" placeholder="Name of your project" />
            </div>
            <div sc-field>
              <label sc-label for="framework">Framework</label>
              <select
                id="framework"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select a framework</option>
                <option value="next">Next.js</option>
                <option value="angular">Angular</option>
                <option value="vue">Vue</option>
                <option value="svelte">Svelte</option>
              </select>
            </div>
          </div>
        </div>
        <div sc-card-footer class="flex justify-between">
          <button sc-button variant="outline">Cancel</button>
          <button sc-button>Deploy</button>
        </div>
      </div>
    </form>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardDemo {}`;
}
