import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-navigation-menu-indicator]',
  template: `
    <div
      class="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md"
    ></div>
  `,
  host: {
    'data-slot': 'navigation-menu-indicator',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavigationMenuIndicator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'data-[state=visible]:animate-in data-[state=hidden]:animate-out',
      'data-[state=hidden]:fade-out data-[state=visible]:fade-in',
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
      this.classInput(),
    ),
  );
}
