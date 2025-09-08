import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ComboboxItem, ScCombobox } from '@semantic-components/ui';

@Component({
  selector: 'app-reactive-forms-combobox-demo',
  imports: [CommonModule, ReactiveFormsModule, ScCombobox],
  template: `
    <form class="space-y-4" [formGroup]="demoForm">
      <sc-combobox
        [items]="programmingLanguages"
        label="Select your favorite programming language"
        placeholder="Choose a language..."
        formControlName="language"
      />

      <sc-combobox
        [items]="frameworks"
        [multiple]="true"
        label="Select frameworks"
        placeholder="Choose frameworks..."
        formControlName="frameworks"
      />

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
  programmingLanguages: ComboboxItem[] = [
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

  frameworks: ComboboxItem[] = [
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
