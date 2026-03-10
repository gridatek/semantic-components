import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX } from './lightbox';

@Directive({
  selector: '[scLightboxContainer]',
  host: {
    'data-slot': 'lightbox-container',
    '[class]': 'class()',
    '(click)': 'lightbox.onOverlayClick($event)',
    '(keydown)': 'lightbox.onKeydown($event)',
    tabindex: '-1',
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.aria-label]':
      "'Image gallery, showing image ' + (lightbox.currentIndex() + 1) + ' of ' + lightbox.images().length",
  },
})
export class ScLightboxContainer {
  readonly lightbox = inject(SC_LIGHTBOX);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'lightbox-overlay fixed inset-0 z-50 flex flex-col bg-black/95 animate-in fade-in-0 duration-200',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      if (this.lightbox.isOpen()) {
        this.elementRef.nativeElement.focus();
      }
    });
  }
}
