import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { SiGitBranchIcon, SiGitForkIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-with-icon-button-demo',
  imports: [ScButton, SiGitBranchIcon, SiGitForkIcon],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <button scButton variant="outline" size="sm">
        <svg siGitBranchIcon data-icon="inline-start"></svg>
        New Branch
      </button>
      <button scButton variant="outline" size="sm">
        Fork
        <svg siGitForkIcon data-icon="inline-end"></svg>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class WithIconButtonDemo {}
