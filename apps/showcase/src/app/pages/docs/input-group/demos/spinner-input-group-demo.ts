import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-spinner-input-group-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: `
    <div class="grid w-full max-w-sm gap-4">
      <div scInputGroup>
        <input scInput placeholder="Searching..." aria-label="Search" />
        <div scInputGroupAddon align="inline-end">
          <svg scSpinner siLoaderCircleIcon aria-label="Loading"></svg>
        </div>
      </div>
      <div scInputGroup>
        <input scInput placeholder="Processing..." aria-label="Task" />
        <div scInputGroupAddon>
          <svg scSpinner siLoaderCircleIcon aria-label="Loading"></svg>
        </div>
      </div>
      <div scInputGroup>
        <input scInput placeholder="Saving changes..." aria-label="Title" />
        <div scInputGroupAddon align="inline-end">
          <span scInputGroupText>Saving...</span>
          <svg scSpinner siLoaderCircleIcon aria-label="Loading"></svg>
        </div>
      </div>
      <div scInputGroup>
        <input scInput placeholder="Refreshing data..." aria-label="Data" />
        <div scInputGroupAddon>
          <svg scSpinner siLoaderCircleIcon aria-label="Loading"></svg>
        </div>
        <div scInputGroupAddon align="inline-end">
          <span scInputGroupText class="text-muted-foreground">
            Please wait...
          </span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerInputGroupDemo {}
