import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComboboxItem, ScCombobox } from '@semantic-components/ui';

@Component({
  selector: 'app-combobox-demo',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ScCombobox],
  template: `
    <div class="bg-gray-50 min-h-screen p-8">
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Angular CDK-Inspired Combobox</h1>
          <p class="text-gray-600">A custom combobox implementation for Angular 17+</p>
        </div>

        <!-- Example 1: Basic Combobox -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Basic Combobox</h2>
          <sc-combobox
            [(ngModel)]="selectedFruit"
            [items]="fruits"
            (selectionChange)="onFruitChange($event)"
            label="Choose a fruit"
            placeholder="Type to search..."
          />
          <p class="mt-4 text-sm text-gray-600">
            Selected value in parent:
            <code class="bg-gray-100 px-2 py-1 rounded">{{ selectedFruit || 'None' }}</code>
          </p>
        </div>

        <!-- Example 2: Multi-select Combobox -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Multi-select Combobox</h2>
          <sc-combobox
            [(ngModel)]="selectedTechnologies"
            [items]="technologies"
            [multiple]="true"
            (selectionChange)="onTechnologiesChange($event)"
            label="Select technologies"
            placeholder="Add technologies..."
          />
          <p class="mt-4 text-sm text-gray-600">
            Selected values:
            <code class="bg-gray-100 px-2 py-1 rounded">{{ selectedTechnologies | json }}</code>
          </p>
        </div>

        <!-- Example 3: Async Combobox with Loading -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Async Combobox with Loading</h2>
          <sc-combobox
            [(ngModel)]="selectedUser"
            [async]="true"
            [asyncSearchFn]="searchUsers"
            (selectionChange)="onUserChange($event)"
            label="Search users"
            placeholder="Start typing to search..."
          />
          <p class="mt-4 text-sm text-gray-600">
            Selected user:
            <code class="bg-gray-100 px-2 py-1 rounded">{{ selectedUser || 'None' }}</code>
          </p>
        </div>

        <!-- Example 4: Grouped Combobox -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Grouped Combobox</h2>
          <sc-combobox
            [(ngModel)]="selectedCountry"
            [items]="countries"
            [grouped]="true"
            (selectionChange)="onCountryChange($event)"
            label="Select a country"
            placeholder="Search countries..."
          />
          <p class="mt-4 text-sm text-gray-600">
            Selected country:
            <code class="bg-gray-100 px-2 py-1 rounded">{{ selectedCountry || 'None' }}</code>
          </p>
        </div>

        <!-- Example 5: Reactive Forms Integration -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Reactive Forms Integration</h2>
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
        </div>

        <!-- Example 6: Custom Configuration -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Custom Configuration</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <sc-combobox
                [(ngModel)]="customConfig1"
                [items]="fruits"
                [showToggleButton]="false"
                label="Without toggle button"
                placeholder="Type to search..."
              />
            </div>
            <div>
              <sc-combobox
                [(ngModel)]="customConfig2"
                [items]="fruits"
                [showStatus]="false"
                label="Without status display"
                placeholder="Type to search..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxDemo {
  // Basic combobox
  fruits: string[] = [
    'Apple',
    'Banana',
    'Cherry',
    'Dragon Fruit',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Kiwi',
    'Lemon',
    'Mango',
    'Nectarine',
    'Orange',
    'Papaya',
    'Quince',
    'Raspberry',
  ];
  selectedFruit: string = '';

  // Multi-select combobox
  technologies: ComboboxItem[] = [
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

  // Async combobox
  selectedUser: string = '';

  // Grouped combobox
  countries: ComboboxItem[] = [
    { label: 'United States', value: 'us', group: 'North America' },
    { label: 'Canada', value: 'ca', group: 'North America' },
    { label: 'Mexico', value: 'mx', group: 'North America' },
    { label: 'United Kingdom', value: 'uk', group: 'Europe' },
    { label: 'Germany', value: 'de', group: 'Europe' },
    { label: 'France', value: 'fr', group: 'Europe' },
    { label: 'Italy', value: 'it', group: 'Europe' },
    { label: 'Spain', value: 'es', group: 'Europe' },
    { label: 'Japan', value: 'jp', group: 'Asia' },
    { label: 'China', value: 'cn', group: 'Asia' },
    { label: 'India', value: 'in', group: 'Asia' },
    { label: 'South Korea', value: 'kr', group: 'Asia' },
    { label: 'Australia', value: 'au', group: 'Oceania' },
    { label: 'New Zealand', value: 'nz', group: 'Oceania' },
    { label: 'Brazil', value: 'br', group: 'South America' },
    { label: 'Argentina', value: 'ar', group: 'South America' },
  ];
  selectedCountry: string = '';

  // Reactive forms
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

  // Custom config examples
  customConfig1: string = '';
  customConfig2: string = '';

  // Async search function
  searchUsers = async (query: string): Promise<ComboboxItem[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const allUsers = [
      { label: 'John Doe', value: 'john_doe', subtitle: '@johndoe' },
      { label: 'Jane Smith', value: 'jane_smith', subtitle: '@janesmith' },
      { label: 'Bob Johnson', value: 'bob_johnson', subtitle: '@bobjohnson' },
      { label: 'Alice Williams', value: 'alice_williams', subtitle: '@alicew' },
      { label: 'Charlie Brown', value: 'charlie_brown', subtitle: '@charlieb' },
      { label: 'Diana Prince', value: 'diana_prince', subtitle: '@dianaprince' },
      { label: 'Eve Adams', value: 'eve_adams', subtitle: '@eveadams' },
      { label: 'Frank Miller', value: 'frank_miller', subtitle: '@frankmiller' },
      { label: 'Grace Lee', value: 'grace_lee', subtitle: '@gracelee' },
      { label: 'Henry Wilson', value: 'henry_wilson', subtitle: '@henryw' },
      { label: 'Iris Chen', value: 'iris_chen', subtitle: '@irischen' },
      { label: 'Jack Thompson', value: 'jack_thompson', subtitle: '@jackthompson' },
    ];

    return allUsers.filter(
      (user) =>
        user.label.toLowerCase().includes(query.toLowerCase()) ||
        user.subtitle.toLowerCase().includes(query.toLowerCase()),
    );
  };

  // Event handlers
  onFruitChange(value: string) {
    console.log('Fruit selected:', value);
  }

  onTechnologiesChange(values: string[]) {
    console.log('Technologies selected:', values);
  }

  onUserChange(value: string) {
    console.log('User selected:', value);
  }

  onCountryChange(value: string) {
    console.log('Country selected:', value);
  }
}
