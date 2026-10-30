import {
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ScTab,
  ScTabContent,
  ScTabList,
  ScTabPanel,
  ScTabs,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import {
  SiCheckIcon,
  SiCopyIcon,
  SiExternalLinkIcon,
} from '@semantic-icons/lucide-icons';
import { ConfigService } from '../../services/config-service';
import { TocHeading } from '../toc/toc-heading';

@Component({
  selector: 'app-demo-container',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    ScTabs,
    ScTabList,
    ScTab,
    ScTabPanel,
    ScTabContent,
    SiCheckIcon,
    SiCopyIcon,
    SiExternalLinkIcon,
    TocHeading,
  ],
  template: `
    <div class="space-y-4">
      @if (title()) {
        <div class="flex items-center gap-2">
          <h3 appToc class="text-sm font-medium">{{ title() }}</h3>
          @if (demoUrl() && devMode()) {
            <a
              [href]="demoUrl()"
              target="_blank"
              class="text-muted-foreground hover:text-foreground inline-flex h-6 w-6 items-center justify-center rounded-md"
              title="Open in isolation"
            >
              <svg siExternalLinkIcon class="size-4"></svg>
              <span class="sr-only">Open {{ title() }} demo in isolation</span>
            </a>
          }
        </div>
      }

      @if (description()) {
        <p class="text-muted-foreground text-sm">{{ description() }}</p>
      }

      <div scTabs class="w-full">
        <div scTabList selectedTab="preview">
          <button scTab value="preview">Preview</button>
          <button scTab value="code">Code</button>
        </div>

        <div scTabPanel value="preview" [class]="previewClass()">
          <ng-template scTabContent>
            @if (framed()) {
              <!--
                Full-page demos (e.g. a sidebar layout) run in their own
                viewport, at desktop width, scaled down to fit the panel.
              -->
              <div
                #frameBox
                class="relative mx-auto overflow-hidden"
                [style.height.px]="frameHeight()"
                [style.max-width.px]="frameWidth()"
              >
                <iframe
                  class="absolute top-0 left-0 origin-top-left"
                  [style.width.px]="frameWidth()"
                  [style.height.px]="frameHeight() / frameScale()"
                  [style.transform]="'scale(' + frameScale() + ')'"
                  [src]="frameSrc()"
                  [title]="title() + ' demo'"
                  loading="lazy"
                ></iframe>
              </div>
            } @else {
              <ng-content />
            }
          </ng-template>
        </div>

        <div scTabPanel value="code">
          <ng-template scTabContent>
            <div scCodeBlock>
              <div scCodeBlockHeader>
                <div scCodeBlockTitle>{{ language() }}</div>
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
              <pre
                scCodeBlockContent
                [code]="code()"
                [language]="language()"
                lineNumbers
              ></pre>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
})
export class DemoContainer {
  private readonly config = inject(ConfigService);

  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly demoUrl = input<string>('');
  readonly code = input.required<string>();
  readonly language = input<string>('angular-ts');
  /**
   * Render the preview as an iframe of `demoUrl` instead of projected
   * content. For demos that take over the viewport (fixed positioning, global
   * shortcuts); the container then projects no demo element.
   */
  readonly framed = input(false, { transform: booleanAttribute });

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly frameSrc = computed(() =>
    // Same-origin route of this showcase, never user input.
    this.sanitizer.bypassSecurityTrustResourceUrl(this.demoUrl()),
  );
  /** Viewport width a framed demo is laid out at (default: above the md breakpoint). */
  readonly frameWidth = input(1024);
  /** Visible height of a framed demo, in px. */
  readonly frameHeight = input(560);
  protected readonly frameScale = signal(1);
  private readonly frameBox = viewChild<ElementRef<HTMLElement>>('frameBox');

  constructor() {
    effect((onCleanup) => {
      const box = this.frameBox()?.nativeElement;
      if (!box) return;
      const observer = new ResizeObserver(([entry]) =>
        this.frameScale.set(
          Math.min(1, entry.contentRect.width / this.frameWidth()),
        ),
      );
      observer.observe(box);
      onCleanup(() => observer.disconnect());
    });
  }

  protected readonly previewClass = computed(() =>
    this.framed()
      ? 'overflow-hidden rounded-md border'
      : 'flex min-h-40 items-center justify-center rounded-md border p-6',
  );

  protected readonly devMode = this.config.devMode;
}
