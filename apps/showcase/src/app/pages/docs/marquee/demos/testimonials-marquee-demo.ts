import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame, ScMarquee, ScMarqueeContent } from '@semantic-components/ui';

/** Two rows, going opposite ways. */
@Component({
  selector: 'app-testimonials-marquee-demo',
  imports: [ScFrame, ScMarquee, ScMarqueeContent],
  template: `
    <section aria-label="What people say" class="w-full space-y-4">
      <div scMarquee fade>
        <ng-template scMarqueeContent>
          @for (quote of quotes; track quote.name) {
            <figure scFrame class="bg-card w-64 p-4 text-sm">
              <blockquote>“{{ quote.text }}”</blockquote>
              <figcaption class="text-muted-foreground mt-2">
                — {{ quote.name }}
              </figcaption>
            </figure>
          }
        </ng-template>
      </div>
      <div scMarquee direction="end" fade>
        <ng-template scMarqueeContent>
          @for (quote of quotes; track quote.name) {
            <figure scFrame class="bg-card w-64 p-4 text-sm">
              <blockquote>“{{ quote.text }}”</blockquote>
              <figcaption class="text-muted-foreground mt-2">
                — {{ quote.name }}
              </figcaption>
            </figure>
          }
        </ng-template>
      </div>
    </section>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TestimonialsMarqueeDemo {
  private readonly quotes = [
    { text: 'It just works, and it reads well.', name: 'Ada' },
    { text: 'Our forms finally feel finished.', name: 'Grace' },
    { text: 'Accessible without trying hard.', name: 'Alan' },
    { text: 'The docs answered every question.', name: 'Katherine' },
    { text: 'Small parts, composed: exactly right.', name: 'Edsger' },
  ];
}
