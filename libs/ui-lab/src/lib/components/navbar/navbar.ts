import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'nav[sc-navbar]',
  hostDirectives: [CdkOverlayOrigin],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'navbar',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavbar {
  readonly elementRef = inject(ElementRef);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly overlayOrigin = inject(CdkOverlayOrigin);

  protected readonly class = computed(() =>
    cn(
      'flex items-center justify-between',
      'w-full px-4 py-3 md:px-6',
      'bg-background border-b border-border',
      this.classInput(),
    ),
  );
}
