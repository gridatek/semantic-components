import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicQueryParamStateDemo } from './basic-query-param-state-demo';

@Component({
  selector: 'app-basic-query-param-state-demo-container',
  imports: [DemoContainer, BasicQueryParamStateDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/query-param-state/basic-query-param-state-demo"
      [code]="code"
    >
      <app-basic-query-param-state-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicQueryParamStateDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  injectQueryParam,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-query-param-state-demo',
  imports: [FormsModule],
  template: \`
    <div class="w-full max-w-md space-y-4">
      <div class="space-y-2">
        <label class="text-sm font-medium" for="search">Search</label>
        <input
          id="search"
          type="text"
          class="bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          placeholder="Type to search..."
          [ngModel]="search.value()"
          (ngModelChange)="search.set($event)"
        />
      </div>

      <div class="flex gap-4">
        <div class="flex-1 space-y-2">
          <label class="text-sm font-medium" for="page">Page</label>
          <input
            id="page"
            type="number"
            min="1"
            class="bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            [ngModel]="page.value()"
            (ngModelChange)="page.set($event)"
          />
        </div>

        <div class="flex-1 space-y-2">
          <label class="text-sm font-medium" for="sort">Sort</label>
          <select
            id="sort"
            class="bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            [ngModel]="sort.value()"
            (ngModelChange)="sort.set($event)"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div class="bg-muted rounded-md p-4">
        <p class="text-sm font-medium">Current state:</p>
        <pre class="text-muted-foreground mt-1 text-sm">{{ stateJson() }}</pre>
      </div>

      <button
        type="button"
        class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        (click)="reset()"
      >
        Reset all
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicQueryParamStateDemo {
  readonly search = injectQueryParam('q', parseAsString.withDefault(''));

  readonly page = injectQueryParam('page', parseAsInteger.withDefault(1));

  readonly sort = injectQueryParam(
    'sort',
    parseAsStringEnum(['asc', 'desc'] as const).withDefault('asc'),
  );

  stateJson() {
    return JSON.stringify(
      {
        q: this.search.value(),
        page: this.page.value(),
        sort: this.sort.value(),
      },
      null,
      2,
    );
  }

  reset() {
    this.search.clear();
    this.page.clear();
    this.sort.clear();
  }
}`;
}
