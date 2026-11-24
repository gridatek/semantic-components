import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SeveralPreferencesDemo } from './several-preferences-demo';

@Component({
  selector: 'app-several-preferences-demo-container',
  imports: [DemoContainer, SeveralPreferencesDemo],
  template: `
    <app-demo-container
      title="Several preferences"
      [code]="code"
      demoUrl="/demos/preferences/several-preferences-demo"
    >
      <app-several-preferences-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SeveralPreferencesDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPreferencesApply,
  definePreference,
  injectPreference,
} from '@semantic-components/ui';

const view = definePreference({
  attribute: 'data-view',
  values: ['list', 'grid'],
  defaultValue: 'list',
  storageKey: 'demo-several-view',
});

/** No storageKey: kept for the app's life, not saved. */
const size = definePreference({
  attribute: 'data-size',
  values: ['small', 'large'],
  defaultValue: 'small',
});

/** Several on one element: data-view and data-size — the second not saved. */
@Component({
  selector: 'app-several-preferences-demo',
  imports: [ScButton, ScPreferencesApply],
  template: \`
    <div class="grid w-full max-w-sm gap-4">
      <div class="flex gap-2">
        <button
          scButton
          variant="outline"
          size="sm"
          [attr.aria-pressed]="view.value() === 'grid'"
          (click)="view.set(view.value() === 'grid' ? 'list' : 'grid')"
        >
          Grid view
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          [attr.aria-pressed]="size.value() === 'large'"
          (click)="size.set(size.value() === 'large' ? 'small' : 'large')"
        >
          Large text
        </button>
      </div>
      <div [scPreferences]="definitions" data-testid="applied">
        <ul
          aria-label="Files"
          class="grid gap-2 in-data-[size=large]:text-base in-data-[view=grid]:grid-cols-2"
        >
          @for (file of files; track file) {
            <li class="rounded-md border px-3 py-2">{{ file }}</li>
          }
        </ul>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center text-sm' },
  encapsulation: ViewEncapsulation.None,
})
export class SeveralPreferencesDemo {
  private readonly definitions = [view, size];
  private readonly view = injectPreference(view);
  private readonly size = injectPreference(size);
  private readonly files = [
    'report.pdf',
    'notes.md',
    'budget.xlsx',
    'photo.png',
  ];
}`;
}
