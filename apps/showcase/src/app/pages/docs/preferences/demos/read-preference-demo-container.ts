import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadPreferenceDemo } from './read-preference-demo';

@Component({
  selector: 'app-read-preference-demo-container',
  imports: [DemoContainer, ReadPreferenceDemo],
  template: `
    <app-demo-container
      title="Read the value"
      [code]="code"
      demoUrl="/demos/preferences/read-preference-demo"
    >
      <app-read-preference-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadPreferenceDemoContainer {
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
  storageKey: 'demo-read-view',
});

/** A switch elsewhere: it reads and sets the same preference. */
@Component({
  selector: 'app-view-switch',
  imports: [ScButton],
  template: \`
    <button
      scButton
      variant="outline"
      size="sm"
      [attr.aria-pressed]="view.value() === 'grid'"
      (click)="view.set(view.value() === 'grid' ? 'list' : 'grid')"
    >
      Grid view
    </button>
  \`,
})
class ViewSwitch {
  private readonly view = injectPreference(view);
}

/** injectPreference anywhere: the same value — here a switch apart from the list. */
@Component({
  selector: 'app-read-preference-demo',
  imports: [ScPreferencesApply, ViewSwitch],
  template: \`
    <div class="grid w-full max-w-sm gap-4">
      <app-view-switch />
      <div [scPreferences]="[definition]">
        <ul
          aria-label="Files"
          class="grid gap-2 in-data-[view=grid]:grid-cols-2"
        >
          @for (file of files; track file) {
            <li class="rounded-md border px-3 py-2 text-sm">{{ file }}</li>
          }
        </ul>
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ view.value() }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadPreferenceDemo {
  private readonly definition = view;
  private readonly view = injectPreference(view);
  private readonly files = [
    'report.pdf',
    'notes.md',
    'budget.xlsx',
    'photo.png',
  ];
}`;
}
