import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { MultiSelectDemoSection } from './multi-select-demo-section';

@Component({
  selector: 'app-multi-select-page',
  imports: [MultiSelectDemoSection],
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="space-y-4">
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Multi Select</h1>
        <p class="text-xl text-muted-foreground">
          A versatile multi-select component that allows users to select multiple items from a
          dropdown list with chips for selected values.
        </p>
      </div>

      <!-- Main Demo -->
      <app-multi-select-demo-section />

      <!-- Examples Section -->
      <div class="space-y-8">
        <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Examples</h2>

        <!-- Features Section -->
        <div class="space-y-4">
          <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Features</h3>
          <div class="space-y-4 text-base leading-7">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <h4 class="font-semibold">Multiple Selection</h4>
                <p class="text-sm text-muted-foreground">
                  Select multiple items from the dropdown list with visual chips for each selected
                  item.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Search & Filter</h4>
                <p class="text-sm text-muted-foreground">
                  Type to search and filter items in the dropdown for quick selection.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Keyboard Navigation</h4>
                <p class="text-sm text-muted-foreground">
                  Full keyboard support with arrow keys, Enter to select, and Escape to close.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Grouped Items</h4>
                <p class="text-sm text-muted-foreground">
                  Support for grouping items into categories for better organization.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Custom Objects</h4>
                <p class="text-sm text-muted-foreground">
                  Use complex objects with labels, values, and subtitles for rich item display.
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
              The Multi Select component provides a flexible way to allow users to select multiple
              items from a list. It supports both simple string arrays and complex objects with
              additional metadata.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>
                Use
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">items</code>
                to provide the list of selectable options
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
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">showStatus="false"</code>
                to hide the selection count display
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
export default class MultiSelectPage {}
