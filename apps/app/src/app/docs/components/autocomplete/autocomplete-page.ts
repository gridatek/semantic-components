import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BasicAutocompleteDemoSection } from './basic-autocomplete-demo-section';

@Component({
  selector: 'app-autocomplete-page',
  imports: [BasicAutocompleteDemoSection],
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="space-y-4">
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Autocomplete</h1>
        <p class="text-xl text-muted-foreground">
          A search input component with dropdown suggestions that filters as you type.
        </p>
      </div>

      <!-- Main Demo -->
      <app-basic-autocomplete-demo-section />

      <!-- Examples Section -->
      <div class="space-y-8">
        <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Examples</h2>

        <!-- Basic Usage -->
        <app-basic-autocomplete-demo-section title="Basic Usage" level="3" />

        <!-- Features Section -->
        <div class="space-y-4">
          <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Features</h3>
          <div class="space-y-4 text-base leading-7">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <h4 class="font-semibold">Type-ahead Search</h4>
                <p class="text-sm text-muted-foreground">
                  Start typing to filter options in real-time with instant feedback.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Keyboard Navigation</h4>
                <p class="text-sm text-muted-foreground">
                  Full keyboard support with arrow keys, Enter to select, and Escape to close.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Async Search</h4>
                <p class="text-sm text-muted-foreground">
                  Support for asynchronous data loading with customizable search functions.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Custom Objects</h4>
                <p class="text-sm text-muted-foreground">
                  Use complex objects with labels, values, and subtitles for rich item display.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Grouped Items</h4>
                <p class="text-sm text-muted-foreground">
                  Support for grouping items into categories for better organization.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Form Integration</h4>
                <p class="text-sm text-muted-foreground">
                  Implements ControlValueAccessor for seamless reactive form integration.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Usage Notes -->
        <div class="space-y-4">
          <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Usage</h3>
          <div class="space-y-4 text-base leading-7">
            <p>
              The Autocomplete component provides a searchable input field that shows filtered
              suggestions as you type. It's perfect for scenarios where users need to select from a
              large list of options.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>
                Use
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">items</code>
                to provide the list of searchable options
              </li>
              <li>
                Set
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">grouped="true"</code>
                when using items with a
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">group</code>
                property
              </li>
              <li>
                Use
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">async="true"</code>
                with
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">asyncSearchFn</code>
                for server-side search
              </li>
              <li>
                Set
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">showStatus="false"</code>
                to hide the selection status display
              </li>
              <li>
                Listen to
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">selectionChange</code>
                events to handle value changes
              </li>
              <li>
                Integrate with reactive forms using
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">formControlName</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AutocompletePage {}
