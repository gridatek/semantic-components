import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScEmpty,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
  ScEmptyDescription,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-empty-demo',
  imports: [
    ScEmpty,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScEmptyDescription,
    SiSearchIcon,
  ],
  template: `
    <div scEmpty class="border">
      <div scEmptyHeader>
        <div scEmptyMedia variant="icon">
          <svg siSearchIcon></svg>
        </div>
        <div scEmptyTitle>No results found</div>
        <div scEmptyDescription>
          Try adjusting your search or filter to find what you're looking for.
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicEmptyDemo {}
