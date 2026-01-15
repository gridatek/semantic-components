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
  ScOptionLegacy,
  ScSelectLegacy,
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
    ScSelectLegacy,
    ScOptionLegacy,
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
              <sc-select-legacy placeholder="Select" data-slot="control">
                <sc-option-legacy value="next">Next.js</sc-option-legacy>
                <sc-option-legacy value="sveltekit">SvelteKit</sc-option-legacy>
                <sc-option-legacy value="astro">Astro</sc-option-legacy>
                <sc-option-legacy value="nuxt">Nuxt.js</sc-option-legacy>
              </sc-select-legacy>
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
