import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LinksButtonsMarkerDemo } from './links-buttons-marker-demo';

@Component({
  selector: 'app-links-buttons-marker-demo-container',
  imports: [DemoContainer, LinksButtonsMarkerDemo],
  template: `
    <app-demo-container
      title="Links and buttons"
      demoUrl="/demos/marker/links-buttons-marker-demo"
      [code]="code"
    >
      <app-links-buttons-marker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LinksButtonsMarkerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScMarker,
  ScMarkerContent,
  ScMarkerIcon,
} from '@semantic-components/ui';
import { SiGitBranchIcon, SiRotateCcwIcon } from '@semantic-icons/lucide-icons';

/** scMarker on a link or a button: it does what it says, named by its content. */
@Component({
  selector: 'app-links-buttons-marker-demo',
  imports: [
    ScFrame,
    ScMarker,
    ScMarkerIcon,
    ScMarkerContent,
    SiGitBranchIcon,
    SiRotateCcwIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <a scMarker href="#links-and-buttons">
        <span scMarkerIcon><svg siGitBranchIcon></svg></span>
        <span scMarkerContent>View the pull request</span>
      </a>
      <button scMarker (click)="reverted.set(true)">
        <span scMarkerIcon><svg siRotateCcwIcon></svg></span>
        <span scMarkerContent>Revert this change</span>
      </button>
      @if (reverted()) {
        <p scFrame class="bg-muted p-4 text-sm">Reverted.</p>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinksButtonsMarkerDemo {
  protected readonly reverted = signal(false);
}`;
}
