import { Component, input } from '@angular/core';

import { CommandHttpResourceDemo } from './command-http-resource-demo';

@Component({
  selector: 'app-command-http-resource-demo-section',
  imports: [CommandHttpResourceDemo],
  template: `
    <section class="space-y-6 border-b pb-12 mb-12">
      @if (title()) {
        <div>
          <h2 class="text-3xl font-bold tracking-tight">{{ title() }}</h2>
          @if (description()) {
            <p class="text-muted-foreground mt-2">{{ description() }}</p>
          }
        </div>
      }

      <app-command-http-resource-demo />
    </section>
  `,
})
export class CommandHttpResourceDemoSection {
  title = input<string>();
  description = input<string>();
}
