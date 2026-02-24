import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiSmileIcon } from '@semantic-icons/lucide-icons';
import { buttonVariants, cn } from '@semantic-components/ui';

@Component({
  selector: 'button[scEmojiPickerTrigger]',
  imports: [SiSmileIcon],
  template: `
    <ng-content>
      <svg siSmileIcon class="size-4"></svg>
    </ng-content>
  `,
  host: {
    'data-slot': 'emoji-picker-trigger',
    type: 'button',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEmojiPickerTrigger {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );
}
