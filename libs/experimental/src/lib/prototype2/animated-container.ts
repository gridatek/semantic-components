import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

// Animation states type
export type AnimationState = 'initial' | 'entering' | 'visible' | 'exiting' | 'removed';

@Component({
  selector: 'lib-animated-container',
  imports: [],
  template: `
    @if (currentState() !== 'removed') {
      <div [class]="getClassesForState()" (transitionend)="onTransitionEnd($event)">
        <ng-content />
      </div>
    }
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedContainer {
  readonly state = input<'visible' | 'hidden'>('visible');
  readonly animation = input<'fade' | 'slide' | 'zoom' | 'collapse'>('fade');
  readonly duration = input<'fast' | 'normal' | 'slow'>('normal');
  readonly stateChange = output<AnimationState>();

  protected readonly currentState = signal<AnimationState>('initial');

  constructor() {
    effect(() => {
      const state = this.state();
      if (
        state === 'visible' &&
        (this.currentState() === 'initial' ||
          this.currentState() === 'removed' ||
          this.currentState() === 'exiting')
      ) {
        this.currentState.set('entering');
        this.stateChange.emit(this.currentState());

        // Schedule change to visible after a brief delay
        setTimeout(() => {
          this.currentState.set('visible');
          this.stateChange.emit(this.currentState());
        }, 50);
      } else if (
        state === 'hidden' &&
        (this.currentState() === 'visible' || this.currentState() === 'entering')
      ) {
        this.currentState.set('exiting');
        this.stateChange.emit(this.currentState());
      }
    });
  }

  getClassesForState(): string {
    // Base transition classes
    const durationClass = this.getDurationClass();
    let classes = `transition-all ${durationClass} ease-in-out `;

    // Animation type specific classes
    switch (this.animation()) {
      case 'fade':
        classes += this.getFadeClasses();
        break;
      case 'slide':
        classes += this.getSlideClasses();
        break;
      case 'zoom':
        classes += this.getZoomClasses();
        break;
      case 'collapse':
        classes += this.getCollapseClasses();
        break;
    }

    return classes;
  }

  private getDurationClass(): string {
    switch (this.duration()) {
      case 'fast':
        return 'duration-150';
      case 'slow':
        return 'duration-700';
      default:
        return 'duration-300';
    }
  }

  private getFadeClasses(): string {
    switch (this.currentState()) {
      case 'entering':
        return 'opacity-0';
      case 'visible':
        return 'opacity-100';
      case 'exiting':
        return 'opacity-0';
      default:
        return 'opacity-0';
    }
  }

  private getSlideClasses(): string {
    switch (this.currentState()) {
      case 'entering':
        return 'opacity-0 -translate-x-6';
      case 'visible':
        return 'opacity-100 translate-x-0';
      case 'exiting':
        return 'opacity-0 translate-x-6';
      default:
        return 'opacity-0 -translate-x-6';
    }
  }

  private getZoomClasses(): string {
    switch (this.currentState()) {
      case 'entering':
        return 'opacity-0 scale-90';
      case 'visible':
        return 'opacity-100 scale-100';
      case 'exiting':
        return 'opacity-0 scale-95';
      default:
        return 'opacity-0 scale-90';
    }
  }

  private getCollapseClasses(): string {
    switch (this.currentState()) {
      case 'entering':
        return 'opacity-0 max-h-0 overflow-hidden';
      case 'visible':
        return 'opacity-100 max-h-96 overflow-hidden';
      case 'exiting':
        return 'opacity-0 max-h-0 overflow-hidden';
      default:
        return 'opacity-0 max-h-0 overflow-hidden';
    }
  }

  onTransitionEnd(event: TransitionEvent) {
    // Only handle transitions on the host element
    if (event.target !== event.currentTarget) return;

    if (this.currentState() === 'exiting') {
      this.currentState.set('removed');
      this.stateChange.emit(this.currentState());
    }
  }
}
