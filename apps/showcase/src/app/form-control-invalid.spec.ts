import { Component, Type, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ScCheckbox,
  ScCheckboxField,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

interface InvalidHost {
  readonly invalid: ReturnType<typeof signal<boolean>>;
  readonly touched: ReturnType<typeof signal<boolean>>;
}

@Component({
  imports: [ScCheckbox],
  template: `
    <input
      type="checkbox"
      scCheckbox
      [invalid]="invalid()"
      [touched]="touched()"
    />
  `,
})
class CheckboxHost implements InvalidHost {
  readonly invalid = signal(false);
  readonly touched = signal(false);
}

@Component({
  imports: [ScSwitch],
  template: `
    <input
      type="checkbox"
      scSwitch
      [invalid]="invalid()"
      [touched]="touched()"
    />
  `,
})
class SwitchHost implements InvalidHost {
  readonly invalid = signal(false);
  readonly touched = signal(false);
}

function mount(type: Type<InvalidHost>) {
  TestBed.configureTestingModule({});
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture;
}

function ariaInvalid(fixture: ReturnType<typeof mount>): string | null {
  const input = (fixture.nativeElement as HTMLElement).querySelector('input');
  return input!.getAttribute('aria-invalid');
}

describe('aria-invalid on form controls', () => {
  const cases: [string, Type<InvalidHost>][] = [
    ['checkbox', CheckboxHost],
    ['switch', SwitchHost],
  ];

  for (const [name, type] of cases) {
    describe(name, () => {
      it('is absent by default', () => {
        expect(ariaInvalid(mount(type))).toBeNull();
      });

      it('stays absent while invalid but untouched', () => {
        const fixture = mount(type);
        fixture.componentInstance.invalid.set(true);
        fixture.detectChanges();

        // Matches ScInput: a pristine control should not report as invalid.
        expect(ariaInvalid(fixture)).toBeNull();
      });

      it('is set once invalid and touched', () => {
        const fixture = mount(type);
        fixture.componentInstance.invalid.set(true);
        fixture.componentInstance.touched.set(true);
        fixture.detectChanges();

        expect(ariaInvalid(fixture)).toBe('true');
      });

      it('stays absent when touched but valid', () => {
        const fixture = mount(type);
        fixture.componentInstance.touched.set(true);
        fixture.detectChanges();

        expect(ariaInvalid(fixture)).toBeNull();
      });
    });
  }
});

@Component({
  imports: [ScCheckbox, ScCheckboxField],
  template: `
    <div scCheckboxField>
      <input type="checkbox" scCheckbox [disabled]="disabled()" />
    </div>
  `,
})
class CheckboxDisabledHost {
  readonly disabled = signal(false);
}

@Component({
  imports: [ScSwitch, ScSwitchField],
  template: `
    <div scSwitchField>
      <input type="checkbox" scSwitch [disabled]="disabled()" />
    </div>
  `,
})
class SwitchDisabledHost {
  readonly disabled = signal(false);
}

interface DisabledHost {
  readonly disabled: ReturnType<typeof signal<boolean>>;
}

function mountDisabled(type: Type<DisabledHost>) {
  TestBed.configureTestingModule({});
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture;
}

describe('disabled on form controls', () => {
  const cases: [string, Type<DisabledHost>][] = [
    ['checkbox', CheckboxDisabledHost],
    ['switch', SwitchDisabledHost],
  ];

  function fieldDisabled(fixture: ReturnType<typeof mountDisabled>) {
    const field = (fixture.nativeElement as HTMLElement).querySelector('div')!;
    return field.getAttribute('data-disabled');
  }

  for (const [name, type] of cases) {
    describe(name, () => {
      it('leaves the field enabled by default', () => {
        expect(fieldDisabled(mountDisabled(type))).toBeNull();
      });

      // The old implementation read nativeElement.disabled in a non-reactive
      // effect, so the field never picked the state up at all.
      it('marks the field disabled when the control is disabled', () => {
        const fixture = mountDisabled(type);
        fixture.componentInstance.disabled.set(true);
        fixture.detectChanges();

        expect(fieldDisabled(fixture)).toBe('');
      });

      it('tracks a runtime toggle back to enabled', () => {
        const fixture = mountDisabled(type);
        fixture.componentInstance.disabled.set(true);
        fixture.detectChanges();
        fixture.componentInstance.disabled.set(false);
        fixture.detectChanges();

        expect(fieldDisabled(fixture)).toBeNull();
      });

      it('still disables the native input', () => {
        const fixture = mountDisabled(type);
        fixture.componentInstance.disabled.set(true);
        fixture.detectChanges();

        const input = (fixture.nativeElement as HTMLElement).querySelector(
          'input',
        )!;
        expect(input.disabled).toBe(true);
      });
    });
  }
});
