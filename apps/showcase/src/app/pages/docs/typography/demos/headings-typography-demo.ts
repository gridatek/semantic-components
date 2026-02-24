import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-headings-typography-demo',
  imports: [ScHeading],
  template: `
    <div class="space-y-4">
      <h1 scHeading>This is an H1 Heading</h1>
      <h2 scHeading>This is an H2 Heading</h2>
      <h3 scHeading>This is an H3 Heading</h3>
      <h4 scHeading>This is an H4 Heading</h4>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingsTypographyDemo {}
