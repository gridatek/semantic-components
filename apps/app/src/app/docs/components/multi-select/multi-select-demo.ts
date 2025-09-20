import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScMultiSelect } from '@semantic-components/ui';

@Component({
  selector: 'app-multi-select-demo',
  imports: [ScMultiSelect],
  template: `
    <div class="space-y-6">
      <!-- Basic Multi-Select -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Basic Multi-Select</label>
        <sc-multi-select
          [items]="basicItems"
          (selectionChange)="onSelectionChange($event)"
          placeholder="Select multiple options..."
        />
      </div>

      <!-- Multi-Select with Object Items -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Multi-Select with Descriptions</label>
        <sc-multi-select
          [items]="objectItems"
          (selectionChange)="onTechSelectionChange($event)"
          placeholder="Choose technologies..."
        />
      </div>

      <!-- Grouped Multi-Select -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Grouped Multi-Select</label>
        <sc-multi-select
          [items]="groupedItems"
          [grouped]="true"
          (selectionChange)="onGroupedSelectionChange($event)"
          placeholder="Select from categories..."
        />
      </div>

      <!-- Multi-Select without Status -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Without Status Display</label>
        <sc-multi-select
          [items]="basicItems"
          [showStatus]="false"
          placeholder="Clean interface..."
        />
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectDemo {
  protected readonly basicItems = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
  ];

  protected readonly objectItems = [
    {
      id: 'angular',
      label: 'Angular',
      subtitle: 'Web framework for building mobile and desktop apps',
    },
    {
      id: 'react',
      label: 'React',
      subtitle: 'JavaScript library for building user interfaces',
    },
    {
      id: 'vue',
      label: 'Vue.js',
      subtitle: 'Progressive framework for building user interfaces',
    },
    {
      id: 'svelte',
      label: 'Svelte',
      subtitle: 'Cybernetically enhanced web apps',
    },
    {
      id: 'typescript',
      label: 'TypeScript',
      subtitle: 'JavaScript with syntax for types',
    },
    {
      id: 'javascript',
      label: 'JavaScript',
      subtitle: 'High-level programming language',
    },
  ];

  protected readonly groupedItems = [
    { id: 'frontend', label: 'Frontend', group: 'Development' },
    { id: 'backend', label: 'Backend', group: 'Development' },
    { id: 'fullstack', label: 'Full Stack', group: 'Development' },
    { id: 'mobile', label: 'Mobile', group: 'Development' },
    { id: 'design', label: 'UI/UX Design', group: 'Design' },
    { id: 'graphics', label: 'Graphic Design', group: 'Design' },
    { id: 'branding', label: 'Branding', group: 'Design' },
    { id: 'marketing', label: 'Digital Marketing', group: 'Marketing' },
    { id: 'seo', label: 'SEO', group: 'Marketing' },
    { id: 'content', label: 'Content Strategy', group: 'Marketing' },
  ];

  onSelectionChange(selected: string[]) {
    console.log('Basic selection changed:', selected);
  }

  onTechSelectionChange(selected: string[]) {
    console.log('Technology selection changed:', selected);
  }

  onGroupedSelectionChange(selected: string[]) {
    console.log('Grouped selection changed:', selected);
  }
}
