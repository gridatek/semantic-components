import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScCheckbox, ScCheckboxField } from '@semantic-components/ui';

@Component({
  imports: [ScCheckbox],
  template: `<input type="checkbox" scCheckbox aria-label="Alone" />`,
})
class BareCheckbox {}

@Component({
  imports: [ScCheckbox, ScCheckboxField],
  template: `
    <label scCheckboxField>
      <input type="checkbox" scCheckbox />
      In its field
    </label>
  `,
})
class FieldCheckbox {}

describe('scCheckbox needs its field (dev mode)', () => {
  it('throws without a scCheckboxField: nothing would draw its box', () => {
    expect(() => TestBed.createComponent(BareCheckbox)).toThrowError(
      /scCheckbox: put it inside a scCheckboxField/,
    );
  });

  it('draws its box in a field', () => {
    const fixture = TestBed.createComponent(FieldCheckbox);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[data-slot=checkbox-visual]')).not.toBeNull();
  });
});
