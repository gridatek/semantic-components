import { Component, Type, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, disabled, form, required } from '@angular/forms/signals';
import {
  ScInput,
  ScPasswordInput,
  ScPasswordProvider,
  ScPasswordToggle,
  ScTextarea,
} from '@semantic-components/ui';

/**
 * These were written against the previous pull implementation
 * (inject(FormField) + computed) and passed, then kept unchanged across the
 * switch to the push contract. Identical assertions passing on both sides is
 * what shows the refactor preserved behaviour rather than merely compiling.
 */

interface FormHost {
  readonly f: { name: () => { markAsTouched(): void } };
}

@Component({
  imports: [ScInput, FormField],
  template: `
    <input scInput [formField]="f.name" />
  `,
})
class InputFormHost {
  readonly model = signal({ name: '' });
  readonly f = form(this.model, (p) => {
    required(p.name);
  });
}

@Component({
  imports: [ScTextarea, FormField],
  template: `
    <textarea scTextarea [formField]="f.name"></textarea>
  `,
})
class TextareaFormHost {
  readonly model = signal({ name: '' });
  readonly f = form(this.model, (p) => {
    required(p.name);
  });
}

@Component({
  imports: [ScInput, FormField],
  template: `
    <input scInput [formField]="f.name" />
  `,
})
class InputDisabledFormHost {
  readonly model = signal({ name: '' });
  readonly f = form(this.model, (p) => {
    disabled(p.name);
  });
}

@Component({
  imports: [ScTextarea, FormField],
  template: `
    <textarea scTextarea [formField]="f.name"></textarea>
  `,
})
class TextareaDisabledFormHost {
  readonly model = signal({ name: '' });
  readonly f = form(this.model, (p) => {
    disabled(p.name);
  });
}

@Component({
  imports: [ScInput],
  template: `
    <input scInput [disabled]="off()" />
  `,
})
class InputStandaloneHost {
  readonly off = signal(false);
}

@Component({
  imports: [ScTextarea],
  template: `
    <textarea scTextarea [disabled]="off()"></textarea>
  `,
})
class TextareaStandaloneHost {
  readonly off = signal(false);
}

function mount<T>(type: Type<T>) {
  TestBed.configureTestingModule({});
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture;
}

function control(fixture: { nativeElement: unknown }): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    'input, textarea',
  )!;
}

describe('text controls and form state', () => {
  const cases: [string, Type<FormHost>, Type<unknown>, Type<unknown>][] = [
    ['input', InputFormHost, InputDisabledFormHost, InputStandaloneHost],
    [
      'textarea',
      TextareaFormHost,
      TextareaDisabledFormHost,
      TextareaStandaloneHost,
    ],
  ];

  for (const [name, invalidHost, disabledHost, standaloneHost] of cases) {
    describe(name, () => {
      it('does not report invalid before the field is touched', () => {
        expect(control(mount(invalidHost)).getAttribute('aria-invalid')).toBe(
          null,
        );
      });

      it('reports invalid once the field is touched', () => {
        const fixture = mount(invalidHost);
        fixture.componentInstance.f.name().markAsTouched();
        fixture.detectChanges();

        expect(control(fixture).getAttribute('aria-invalid')).toBe('true');
      });

      it('is disabled when the field is disabled', () => {
        expect(control(mount(disabledHost)).hasAttribute('disabled')).toBe(
          true,
        );
      });

      it('honours a standalone disabled input with no form', () => {
        const fixture = mount(standaloneHost) as unknown as {
          componentInstance: { off: ReturnType<typeof signal<boolean>> };
          detectChanges(): void;
          nativeElement: unknown;
        };
        expect(control(fixture).hasAttribute('disabled')).toBe(false);

        fixture.componentInstance.off.set(true);
        fixture.detectChanges();

        expect(control(fixture).hasAttribute('disabled')).toBe(true);
      });
    });
  }
});

@Component({
  imports: [ScPasswordProvider, ScPasswordInput, FormField],
  template: `
    <div scPasswordProvider>
      <input scPasswordInput [formField]="f.name" />
    </div>
  `,
})
class PasswordFormHost {
  readonly model = signal({ name: '' });
  readonly f = form(this.model, (p) => {
    required(p.name);
  });
}

@Component({
  imports: [ScPasswordProvider, ScPasswordInput, FormField],
  template: `
    <div scPasswordProvider>
      <input scPasswordInput [formField]="f.name" />
    </div>
  `,
})
class PasswordDisabledFormHost {
  readonly model = signal({ name: '' });
  readonly f = form(this.model, (p) => {
    disabled(p.name);
  });
}

describe('password input and form state', () => {
  it('does not report invalid before the field is touched', () => {
    expect(control(mount(PasswordFormHost)).getAttribute('aria-invalid')).toBe(
      null,
    );
  });

  it('reports invalid once the field is touched', () => {
    const fixture = mount(PasswordFormHost);
    fixture.componentInstance.f.name().markAsTouched();
    fixture.detectChanges();

    expect(control(fixture).getAttribute('aria-invalid')).toBe('true');
  });

  it('is disabled when the field is disabled', () => {
    expect(
      control(mount(PasswordDisabledFormHost)).hasAttribute('disabled'),
    ).toBe(true);
  });
});

@Component({
  imports: [ScPasswordProvider, ScPasswordInput, ScPasswordToggle, FormField],
  template: `
    <div scPasswordProvider>
      <input scPasswordInput [formField]="f.name" />
      <button scPasswordToggle type="button">show</button>
    </div>
  `,
})
class PasswordToggleHost {
  readonly off = signal(false);
  readonly model = signal({ name: '' });
  readonly f = form(this.model, (p) => {
    disabled(p.name, { when: () => this.off() });
  });
}

describe('password toggle disabled', () => {
  function toggle(fixture: { nativeElement: unknown }): HTMLButtonElement {
    const button = (fixture.nativeElement as HTMLElement).querySelector(
      'button',
    );
    if (!button) throw new Error('no toggle button rendered');
    return button;
  }

  it('is enabled while the field is enabled', () => {
    expect(toggle(mount(PasswordToggleHost)).disabled).toBe(false);
  });

  it('follows the field into the disabled state', () => {
    const fixture = mount(PasswordToggleHost);
    fixture.componentInstance.off.set(true);
    fixture.detectChanges();

    // The toggle is a sibling of the input, so it cannot see the field
    // directly; ScPasswordProvider queries it and passes the state along.
    expect(toggle(fixture).disabled).toBe(true);
  });
});
