import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_SWITCH_FIELD } from './switch-types';

@Component({
  selector: 'span[scSwitchVisual]',
  host: {
    'data-slot': 'switch-visual',
    '[class]': 'class()',
    '[attr.data-state]': 'switchField.dataState()',
    '[attr.aria-hidden]': 'true',
  },
  template: `
    <span data-slot="switch-thumb" [class]="thumbClass()"></span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSwitchVisual {
  readonly switchField = inject(SC_SWITCH_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none inline-flex h-[18.4px] w-[32px] shrink-0 items-center rounded-full border border-transparent transition-all',
      'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
      'peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      this.classInput(),
    ),
  );

  protected readonly thumbClass = computed(() =>
    cn(
      'pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform',
      this.switchField.dataState() === 'checked'
        ? 'translate-x-[calc(100%-2px)]'
        : 'translate-x-0',
      this.switchField.dataState() === 'checked'
        ? 'dark:bg-primary-foreground'
        : 'dark:bg-foreground',
    ),
  );
}
