import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ComboboxDemoSection } from './combobox-demo-section';

@Component({
  selector: 'app-combobox-page',
  imports: [ComboboxDemoSection],
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="space-y-4">
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Combobox</h1>
        <p class="text-xl text-muted-foreground">
          A dropdown component with search functionality inside the dropdown panel.
        </p>
      </div>

      <!-- Main Demo -->
      <app-combobox-demo-section />

      <!-- Examples Section -->
      <div class="space-y-8">
        <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Examples</h2>

        <!-- Basic Usage -->
        <app-combobox-demo-section title="Basic Usage" level="3" />

        <!-- Features Section -->
        <div class="space-y-4">
          <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Features</h3>
          <div class="space-y-4 text-base leading-7">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <h4 class="font-semibold">Search in Dropdown</h4>
                <p class="text-sm text-muted-foreground">
                  Click to open dropdown with built-in search input for filtering options.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Keyboard Navigation</h4>
                <p class="text-sm text-muted-foreground">
                  Full keyboard support with arrow keys, Enter to select, and Escape to close.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Custom Templates</h4>
                <p class="text-sm text-muted-foreground">
                  Customize both trigger display and item rendering with custom templates.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Form Integration</h4>
                <p class="text-sm text-muted-foreground">
                  Implements ControlValueAccessor for seamless reactive form integration.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Validation Support</h4>
                <p class="text-sm text-muted-foreground">
                  Built-in validation with error states and custom error messages.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-semibold">Rich Items</h4>
                <p class="text-sm text-muted-foreground">
                  Support for items with labels, subtitles, and custom data.
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
              The Combobox component provides a select-style interface where clicking opens a
              dropdown with a search input. Perfect for selecting from a predefined list with search
              capabilities.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>
                Use
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">items</code>
                to provide the list of selectable options
              </li>
              <li>
                Each item should have
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">id</code>
                ,
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">label</code>
                properties
              </li>
              <li>
                Set
                <code class="bg-muted px-1.5 py-0.5 rounded text-xs">required="true"</code>
                for validation
              </li>
              <li>Use custom templates for trigger and item rendering</li>
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
export default class ComboboxPage {}
