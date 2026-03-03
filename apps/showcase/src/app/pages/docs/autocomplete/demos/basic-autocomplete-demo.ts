import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-basic-autocomplete-demo',
  template: `
    <p class="text-muted-foreground text-sm">Autocomplete demo coming soon.</p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAutocompleteDemo {}
