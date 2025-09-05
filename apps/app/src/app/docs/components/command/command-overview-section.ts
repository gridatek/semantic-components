import { Component } from '@angular/core';

import { CommandDemo } from './command-demo';
import { CommandDialogDemo } from './command-dialog-demo';

@Component({
  selector: 'app-command-overview-section',
  imports: [CommandDemo, CommandDialogDemo],
  template: `
    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Command Component Overview</h2>
        <p class="text-lg text-muted-foreground">
          A fully-featured command palette component for Angular applications, providing fast search and keyboard navigation functionality.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="text-2xl mb-2">🔍</div>
          <h3 class="font-semibold text-blue-900">Real-time Search</h3>
          <p class="text-sm text-blue-800 mt-1">Instant filtering with customizable search algorithms</p>
        </div>

        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="text-2xl mb-2">⌨️</div>
          <h3 class="font-semibold text-green-900">Keyboard Navigation</h3>
          <p class="text-sm text-green-800 mt-1">Full arrow key support with Enter/Escape handling</p>
        </div>

        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="text-2xl mb-2">🎯</div>
          <h3 class="font-semibold text-purple-900">Accessibility</h3>
          <p class="text-sm text-purple-800 mt-1">ARIA labels, roles, and screen reader support</p>
        </div>

        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div class="text-2xl mb-2">🧩</div>
          <h3 class="font-semibold text-orange-900">Composable</h3>
          <p class="text-sm text-orange-800 mt-1">Modular components for flexible layouts</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Basic Command Palette -->
        <div class="space-y-4">
          <div>
            <h3 class="text-xl font-semibold">Basic Command Palette</h3>
            <p class="text-muted-foreground">
              Simple inline command palette with static data and essential features.
            </p>
          </div>
          <app-command-demo />
        </div>

        <!-- Command Dialog -->
        <div class="space-y-4">
          <div>
            <h3 class="text-xl font-semibold">Command Dialog</h3>
            <p class="text-muted-foreground">
              Modal command palette that opens in an overlay dialog with backdrop.
            </p>
          </div>
          <app-command-dialog-demo />
        </div>
      </div>

      <div class="bg-gray-50 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Core Components</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <h4 class="font-medium">Main Components</h4>
            <ul class="text-sm space-y-1">
              <li><code class="bg-gray-200 px-1 rounded">ScCommand</code> - Main container with keyboard handling</li>
              <li><code class="bg-gray-200 px-1 rounded">ScCommandInput</code> - Search input with filtering</li>
              <li><code class="bg-gray-200 px-1 rounded">ScCommandList</code> - Scrollable command container</li>
              <li><code class="bg-gray-200 px-1 rounded">ScCommandItem</code> - Individual selectable items</li>
            </ul>
          </div>
          <div class="space-y-3">
            <h4 class="font-medium">Supporting Components</h4>
            <ul class="text-sm space-y-1">
              <li><code class="bg-gray-200 px-1 rounded">ScCommandGroup</code> - Command categorization</li>
              <li><code class="bg-gray-200 px-1 rounded">ScCommandEmpty</code> - No results state</li>
              <li><code class="bg-gray-200 px-1 rounded">ScCommandSeparator</code> - Visual dividers</li>
              <li><code class="bg-gray-200 px-1 rounded">CommandDialog</code> - Modal dialog service</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Quick Start</h3>
        <div class="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm">
          <pre class="overflow-x-auto"><code><span class="text-blue-300">import</span> {
  <span class="text-yellow-300">ScCommand</span>,
  <span class="text-yellow-300">ScCommandInput</span>,
  <span class="text-yellow-300">ScCommandList</span>,
  <span class="text-yellow-300">ScCommandItem</span>,
  <span class="text-yellow-300">ScCommandEmpty</span>
} <span class="text-blue-300">from</span> <span class="text-green-300">'@semantic-components/ui'</span>;

<span class="text-gray-400">// Basic usage</span>
&lt;<span class="text-red-300">sc-command</span>&gt;
  &lt;<span class="text-red-300">sc-command-input</span> placeholder=<span class="text-green-300">"Search..."</span> /&gt;
  &lt;<span class="text-red-300">sc-command-list</span>&gt;
    &lt;<span class="text-red-300">sc-command-empty</span>&gt;No results found.&lt;/<span class="text-red-300">sc-command-empty</span>&gt;
    &lt;<span class="text-red-300">sc-command-item</span> value=<span class="text-green-300">"action"</span>&gt;Action&lt;/<span class="text-red-300">sc-command-item</span>&gt;
  &lt;/<span class="text-red-300">sc-command-list</span>&gt;
&lt;/<span class="text-red-300">sc-command</span>&gt;</code></pre>
        </div>
      </div>
    </section>
  `,
})
export class CommandOverviewSection {}
