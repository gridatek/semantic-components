import { _IdGenerator } from '@angular/cdk/a11y';
import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  InjectionToken,
  input,
  model,
  ModelSignal,
  output,
  signal,
  untracked,
  WritableSignal,
} from '@angular/core';
import { SC_FIELD } from '../field';

// Token for password field context - interface to avoid circular dependency
export interface ScPasswordFieldContext {
  readonly value: ModelSignal<string>;
  readonly visible: WritableSignal<boolean>;
  readonly disabled: () => boolean;
  readonly invalid: () => boolean;
  toggle(): void;
  setValue(value: string): void;
}

export const SC_PASSWORD_FIELD = new InjectionToken<ScPasswordFieldContext>(
  'SC_PASSWORD_FIELD',
);

@Directive({
  selector: 'div[sc-password-field], label[sc-password-field]',
  exportAs: 'scPasswordField',
  providers: [
    { provide: SC_PASSWORD_FIELD, useExisting: ScPasswordField },
    { provide: SC_FIELD, useExisting: ScPasswordField },
  ],
  host: {
    '[attr.role]': 'role()',
    'data-slot': 'password-field',
    '[attr.data-invalid]': 'invalid()',
    '[attr.data-disabled]': 'disabled() || null',
  },
})
export class ScPasswordField implements ScPasswordFieldContext {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly id = input(inject(_IdGenerator).getId('sc-password-field-'));

  protected readonly role = computed(() => {
    const tagName = this.elementRef.nativeElement.tagName;
    return tagName === 'LABEL' ? null : 'group';
  });
  readonly invalid = input<boolean>(false);
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
