import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge } from '@semantic-components/ui';

/** Charts: shadcn's charts gallery, made with ui/charts. Coming soon. */
@Component({
  selector: 'app-charts',
  imports: [ScBadge],
  template: `
    <section
      class="flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4"
    >
      <span scBadge variant="secondary" class="bg-muted">Coming soon</span>
      <h1
        class="text-primary max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] xl:text-5xl xl:tracking-tighter"
      >
        Charts
      </h1>
      <p class="text-foreground max-w-2xl text-base text-balance sm:text-lg">
        Beautiful charts, built with our chart parts: area, bar, line, pie,
        radar and radial. Copy them into your app.
      </p>
    </section>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class Charts {}
