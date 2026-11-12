import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'div[scDialogFooter]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDialogFooter {
  private readonly styles = injectPreset().dialog;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
