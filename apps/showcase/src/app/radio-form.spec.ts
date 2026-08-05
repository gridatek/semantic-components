import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, disabled, form, required } from '@angular/forms/signals';
import { ScRadio, ScRadioGroup } from '@semantic-components/ui';

@Component({
  imports: [ScRadioGroup, ScRadio, FormField],
  template: `
    <div scRadioGroup>
      <input type="radio" scRadio value="a" [formField]="f.pick" />
      <input type="radio" scRadio value="b" [formField]="f.pick" />
    </div>
  `,
})
class RadioFormHost {
  readonly off = signal(false);
  readonly model = signal({ pick: '' });
  readonly f = form(this.model, (p) => {
    disabled(p.pick, { when: () => this.off() });
  });
}

function mount() {
  TestBed.configureTestingModule({});
  const fixture = TestBed.createComponent(RadioFormHost);
  fixture.detectChanges();
  return fixture;
}

function radios(fixture: ReturnType<typeof mount>) {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll('input'),
  );
}

describe('radio and Signal Forms', () => {
  it('writes the selected value into the model', () => {
    const fixture = mount();
    const [, second] = radios(fixture);

    second.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.model().pick).toBe('b');
  });

  it('reflects a model value onto the matching radio', () => {
    const fixture = mount();
    fixture.componentInstance.model.set({ pick: 'a' });
    fixture.detectChanges();

    expect(radios(fixture)[0].checked).toBe(true);
  });

  it('disables every radio when the field is disabled', () => {
    const fixture = mount();
    fixture.componentInstance.off.set(true);
    fixture.detectChanges();

    expect(radios(fixture).map((r) => r.disabled)).toEqual([true, true]);
  });
});

@Component({
  imports: [ScRadioGroup, ScRadio, FormField],
  template: `
    <div scRadioGroup>
      <input type="radio" scRadio value="a" [formField]="f.pick" />
    </div>
  `,
})
class RadioInvalidHost {
  readonly model = signal({ pick: '' });
  readonly f = form(this.model, (p) => {
    required(p.pick);
  });
}

describe('radio invalid state', () => {
  it('reports aria-invalid once the field is touched', () => {
    TestBed.configureTestingModule({});
    const fixture = TestBed.createComponent(RadioInvalidHost);
    fixture.detectChanges();

    fixture.componentInstance.f.pick().markAsTouched();
    fixture.detectChanges();

    const radio = (fixture.nativeElement as HTMLElement).querySelector('input');
    expect(radio?.getAttribute('aria-invalid')).toBe('true');
  });
});
