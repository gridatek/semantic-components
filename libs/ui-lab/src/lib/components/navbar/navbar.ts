import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'nav[scNavbar]',
  hostDirectives: [CdkOverlayOrigin],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
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
