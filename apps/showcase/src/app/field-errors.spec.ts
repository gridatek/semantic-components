import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, form, minLength } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScInput,
  ScInputGroup,
} from '@semantic-components/ui';

@Component({
  imports: [ScField, ScFieldErrors, ScInput, FormField],
  template: `
    <div scField>
      <input scInput [formField]="f.name" />
      <div scFieldErrors></div>
    </div>
  `,
})
class FlatHost {
  readonly model = signal({ name: 'ab' });
  readonly f = form(this.model, (p) => {
    minLength(p.name, 3, { message: 'Too short' });
  });
}

/** The control sits inside an input group, so it is not a direct child. */
@Component({
  imports: [ScField, ScFieldErrors, ScInput, ScInputGroup, FormField],
  template: `
    <div scField>
      <div scInputGroup>
        <input scInput [formField]="f.name" />
      </div>
      <div scFieldErrors></div>
    </div>
  `,
})
class NestedHost {
  readonly model = signal({ name: 'ab' });
  readonly f = form(this.model, (p) => {
    minLength(p.name, 3, { message: 'Too short' });
  });
}

function mount(type: typeof FlatHost | typeof NestedHost) {
  TestBed.configureTestingModule({});
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture;
}

function errorsEl(fixture: { nativeElement: unknown }) {
  const el = (fixture.nativeElement as HTMLElement).querySelector(
    '[scFieldErrors]',
  );
  if (!el) throw new Error('no errors element rendered');
  return el;
}

describe('field errors', () => {
  for (const [name, type] of [
    ['direct child', FlatHost],
    ['nested in an input group', NestedHost],
  ] as const) {
    describe(name, () => {
      it('stays hidden before the field is touched', () => {
        expect(errorsEl(mount(type)).hasAttribute('hidden')).toBe(true);
      });

      it('shows the message once touched and invalid', () => {
        const fixture = mount(type);
        fixture.componentInstance.f.name().markAsTouched();
        fixture.detectChanges();

        const el = errorsEl(fixture);
        expect(el.hasAttribute('hidden')).toBe(false);
        expect(el.textContent?.trim()).toBe('Too short');
      });
    });
  }
});
