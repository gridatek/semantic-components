import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalMarqueeDemo } from './vertical-marquee-demo';

@Component({
  selector: 'app-vertical-marquee-demo-container',
  imports: [DemoContainer, VerticalMarqueeDemo],
  template: `
    <app-demo-container
      title="Vertical"
      [code]="code"
      demoUrl="/demos/marquee/vertical-marquee-demo"
    >
      <app-vertical-marquee-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalMarqueeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScMarquee, ScMarqueeContent } from '@semantic-components/ui';

/** A column, going up: give it a height. */
@Component({
  selector: 'app-vertical-marquee-demo',
  imports: [ScMarquee, ScMarqueeContent],
  template: \`
    <section aria-label="Reviews" class="h-80">
      <div scMarquee direction="up" fade class="h-full">
        <ng-template scMarqueeContent>
          @for (quote of quotes; track quote.name) {
            <figure
              class="bg-card w-64 rounded-lg border p-4 text-sm shadow-xs"
            >
              <blockquote>“{{ quote.text }}”</blockquote>
              <figcaption class="text-muted-foreground mt-2">
                — {{ quote.name }}
              </figcaption>
            </figure>
          }
        </ng-template>
      </div>
    </section>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalMarqueeDemo {
  readonly quotes = [
    { text: 'It just works, and it reads well.', name: 'Ada' },
    { text: 'Our forms finally feel finished.', name: 'Grace' },
    { text: 'Accessible without trying hard.', name: 'Alan' },
    { text: 'The docs answered every question.', name: 'Katherine' },
    { text: 'Small parts, composed: exactly right.', name: 'Edsger' },
  ];
}`;
}
