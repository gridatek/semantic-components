import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormField, disabled, form } from '@angular/forms/signals';
import { ScCheckbox, ScCheckboxGroup } from '@semantic-components/ui';

type Protocol = 'http' | 'https' | 'ssh';

/** The group holds the ticked values: one [formField], a union array. */
@Component({
  imports: [ScCheckboxGroup, ScCheckbox, FormField],
  template: `
    <div scCheckboxGroup [formField]="f.protocols" [allValues]="all">
      <input scCheckbox parent aria-label="All" />
      <input scCheckbox value="http" aria-label="HTTP" />
      <input scCheckbox value="https" aria-label="HTTPS" />
      <input scCheckbox value="ssh" aria-label="SSH" />
    </div>
  `,
})
class CheckboxGroupHost {
  readonly all: Protocol[] = ['http', 'https', 'ssh'];
  readonly off = signal(false);
  readonly model = signal<{ protocols: Protocol[] }>({ protocols: ['https'] });
  readonly f = form(this.model, (p) => {
    disabled(p.protocols, { when: () => this.off() });
  });
}

function mount() {
  TestBed.configureTestingModule({});
  const fixture = TestBed.createComponent(CheckboxGroupHost);
  fixture.detectChanges();
  return fixture;
}

function boxes(fixture: ReturnType<typeof mount>) {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll('input'),
  );
}

describe('checkbox group and Signal Forms', () => {
  it('ticks the checkboxes in the model', () => {
    const fixture = mount();
    expect(boxes(fixture).map((b) => b.checked)).toEqual([
      false,
      false,
      true,
      false,
    ]);
  });

  it('adds and removes a ticked value', () => {
    const fixture = mount();
    const [, http, https] = boxes(fixture);
    http.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model().protocols).toEqual([
      'https',
      'http',
    ]);

    https.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model().protocols).toEqual(['http']);
  });

  it('the parent is mixed over some, ticks all, then none', () => {
    const fixture = mount();
    const [parent] = boxes(fixture);
    expect(parent.indeterminate).toBe(true);

    parent.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model().protocols).toEqual([
      'http',
      'https',
      'ssh',
    ]);
    expect(parent.checked).toBe(true);
    expect(parent.indeterminate).toBe(false);

    parent.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.model().protocols).toEqual([]);
    expect(parent.checked).toBe(false);
  });

  it('disables every checkbox when the field is disabled', () => {
    const fixture = mount();
    fixture.componentInstance.off.set(true);
    fixture.detectChanges();
    expect(boxes(fixture).every((b) => b.disabled)).toBe(true);
  });
});
