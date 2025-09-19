import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { MultiSelectDemo } from './multi-select-demo';

@Component({
  selector: 'app-multi-select-demo-section',
  imports: [PreviewCodeTabs, MultiSelectDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-multi-select-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScMultiSelect } from '@semantic-components/ui';

@Component({
  selector: 'app-multi-select-demo',
  imports: [ScMultiSelect],
  template: \`
    <div class="space-y-6">
      <!-- Basic Multi-Select -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Basic Multi-Select</label>
        <sc-multi-select
          [items]="basicItems"
          placeholder="Select multiple options..."
          (selectionChange)="onSelectionChange($event)"
        />
      </div>

      <!-- Multi-Select with Object Items -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Multi-Select with Descriptions</label>
        <sc-multi-select
          [items]="objectItems"
          placeholder="Choose technologies..."
          (selectionChange)="onTechSelectionChange($event)"
        />
      </div>

      <!-- Grouped Multi-Select -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Grouped Multi-Select</label>
        <sc-multi-select
          [items]="groupedItems"
          [grouped]="true"
          placeholder="Select from categories..."
          (selectionChange)="onGroupedSelectionChange($event)"
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
  \`,
  styles: \`\`,
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
      value: 'angular',
      label: 'Angular',
      subtitle: 'Web framework for building mobile and desktop apps',
    },
    {
      value: 'react',
      label: 'React',
      subtitle: 'JavaScript library for building user interfaces',
    },
    {
      value: 'vue',
      label: 'Vue.js',
      subtitle: 'Progressive framework for building user interfaces',
    },
    {
      value: 'svelte',
      label: 'Svelte',
      subtitle: 'Cybernetically enhanced web apps',
    },
    {
      value: 'typescript',
      label: 'TypeScript',
      subtitle: 'JavaScript with syntax for types',
    },
    {
      value: 'javascript',
      label: 'JavaScript',
      subtitle: 'High-level programming language',
    },
  ];

  protected readonly groupedItems = [
    { value: 'frontend', label: 'Frontend', group: 'Development' },
    { value: 'backend', label: 'Backend', group: 'Development' },
    { value: 'fullstack', label: 'Full Stack', group: 'Development' },
    { value: 'mobile', label: 'Mobile', group: 'Development' },
    { value: 'design', label: 'UI/UX Design', group: 'Design' },
    { value: 'graphics', label: 'Graphic Design', group: 'Design' },
    { value: 'branding', label: 'Branding', group: 'Design' },
    { value: 'marketing', label: 'Digital Marketing', group: 'Marketing' },
    { value: 'seo', label: 'SEO', group: 'Marketing' },
    { value: 'content', label: 'Content Strategy', group: 'Marketing' },
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
}`;
}
