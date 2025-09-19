import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ScCombobox, ScComboboxItem, ScField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-reactive-forms-combobox-demo',
  imports: [CommonModule, ReactiveFormsModule, ScCombobox, ScField, ScLabel],
  template: `
    <form class="space-y-4" [formGroup]="demoForm">
      <div sc-field>
        <label sc-label>Select your favorite programming language</label>
        <sc-combobox
          [items]="programmingLanguages"
          placeholder="Choose a language..."
          formControlName="language"
        />
      </div>

      <div sc-field>
        <label sc-label>Select frameworks</label>
        <sc-combobox
          [items]="frameworks"
          placeholder="Choose frameworks..."
          formControlName="frameworks"
        />
      </div>

      <div class="mt-4 p-4 bg-gray-50 rounded">
        <h3 class="font-semibold text-gray-700 mb-2">Form Values:</h3>
        <pre class="text-sm">{{ demoForm.value | json }}</pre>
      </div>
    </form>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormsComboboxDemo {
  programmingLanguages: ScComboboxItem[] = [
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C#', value: 'csharp' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'Swift', value: 'swift' },
    { label: 'Kotlin', value: 'kotlin' },
    { label: 'Ruby', value: 'ruby' },
  ];

  frameworks: ScComboboxItem[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Django', value: 'django' },
    { label: 'Flask', value: 'flask' },
    { label: 'Spring Boot', value: 'spring' },
    { label: '.NET Core', value: 'dotnet' },
    { label: 'Express.js', value: 'express' },
    { label: 'FastAPI', value: 'fastapi' },
    { label: 'Rails', value: 'rails' },
  ];

  demoForm = new FormGroup({
    language: new FormControl(''),
    frameworks: new FormControl([]),
  });
}
