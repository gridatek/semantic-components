import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'div[scCardContent]',
  host: {
    // Read by the parts inside that blend in (a calendar: no background).
    'data-slot': 'card-content',
    '[class]': 'class()',
  },
})
export class ScCardContent {
  private readonly styles = injectPreset().card;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.content, this.classInput()),
  );
}
