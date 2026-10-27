import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { PackageManagerInstall } from '../package-manager-install/package-manager-install';

/**
 * How to install a component that has its own entry point of ui
 * (`@semantic-components/ui/<entry>`): the library it needs, an optional peer
 * of ui, then the import.
 */
@Component({
  selector: 'app-entry-install',
  imports: [
    PackageManagerInstall,
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockContent,
    ScCodeBlockCopy,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: `
    <p class="text-muted-foreground">
      It has its own entry point,
      <code class="bg-muted rounded px-1.5 py-0.5 text-sm">{{ path() }}</code
      >, built on
      <a
        [href]="href()"
        target="_blank"
        rel="noopener"
        class="text-foreground underline underline-offset-4"
        >{{ library() }}</a
      >
      — an optional peer of ui: install it where you use the component.
    </p>
    <app-package-manager-install [packages]="library()" />
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="code()" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy to clipboard</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="code()" language="typescript"></pre>
    </div>
  `,
  host: { '[class]': 'class()' },
  encapsulation: ViewEncapsulation.None,
})
export class EntryInstall {
  readonly classInput = input<string>('', { alias: 'class' });
  /** The entry point: `carousel` for `@semantic-components/ui/carousel`. */
  readonly entry = input.required<string>();
  /** The npm package it needs. */
  readonly library = input.required<string>();
  /** The library's home page. */
  readonly href = input.required<string>();
  /** What to import, e.g. `ScCarousel, ScCarouselItem`. */
  readonly names = input.required<string>();

  protected readonly path = computed(
    () => `@semantic-components/ui/${this.entry()}`,
  );
  protected readonly code = computed(
    () => `import { ${this.names()} } from '${this.path()}';`,
  );
  protected readonly class = computed(() =>
    cn('grid gap-4', this.classInput()),
  );
}
