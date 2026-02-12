import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-select-trigger]',
  imports: [],
  template: `
    <ng-content />
  `,
  hostDirectives: [CdkOverlayOrigin],
  host: {
    'data-slot': 'select-trigger',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectTrigger {
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-input bg-background relative flex h-9 w-full items-center rounded-md border px-3 text-sm shadow-xs transition-colors hover:bg-accent/50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background has-[[aria-disabled=true]]:cursor-not-allowed has-[[aria-disabled=true]]:opacity-50',
      this.classInput(),
    ),
  );
}
