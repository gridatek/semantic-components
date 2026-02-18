import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
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
      'pointer-events-none inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors',
      'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      this.classInput(),
    ),
  );

  protected readonly thumbClass = computed(() =>
    cn(
      'pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
      this.switchField.dataState() === 'checked'
        ? 'translate-x-5'
        : 'translate-x-0',
    ),
  );
}
