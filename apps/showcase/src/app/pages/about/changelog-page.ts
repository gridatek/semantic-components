import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';

@Component({
  selector: 'app-changelog-page',
  imports: [ScTypeset],
  template: `
    <div class="space-y-2">
      <h1 scTypeset>Changelog</h1>
      <p class="text-muted-foreground">Coming soon.</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ChangelogPage {}
