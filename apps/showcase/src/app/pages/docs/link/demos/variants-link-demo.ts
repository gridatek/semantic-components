import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-link-demo',
  imports: [ScLink],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <a scLink>Default</a>
      <a scLink variant="secondary">Secondary</a>
      <a scLink variant="destructive">Destructive</a>
      <a scLink variant="outline">Outline</a>
      <a scLink variant="ghost">Ghost</a>
      <a scLink variant="link">Link</a>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsLinkDemo {}
