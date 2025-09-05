import { Component, input } from '@angular/core';

import { CommandTriggerDemo } from './command-trigger-demo';

@Component({
  selector: 'app-command-trigger-demo-section',
  imports: [CommandTriggerDemo],
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

      <app-command-trigger-demo />
    </section>
  `,
})
export class CommandTriggerDemoSection {
  title = input<string>();
  description = input<string>();
}
