import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TestimonialsMarqueeDemo } from './testimonials-marquee-demo';

@Component({
  selector: 'app-testimonials-marquee-demo-container',
  imports: [DemoContainer, TestimonialsMarqueeDemo],
  template: `
    <app-demo-container
      title="Testimonials"
      [code]="code"
      demoUrl="/demos/marquee/testimonials-marquee-demo"
    >
      <app-testimonials-marquee-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TestimonialsMarqueeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScMarquee, ScMarqueeContent } from '@semantic-components/ui-lab';

/** Two rows, going opposite ways. */
@Component({
  selector: 'app-testimonials-marquee-demo',
  imports: [ScMarquee, ScMarqueeContent],
  template: \`
    <section aria-label="What people say" class="w-full space-y-4">
      <div scMarquee fade>
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
      <div scMarquee direction="right" fade>
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
export class TestimonialsMarqueeDemo {
  readonly quotes = [
    { text: 'It just works, and it reads well.', name: 'Ada' },
    { text: 'Our forms finally feel finished.', name: 'Grace' },
    { text: 'Accessible without trying hard.', name: 'Alan' },
    { text: 'The docs answered every question.', name: 'Katherine' },
    { text: 'Small parts, composed: exactly right.', name: 'Edsger' },
  ];
}`;
}
