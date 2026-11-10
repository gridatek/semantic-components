import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, disabled, form, required } from '@angular/forms/signals';
import { ScRadio, ScRadioGroup } from '@semantic-components/ui';

type Pick = '' | 'a' | 'b';

/** The group holds the choice: one [formField], a union value. */
@Component({
  imports: [ScRadioGroup, ScRadio, FormField],
  template: `
    <div scRadioGroup [formField]="f.pick">
      <input scRadio value="a" />
      <input scRadio value="b" />
    </div>
  `,
})
class RadioGroupFormHost {
  readonly off = signal(false);
  readonly model = signal<{ pick: Pick }>({ pick: '' });
  readonly f = form(this.model, (p) => {
    disabled(p.pick, { when: () => this.off() });
    required(p.pick);
  });
}

/** The Angular way: a [formField] on each radio, which then writes type="radio". */
@Component({
  imports: [ScRadioGroup, ScRadio, FormField],
  template: `
    <div scRadioGroup>
      <input type="radio" scRadio value="a" [formField]="f.pick" />
      <input type="radio" scRadio value="b" [formField]="f.pick" />
    </div>
  `,
})
class RadioEachFormHost {
  readonly model = signal<{ pick: Pick }>({ pick: '' });
  readonly f = form(this.model);
}

function mount<T>(type: new () => T) {
  TestBed.configureTestingModule({});
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture;
}

function radios(fixture: { nativeElement: unknown }) {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll('input'),
  );
}

describe('radio group and Signal Forms', () => {
  it('writes the picked radio into the model', () => {
    const fixture = mount(RadioGroupFormHost);
    radios(fixture)[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.model().pick).toBe('b');
  });

  it('checks the radio matching the model', () => {
    const fixture = mount(RadioGroupFormHost);
    fixture.componentInstance.model.set({ pick: 'a' });
    fixture.detectChanges();

    expect(radios(fixture).map((r) => r.checked)).toEqual([true, false]);
  });

  it('names its radios alike: one group for the browser', () => {
    const fixture = mount(RadioGroupFormHost);
    const [first, second] = radios(fixture);

    expect(first.name).not.toBe('');
    expect(second.name).toBe(first.name);
    expect(first.type).toBe('radio');
  });

  it('disables every radio when the field is disabled', () => {
    const fixture = mount(RadioGroupFormHost);
    fixture.componentInstance.off.set(true);
    fixture.detectChanges();

    expect(radios(fixture).map((r) => r.disabled)).toEqual([true, true]);
  });

  it('marks its radios invalid once the field is touched', () => {
    const fixture = mount(RadioGroupFormHost);
    fixture.componentInstance.f.pick().markAsTouched();
    fixture.detectChanges();

    expect(radios(fixture).map((r) => r.getAttribute('aria-invalid'))).toEqual([
      'true',
      'true',
    ]);
  });
});

describe('a [formField] on each radio (the Angular way)', () => {
  it('writes the picked radio into the model', () => {
    const fixture = mount(RadioEachFormHost);
    radios(fixture)[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.model().pick).toBe('b');
  });

  it('checks the radio matching the model', () => {
    const fixture = mount(RadioEachFormHost);
    fixture.componentInstance.model.set({ pick: 'a' });
    fixture.detectChanges();

    expect(radios(fixture)[0].checked).toBe(true);
  });
});
