import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

@Directive({
  selector: 'span[scAvatarFallback]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAvatarFallback {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-muted text-muted-foreground absolute inset-0 flex size-full items-center justify-center rounded-full text-sm',
      'group-data-[size=sm]/avatar:text-xs',
      // Gone once the image has loaded (it covers this place).
      'group-data-[image=loaded]/avatar:hidden',
      this.classInput(),
    ),
  );
}
