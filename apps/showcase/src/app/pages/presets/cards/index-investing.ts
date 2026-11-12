import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';

/** A short explainer, a link in its text. */
@Component({
  selector: 'app-preview-index-investing',
  imports: [
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Dollar-Cost Averaging</h2>
        <p scCardDescription>A strategy for building wealth over time.</p>
      </div>
      <div scCardContent>
        <p scCardDescription class="mt-3 text-sm leading-relaxed">
          <a href="#" class="hover:text-primary underline underline-offset-4"
            >Over time</a
          >, this smooths out the average cost of your investments. When prices
          drop, your fixed amount buys more shares. When prices rise, you buy
          fewer. The result is a lower average cost per share compared to
          lump-sum investing during volatile periods.
        </p>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewIndexInvesting {}
