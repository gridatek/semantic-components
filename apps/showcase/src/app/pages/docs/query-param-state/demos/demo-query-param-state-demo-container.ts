import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DemoQueryParamStateDemo } from './demo-query-param-state-demo';

@Component({
  selector: 'app-demo-query-param-state-demo-container',
  imports: [DemoContainer, DemoQueryParamStateDemo],
  template: `
    <app-demo-container
      title="Demo"
      description="When a parameter equals its declared default, it is stripped from the URL. Only deviations from defaults appear in the query string, so the URL stays short and canonical."
      demoUrl="/demos/query-param-state/demo-query-param-state-demo"
      [code]="code"
    >
      <app-demo-query-param-state-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DemoQueryParamStateDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, effect, linkedSignal, untracked } from '@angular/core';
import { FormField, form, min } from '@angular/forms/signals';
import {
  injectQueryParam,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-demo-query-param-state-demo',
  imports: [FormField],
  template: \`
    <div class="w-full max-w-md space-y-4">
      <div class="space-y-2">
        <label class="text-sm font-medium" for="search">Search</label>
        <input
          id="search"
          type="text"
          class="bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          placeholder="Type to search..."
          [formField]="filtersForm.q"
        />
      </div>

      <div class="flex gap-4">
        <div class="flex-1 space-y-2">
          <label class="text-sm font-medium" for="page">Page</label>
          <input
            id="page"
            type="number"
            class="bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            [formField]="filtersForm.page"
          />
        </div>

        <div class="flex-1 space-y-2">
          <label class="text-sm font-medium" for="sort">Sort</label>
          <select
            id="sort"
            class="bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            [formField]="filtersForm.sort"
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
})
export class DemoQueryParamStateDemo {
  readonly search = injectQueryParam('q', parseAsString.withDefault(''));

  readonly page = injectQueryParam('page', parseAsInteger.withDefault(1));

  readonly sort = injectQueryParam(
    'sort',
    parseAsStringEnum(['asc', 'desc'] as const).withDefault('asc'),
  );

  /** Resets whenever the URL changes, so the form always mirrors the query params. */
  readonly formModel = linkedSignal(() => ({
    q: this.search.value(),
    page: this.page.value(),
    sort: this.sort.value(),
  }));

  readonly filtersForm = form(this.formModel, (path) => {
    min(path.page, 1, { message: 'Page must be at least 1' });
  });

  constructor() {
    // Push edits made through the form back into the URL.
    effect(() => {
      const { q, page, sort } = this.formModel();
      untracked(() => {
        if (q !== this.search.value()) this.search.set(q);
        if (page !== this.page.value()) this.page.set(page);
        if (sort !== this.sort.value()) this.sort.set(sort);
      });
    });
  }

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
