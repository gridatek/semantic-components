import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScCombobox, ScComboboxItem, ScField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-multi-select-combobox-demo',
  imports: [CommonModule, FormsModule, ScCombobox, ScField, ScLabel],
  template: `
    <div sc-field>
      <label sc-label>Select technologies</label>
      <sc-combobox
        [(ngModel)]="selectedTechnologies"
        [items]="technologies"
        [multiple]="true"
        (selectionChange)="onTechnologiesChange($event)"
        placeholder="Add technologies..."
      />
    </div>
    <p class="mt-4 text-sm text-gray-600">
      Selected values:
      <code class="bg-gray-100 px-2 py-1 rounded">{{ selectedTechnologies | json }}</code>
    </p>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComboboxDemo {
  technologies: ScComboboxItem[] = [
    { label: 'React', value: 'react' },
    { label: 'Angular', value: 'angular' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Next.js', value: 'nextjs' },
    { label: 'Nuxt.js', value: 'nuxtjs' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Tailwind CSS', value: 'tailwind' },
    { label: 'Material UI', value: 'material' },
    { label: 'Bootstrap', value: 'bootstrap' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Express', value: 'express' },
    { label: 'NestJS', value: 'nestjs' },
  ];
  selectedTechnologies: string[] = [];

  onTechnologiesChange(values: string[]) {
    console.log('Technologies selected:', values);
  }
}
