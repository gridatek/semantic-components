import { _IdGenerator } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ScButton, ScFrame } from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockFooter,
} from '@semantic-components/ui/code-block';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiCopyIcon,
} from '@semantic-icons/lucide-icons';
import { ConfigService } from '../../services/config-service';
import { DevOnly } from '../dev-only/dev-only';

/**
 * A page's Usage: the demo's code — long, its first lines with Show more — and,
 * in dev mode only, the demo itself: an `<ng-template>` inside (created only
 * when shown, so not at all in production), or `demoUrl` in an iframe.
 */
@Component({
  selector: 'app-usage-code',
  imports: [
    ScFrame,
    DevOnly,
    NgTemplateOutlet,
    ScButton,
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockContent,
    ScCodeBlockCopy,
    ScCodeBlockFooter,
    SiCheckIcon,
    SiChevronDownIcon,
    SiCopyIcon,
  ],
  template: `
    <div scCodeBlock class="bg-muted/50 border-transparent">
      <div scCodeBlockActions class="absolute end-2 top-2 z-10">
        <button [scCodeBlockCopy]="code()" #copy="scCodeBlockCopy">
          @if (copy.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }
          <span class="sr-only">Copy to clipboard</span>
        </button>
      </div>
      <pre
        scCodeBlockContent
        [id]="id"
        [code]="code()"
        language="angular-ts"
        [class]="
          long() && !expanded()
            ? 'scroll-fade-y max-h-64 overflow-y-hidden'
            : ''
        "
      ></pre>
      @if (long()) {
        <div scCodeBlockFooter class="justify-center">
          <button
            scButton
            variant="ghost"
            size="xs"
            [attr.aria-controls]="id"
            [attr.aria-expanded]="expanded()"
            (click)="expanded.set(!expanded())"
          >
            <svg
              siChevronDownIcon
              class="transition-transform in-aria-expanded:rotate-180"
            ></svg>
            {{ expanded() ? 'Show less' : 'Show more' }}
          </button>
        </div>
      }
    </div>
    @if (devMode()) {
      @if (demoUrl(); as url) {
        <app-dev-only>
          <iframe
            scFrame
            [src]="frameSrc()"
            [title]="demoTitle()"
            loading="lazy"
            class="h-[32rem] w-full"
          ></iframe>
        </app-dev-only>
      } @else if (demo(); as demo) {
        <app-dev-only>
          <ng-container [ngTemplateOutlet]="demo" />
        </app-dev-only>
      }
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class UsageCode {
  private readonly devMode = inject(ConfigService).devMode;
  /** The demo's source, shown and copied. */
  readonly code = input.required<string>();
  /** The demo itself, shown in dev mode. */
  private readonly demo = contentChild(TemplateRef);
  private readonly id = inject(_IdGenerator).getId('usage-code-');
  /** The whole code, or its first lines. */
  private readonly expanded = signal(false);
  /** Over 20 lines: clipped, with Show more. */
  private readonly long = computed(() => this.code().split('\n').length > 20);

  /**
   * The demo on its own route, shown in an iframe — for a page frame (a
   * layout), which can't sit inside a page (its main, its header).
   */
  readonly demoUrl = input<string | undefined>(undefined);
  /** The iframe's name. */
  readonly demoTitle = input('Demo');
  private readonly sanitizer = inject(DomSanitizer);
  private readonly frameSrc = computed(() =>
    // Same-origin route of this showcase, never user input.
    this.sanitizer.bypassSecurityTrustResourceUrl(this.demoUrl() ?? ''),
  );
}
