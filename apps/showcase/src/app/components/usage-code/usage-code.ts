import { _IdGenerator } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  TemplateRef,
  ViewEncapsulation,
  contentChild,
  inject,
  input,
  signal,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockFooter,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiCopyIcon,
} from '@semantic-icons/lucide-icons';
import { ConfigService } from '../../services/config-service';
import { DevOnly } from '../dev-only/dev-only';

/**
 * A page's Usage: the demo's code — its first lines, Show more for the rest —
 * and, in dev mode only, the demo itself. The demo is an `<ng-template>`
 * inside: created only when shown, so not at all in production.
 */
@Component({
  selector: 'app-usage-code',
  imports: [
    DevOnly,
    NgTemplateOutlet,
    ScButton,
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockContent,
    ScCodeBlockCopy,
    ScCodeBlockFooter,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    SiCheckIcon,
    SiChevronDownIcon,
    SiCopyIcon,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>angular-ts</div>
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
        [id]="id"
        [code]="code()"
        language="angular-ts"
        [class]="expanded() ? '' : 'scroll-fade-y max-h-64 overflow-y-hidden'"
      ></pre>
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
    </div>
    @if (devMode() && demo(); as demo) {
      <app-dev-only>
        <ng-container [ngTemplateOutlet]="demo" />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class UsageCode {
  protected readonly devMode = inject(ConfigService).devMode;
  /** The demo's source, shown and copied. */
  readonly code = input.required<string>();
  /** The demo itself, shown in dev mode. */
  protected readonly demo = contentChild(TemplateRef);
  protected readonly id = inject(_IdGenerator).getId('usage-code-');
  /** The whole code, or its first lines. */
  protected readonly expanded = signal(false);
}
