import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldset,
  ScInput,
  ScLabel,
  ScOption,
  ScSelect,
} from '@semantic-components/ui';

@Component({
  selector: 'app-card-demo',
  imports: [
    ScCard,
    ScCardHeader,
    ScCardTitle,
    ScCardDescription,
    ScCardContent,
    ScCardFooter,
    ScButton,
    ScFieldset,
    ScField,
    ScLabel,
    ScInput,
    ScSelect,
    ScOption,
  ],
  template: `
    <div class="w-[350px]" sc-card>
      <div sc-card-header>
        <h2 sc-card-title>Create project</h2>
        <p sc-card-description>Deploy your new project in one-click.</p>
      </div>
      <div sc-card-content>
        <form>
          <fieldset sc-fieldset>
            <div sc-field controlId="project-name">
              <label sc-label>Name</label>
              <input sc-input placeholder="Name of your project" data-slot="control" />
            </div>
            <div sc-field controlId="project-framework">
              <label sc-label>Framework</label>
              <sc-select placeholder="Select" data-slot="control">
                <sc-option value="next">Next.js</sc-option>
                <sc-option value="sveltekit">SvelteKit</sc-option>
                <sc-option value="astro">Astro</sc-option>
                <sc-option value="nuxt">Nuxt.js</sc-option>
              </sc-select>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="flex justify-between" sc-card-footer>
        <button sc-button variant="outline">Cancel</button>
        <button sc-button>Deploy</button>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDemo {}
