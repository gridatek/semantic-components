import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-link-demo',
  imports: [ScLink],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <a scLink disabled>Disabled Default</a>
      <a scLink variant="secondary" disabled>Disabled Secondary</a>
      <a scLink variant="outline" disabled>Disabled Outline</a>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledLinkDemo {}
