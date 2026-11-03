import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'caption[scTableCaption]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTableCaption {
  private readonly styles = injectPreset().table;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.caption, this.classInput()),
  );
}
