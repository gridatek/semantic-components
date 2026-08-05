import { Component, Type, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScCheckbox, ScSwitch } from '@semantic-components/ui';

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
