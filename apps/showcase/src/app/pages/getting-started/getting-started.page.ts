import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-getting-started-page',
  imports: [TocHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Getting Started</h1>
        <p class="text-muted-foreground">
          Install and configure Semantic Components in your Angular project.
        </p>
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Prerequisites</h2>
        <ul class="list-disc space-y-1 pl-6 text-muted-foreground">
          <li>Angular 21.1 or later</li>
          <li>Tailwind CSS v4</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Install</h2>
        <p class="text-muted-foreground">
          Install the library and its peer dependencies:
        </p>
        <pre
          class="overflow-x-auto rounded-lg border bg-muted p-4 text-sm"
        ><code>npm install @semantic-components/ui</code></pre>
      </section>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          Configure styles
        </h2>
        <p class="text-muted-foreground">
          Import the library styles in your
          <code>styles.css</code>
          :
        </p>
        <pre
          class="overflow-x-auto rounded-lg border bg-muted p-4 text-sm"
        ><code>&#64;import "@semantic-components/ui/styles";</code></pre>
      </section>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          Configure Tailwind
        </h2>
        <p class="text-muted-foreground">
          Add the library as a Tailwind source so its classes are included in
          the build. Add this to your
          <code>styles.css</code>
          :
        </p>
        <pre
          class="overflow-x-auto rounded-lg border bg-muted p-4 text-sm"
        ><code>&#64;source "../node_modules/@semantic-components/ui";</code></pre>
      </section>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Usage</h2>
        <p class="text-muted-foreground">
          Import and use components in your Angular templates:
        </p>
        <pre
          class="overflow-x-auto rounded-lg border bg-muted p-4 text-sm"
        ><code>import {{ '{' }} ScButton {{ '}' }} from '&#64;semantic-components/ui';

&#64;Component({{ '{' }}
  selector: 'app-example',
  imports: [ScButton],
  template: \`
    &lt;button sc-button&gt;Click me&lt;/button&gt;
  \`,
{{ '}' }})
export class ExampleComponent {{ '{' }}{{ '}' }}</code></pre>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GettingStartedPage {}
