import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'caption[scTableCaption]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTableCaption {
  private readonly styles = injectStyle().table;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.caption, this.classInput()),
  );
}
