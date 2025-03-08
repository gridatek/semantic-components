import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewEncapsulation,
  signal,
} from '@angular/core';

@Component({
  selector: 'lib-animated',
  imports: [],
  template: `
    <div
      [class]="
        'transform transition-all duration-500 ease-in-out p-6 bg-white rounded-lg shadow-xl max-w-md w-full ' +
        (animationState() === 'entering'
          ? 'opacity-0 scale-95'
          : animationState() === 'visible'
            ? 'opacity-100 scale-100'
            : animationState() === 'exiting'
              ? 'opacity-0 scale-95'
              : '')
      "
    >
      <h2 class="text-xl font-bold mb-3">{{ title }}</h2>
      <div class="mb-4">{{ content }}</div>
      <div class="flex justify-end space-x-3">
        <button
          class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          (click)="cancel.emit()"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          (click)="confirm.emit()"
        >
          Confirm
        </button>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedContent implements OnInit {
  @Input() title = 'Dialog Title';
  @Input() content = 'Dialog content goes here.';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  animationState = signal<'entering' | 'visible' | 'exiting'>('entering');

  constructor(
    private readonly el: ElementRef,
    private readonly ngZone: NgZone,
  ) {}

  ngOnInit() {
    // Start with entering animation, then transition to visible
    setTimeout(() => {
      this.animationState.set('visible');
    }, 50);
  }

  startExitAnimation(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.animationState.set('exiting');

      const element = this.el.nativeElement.firstChild;
      const onTransitionEnd = () => {
        this.ngZone.run(() => {
          element.removeEventListener('transitionend', onTransitionEnd);
          resolve();
        });
      };

      element.addEventListener('transitionend', onTransitionEnd);
    });
  }
}
