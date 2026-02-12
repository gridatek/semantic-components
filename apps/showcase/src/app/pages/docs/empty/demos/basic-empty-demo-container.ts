import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicEmptyDemo } from './basic-empty-demo';

@Component({
  selector: 'app-basic-empty-demo-container',
  imports: [DemoContainer, BasicEmptyDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-empty-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicEmptyDemoContainer {
  readonly code = `import {
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
} from '@semantic-components/ui-lab';
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
  template: \`
    <div sc-empty class="border">
      <div sc-empty-header>
        <div sc-empty-media variant="icon">
          <svg si-search-icon></svg>
        </div>
        <div sc-empty-title>No results found</div>
        <div sc-empty-description>
          Try adjusting your search or filter to find what you're looking for.
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicEmptyDemo {}`;
}
