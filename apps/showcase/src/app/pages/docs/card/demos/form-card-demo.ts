import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScInput,
  ScLabel,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-card-demo',
  imports: [
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScInput,
    ScLabel,
  ],
  template: `
    <div sc-card class="w-[350px]">
      <div sc-card-header>
        <h3 sc-card-title>Create project</h3>
        <p sc-card-description>Deploy your new project in one-click.</p>
      </div>
      <div sc-card-content>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <label sc-label for="name">Name</label>
            <input sc-input id="name" placeholder="Name of your project" />
          </div>
          <div class="flex flex-col space-y-1.5">
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
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Cancel
        </button>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Deploy
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardDemo {}
