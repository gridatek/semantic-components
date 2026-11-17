import { Component, ViewEncapsulation, input } from '@angular/core';
import { ScButton, ScSeparator } from '@semantic-components/ui';
import { SiGithubIcon, SiGlobeIcon } from '@semantic-icons/lucide-icons';

/** Sign in with Google or GitHub, then "or" (shadcndashboard's social-buttons). */
@Component({
  selector: 'app-social-buttons',
  imports: [ScButton, ScSeparator, SiGithubIcon, SiGlobeIcon],
  template: `
    <div class="grid grid-cols-2 gap-3">
      <button scButton variant="outline" type="button">
        <svg siGlobeIcon></svg>
        Google
      </button>
      <button scButton variant="outline" type="button">
        <svg siGithubIcon></svg>
        GitHub
      </button>
    </div>
    <div class="text-muted-foreground flex items-center gap-3 text-sm">
      <div scSeparator class="flex-1"></div>
      or {{ action() }} with email
      <div scSeparator class="flex-1"></div>
    </div>
  `,
  host: { class: 'flex flex-col gap-6' },
  encapsulation: ViewEncapsulation.None,
})
export class SocialButtons {
  readonly action = input('sign in');
}
