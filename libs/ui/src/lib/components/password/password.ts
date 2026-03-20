import {
  Directive,
  InjectionToken,
  ModelSignal,
  WritableSignal,
  effect,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';

// Token for password context - interface to avoid circular dependency
export interface ScPasswordContext {
  readonly value: ModelSignal<string>;
  readonly visible: WritableSignal<boolean>;
  readonly disabled: () => boolean;
  toggle(): void;
  setValue(value: string): void;
}

export const SC_PASSWORD = new InjectionToken<ScPasswordContext>('SC_PASSWORD');

@Directive({
  selector: 'div[scPassword]',
  exportAs: 'scPassword',
  providers: [{ provide: SC_PASSWORD, useExisting: ScPassword }],
  host: {
    'data-slot': 'password',
  },
})
export class ScPassword implements ScPasswordContext {
  readonly value = model<string>('');
  readonly disabled = input<boolean>(false);
  readonly showByDefault = input<boolean>(false);

  readonly valueChange = output<string>();
  readonly visibilityChange = output<boolean>();

  readonly visible = signal(false);

  private readonly showByDefaultEffect = effect(() => {
    const showByDefault = this.showByDefault();
    untracked(() => {
      if (showByDefault) {
        this.visible.set(true);
      }
    });
  });

  toggle(): void {
    this.visible.update((v) => !v);
    this.visibilityChange.emit(this.visible());
  }

  show(): void {
    this.visible.set(true);
    this.visibilityChange.emit(true);
  }

  hide(): void {
    this.visible.set(false);
    this.visibilityChange.emit(false);
  }

  setValue(value: string): void {
    if (this.disabled()) return;
    this.value.set(value);
    this.valueChange.emit(value);
  }
}
