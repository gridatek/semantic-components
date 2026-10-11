import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScField, ScInput, ScLabel } from '@semantic-components/ui';

@Component({
  imports: [ScField, ScInput, ScLabel],
  template: `
    <div scField>
      <label scLabel>Email</label>
      <input scInput />
    </div>
  `,
})
class FieldHost {}

describe('ScField label', () => {
  it('labels the control, and only the control carries the id', () => {
    TestBed.configureTestingModule({});
    const fixture = TestBed.createComponent(FieldHost);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    const label = root.querySelector('label') as HTMLLabelElement;
    const input = root.querySelector('input') as HTMLInputElement;
    const id = label.htmlFor;

    expect(id).not.toBe('');
    expect(root.querySelectorAll(`[id="${id}"]`).length).toBe(1);
    expect(input.id).toBe(id);
    expect(root.querySelector('[scField]')?.hasAttribute('id')).toBe(false);
  });
});
